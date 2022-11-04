<template>
  <Modal>
    <template v-slot:title> 로그인 </template>
    <template v-slot:body>
      <div class="loginform">
        <input
          class="email"
          v-model="email"
          type="email"
          placeholder="이메일"
        />
        <input
          class="password"
          v-model="pw"
          type="password"
          placeholder="비밀번호"
        />
        <button type="button" class="btn btn-secondary" @click="login">
          로그인
        </button>
        <span>
          <b><i>logo</i></b> 가 처음이신가요?
        </span>
        <br />
        <router-link class="submit" :to="{ name: 'insert' }" @click="onClose">
          회원가입
        </router-link>
      </div>
    </template>
  </Modal>
</template>

<script>
// import { useRouter } from "vue-router";
import axios from "axios";
import Modal from "@/components/Modal.vue";
import { getCurrentInstance } from "vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    Modal,
  },
  setup() {
    const email = ref("");
    const pw = ref("");

    const store = useStore();

    const memberId = ref("");

    const login = async () => {
      try {
        const res = await axios
          .post("http://localhost:8090/spaceZBE/member/login", {
            email: email.value,
            password: pw.value,
          })
          .then((res) => {
            store.commit(
              "GET_MEMBERID",
              JSON.parse(res.request.response).member_id
            );
            console.log(JSON.parse(res.request.response).member_id);
            console.log(store.state.memberId);
            localStorage.setItem(
              "memberId",
              JSON.parse(res.request.response).member_id
            );
            onClose();
            window.location.reload(true);
          });
      } catch (error) {
        console.log("error:", error);
      }
    };

    const { emit } = getCurrentInstance();
    const onClose = () => {
      emit("close");
    };
    const onDelete = () => {
      emit("delete");
    };

    return {
      onClose,
      onDelete,
      login,
      email,
      pw,
      memberId,
    };
  },
};
</script>

<style scoped>
.btn-secondary {
  background: blue;
  width: 300px;
  height: 70px;
  font-size: 30px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 80px;
  margin-right: 80px;
  border-radius: 20px;
}
b {
  color: blue;
}
.loginform {
  align-items: center;
  margin-top: 50px;
}

input {
  width: 400px;
  height: 100px;
  text-align: center;
  font-size: 30px;
  margin-left: 40px;
  margin-right: 50px;
  border: 1px solid white;
  border-bottom: 1px solid gray;
}
span {
  text-align: center;
  font-size: 30px;
}
.submit {
  color: black;
  font-size: 20px;
}
</style>

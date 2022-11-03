// eslint-disable-next-line
<template>
  <div>
    <div class="outer">
      <h2>회원가입</h2>
      <div class="form">
        <div class="innerform">
          <p>이메일</p>
          <input type="email" name="email" v-model="email" />
          <button class="certification" @click="sendCerti">
            인증번호 보내기
          </button>
          <br />
          <p>인증번호 입력</p>
          <input type="number" name="emailCerificate" v-model="emailCerti" />
          <button class="certification" @click="checkCerti">
            {{ checkButton }}
          </button>
          <br />
          <p>비밀번호</p>
          <input
            type="password"
            name="password1"
            v-model="password"
            @change="pwLengChek"
          />{{ pwlengthCheck }}
          <br />
          <p>비밀번호 확인</p>
          <input type="password" name="password2" v-model="pwCheck" />
          <br />
          <p>닉네임</p>
          <input type="tel" name="nickname" v-model="nickname" />
          <br />
          {{ err
          }}<button class="insertOK" @click="insertDone">가입완료</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const emailCerti = ref("");
    const certiNum = ref(0);
    const password = ref("");
    const pwCheck = ref("");
    const nickname = ref("");
    const checkButton = ref("인증");
    const err = ref("");
    const pwlengthCheck = ref("");

    const sendCerti = async () => {
      const res = await axios
        .post("http://localhost:8090/spaceZBE/member/mail", {
          receiver: email.value,
        })
        .then((res) => {
          certiNum.value = JSON.parse(res.request.response).result;
          console.log(certiNum.value);
        });
    };

    const checkCerti = () => {
      if (emailCerti.value === certiNum.value) {
        checkButton.value = "인증완료";
      } else {
        checkButton.value = "인증실패";
      }
    };

    const insertDone = () => {
      if (password.value !== pwCheck.value) {
        err.value = "비밀번호 확인이 올바르지 않습니다 다시 확인해주세요";
      } else if (checkButton.value !== "인증완료") {
        err.value = "이메일 인증을 해주세요";
      } else if (!nickname.value) {
        err.value = "닉네임을 입력해주세요";
      } else if (
        password.value === pwCheck.value &&
        checkButton.value === "인증완료" &&
        nickname.value
      ) {
        err.value = "";
        insertOK();
        router.push({
          name: "Home",
        });
      }
    };

    const insertOK = () => {
      axios.post("http://localhost:8090/spaceZBE/member/signUp", {
        membername: nickname.value,
        email: email.value,
        password: password.value,
        authority: "member",
      });
    };

    const pwLengChek = () => {
      if (password.value.length < 8) {
        pwlengthCheck.value = "비밀번호는 8자 이상이여야합니다";
      } else {
        pwlengthCheck.value = "";
      }
    };

    return {
      email,
      emailCerti,
      password,
      pwCheck,
      pwLengChek,
      nickname,
      insertOK,
      sendCerti,
      checkCerti,
      certiNum,
      checkButton,
      insertDone,
      err,
      pwlengthCheck,
    };
  },
};
</script>

<style scoped>
.outer {
  right: 200px;
  float: right;
  position: absolute;
}
.form {
  width: 600px;
  height: 700px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 10px;
}
.innerform {
  padding: 20px;
}
input {
  width: 300px;
  height: 50px;
}
p {
  font-size: 25px;
}
.certification {
  width: 150px;
  height: 40px;
  margin-left: 50px;
  margin-right: 50px;
  border-radius: 15px;
  background: white;
  opacity: 0.5;
}
.certification:hover {
  opacity: 1;
}
.insertOK {
  margin-left: 300px;
  margin-top: 60px;
  width: 250px;
  height: 50px;
  border-radius: 30px;
  background-color: white;
  border: white;
  color: blue;
  font-size: 30px;
}
.insertOK:hover {
  background-color: blue;
  border: blue;
  color: white;
}
</style>

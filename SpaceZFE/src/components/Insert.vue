// eslint-disable-next-line
<template>
  <div class="side">
    <img src="@/assets/spacezlogo.png" />
  </div>
  <div class="outer">
    <h1><b style="color: rgb(4, 20, 97, 1)">회원가입</b></h1>
    <div class="form">
      <div class="innerform">
        <p>이메일<a style="color: rgba(255, 59, 59, 1)">*</a></p>
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="이메일 입력"
        />
        <button class="certification" @click="sendCerti">
          인증번호 보내기
        </button>
        <br />
        <p>인증번호<a style="color: rgba(255, 59, 59, 1)">*</a></p>
        <input
          class="email"
          type="number"
          name="emailCerificate"
          v-model="emailCerti"
          placeholder="인증번호 입력"
        />
        <button class="certification1" @click="checkCerti">
          {{ checkButton }}
        </button>
        <br />
        <p>비밀번호<a style="color: rgba(255, 59, 59, 1)">*</a></p>
        <input
          type="password"
          name="password1"
          v-model="password"
          @change="pwLengChek"
          placeholder="비밀번호"
          style="margin-bottom: 2%"
        />{{ pwlengthCheck }}
        <br />
        <input
          type="password"
          name="password2"
          v-model="pwCheck"
          placeholder="비밀번호 확인"
        />
        <br />
        <p>닉네임<a style="color: rgba(255, 59, 59, 1)">*</a></p>
        <input
          type="tel"
          name="nickname"
          v-model="nickname"
          placeholder="닉네임"
        />
        <br />
        {{ err }}<button class="insertOK" @click="insertDone">가입완료</button>
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
html,
body {
  height: 100%;
  overflow: no height;
}
.side {
  width: 45%;
  height: 54.2vmax;
  /* position: absolute; */
  text-align: center;
  background-color: rgb(4, 20, 97, 1);
  float: left;
}
img {
  margin-top: 10%;
}
.outer {
  width: 39%;
  height: 100%;
  margin-left: 1%;
  margin-top: 5%;
  margin-right: 10%;
  float: right;
}
.form {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20%;
  border-radius: 10px;
  border: 1px solid silver;
}
.innerform {
  padding-left: 40px;
  padding-bottom: 40px;
}
input {
  width: 20vw;
  height: 6vh;
  border-radius: 10px;
  border: 1px solid silver;
}
.email {
  width: 10vw;
}
p {
  font-size: 3vh;
  margin-bottom: 0;
  margin-top: 5%;
}
.certification {
  width: fit-content;
  height: 40px;
  margin-left: 10px;
  margin-right: 50px;
  border-radius: 10px;
  border: 1px solid silver;
  background: white;
}
.certification1 {
  width: 80px;
  height: 40px;
  margin-left: 10px;
  margin-right: 50px;
  border-radius: 10px;
  border: 1px solid silver;
  background: white;
}

.certification:hover {
  border: 1px solid gray;
}
.insertOK {
  margin-top: 5%;
  width: 500px;
  height: 6vh;
  border-radius: 10px;
  background-color: rgba(82, 113, 255, 1);
  border: rgba(82, 113, 255, 1);
  color: white;
  font-size: 20px;
}
.insertOK:hover {
  background-color: blue;
  border: blue;
}
</style>

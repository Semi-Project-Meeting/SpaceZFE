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
          <input type="email" name="emailCerificate" v-model="emailCerti" />
          <button class="certification" @click="checkCerti">인증</button>
          <br />
          <p>비밀번호</p>
          <input type="password" name="password1" v-model="password" />
          <br />
          <p>비밀번호 확인</p>
          <input type="password" name="password2" v-model="pwCheck" />
          <br />
          <p>닉네임</p>
          <input type="tel" name="nickname" v-model="nickname" />
          <br />
          <router-link :to="{ name: 'Home' }">
            <button class="insertOK" @click="insertOK">가입완료</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const email = ref("");
    const emailCerti = ref("");
    const password = ref("");
    const pwCheck = ref("");
    const nickname = ref("");

    const insertOK = () => {
      console.log(
        email.value,
        emailCerti.value,
        password.value,
        pwCheck.value,
        nickname.value
      );
      axios.post("http://localhost:8090/spaceZBE/member/signUp", {
        membername: nickname.value,
        email: email.value,
        password: password.value,
        authority: "member",
      });
      //       {
      // "membername" : "신유스오",
      // "email" : "1234@naver.com",
      // "password" : "123",
      // "authority" : "member"
      // }
    };

    return {
      email,
      emailCerti,
      password,
      pwCheck,
      nickname,
      insertOK,
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

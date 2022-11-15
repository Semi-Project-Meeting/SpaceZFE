// eslint-disable-next-line
<template>
  <div>
    <div class="v614_219">
      <span class="nar1"><b>시작해보세요 사무 공간 임대</b></span>
      <span class="nar2">1인 데스크 부터 20인 대형 사무실 까지</span>
      <span class="nar3">모두를 위한 임대 서비스</span>
      <span class="nar5"><img src="../assets/SpaceZ.png" /></span>
      <span class="nar4" @click="moveToPage">시작하기 </span>
    </div>
    <LoginModal v-if="showModal" @close="closeModal" />
  </div>
</template>

<script>
import LoginModal from "@/components/LoginModal.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    LoginModal,
  },
  setup() {
    const showModal = ref(false);
    const router = useRouter();

    const moveToPage = () => {
      if (localStorage.getItem("memberId")) {
        router.push({
          name: "Main",
        });
      } else {
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };
    return { showModal, moveToPage, closeModal };
  },
};
</script>

<style scoped>
/* .all {
  width: 100%;
  height: 100%;
  background: #000;
  position: relative;
} */
.v614_219 {
  width: 640px;
  height: 640px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: fixed;
  left: 40%;
  top: 30%;
  margin-left: -150px;
  margin-top: 0px;
  overflow: hidden;
}
.nar4 {
  width: 200px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 436px;
  left: 240px;
  font-family: Inter;
  font-weight: bolder;
  font-size: 40px;
  opacity: 1;
  text-align: left;
}
.nar5 {
  width: 176px;
  color: rgb(4, 20, 97, 1);
  position: absolute;
  top: 206px;
  left: 33%;
  font-weight: bolder;
  font-weight: Extra Bold Italic;
  font-size: 50px;
  text-align: left;
}
.nar1 {
  width: 700px;
  color: rgb(4, 20, 97, 1);
  position: absolute;
  top: 0px;
  left: 0px;
  font-family: Inter;
  font-weight: Light;
  font-size: 48px;
  opacity: 1;
  text-align: left;
}
.nar3 {
  width: 300px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 163px;
  left: 174px;
  font-family: Inter;
  font-weight: Light;
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
.nar2 {
  width: 450px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 121px;
  left: 99px;
  font-family: Inter;
  font-weight: Light;
  font-size: 24px;
  opacity: 1;
  text-align: left;
}
</style>

// eslint-disable-next-line
<template>
  <div>
    <div class="v614_219">
      <span class="nar1">시작해보세요 사무 공간 임대</span>
      <span class="nar2">1인 데스크 부터 20인 대형 사무실 까지</span>
      <span class="nar3">모두를 위한 임대 서비스</span>
      <span class="nar5"><b>SpaceZ</b></span>
      <router-link class="nar4" :to="{ name: 'Main' }">시작하기 </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    console.log(store.state.memberId);

    return {};
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
  width: 800px;
  height: 354px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  opacity: 1;
  position: fixed;
  left: 40%;
  top: 40%;
  margin-left: -150px;
  margin-top: 0px;
  overflow: hidden;
}
.nar4 {
  width: 200px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 306px;
  left: 226px;
  font-family: Inter;
  font-weight: Light;
  font-size: 40px;
  opacity: 1;
  text-align: left;
}
.nar5 {
  width: 176px;
  color: rgba(0, 25, 255, 1);
  position: absolute;
  top: 206px;
  left: 244px;
  font-weight: bold;
  font-style: italic;
  font-family: Inter;
  font-weight: Extra Bold Italic;
  font-size: 50px;
  opacity: 1;
  text-align: left;
}
.nar1 {
  width: 700px;
  color: rgba(0, 0, 0, 1);
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

// eslint-disable-next-line
<template>
  <nav>
    <nav class="nav">
      <span class="search" @click.stop="openSearchModal">🔍</span>
      <router-link class="logo" :to="{ name: 'Home' }">logo</router-link>
      <span class="locInsert"> 장소등록</span>
      <span class="login" @click.stop="openModal"> 로그인</span>
      <!-- <span v-if="loggedIn" class="login" @click.stop="openModal">
        <img src="./asserts/img_0001.png" alt=""
      /></span> -->
      <br />
    </nav>
    <hr />
    <SearchModal v-if="showSearchModal" @close="closeSearchModal" />
    <Modal v-if="showModal" @close="closeModal" />
  </nav>
</template>

<script>
// import { useRouter } from "vue-router";
import SearchModal from "@/components/SearchModal.vue";
import Modal from "@/components/LoginModal.vue";
import { ref } from "vue";

export default {
  components: {
    Modal,
    SearchModal,
  },
  setup() {
    // const router = useRouter();
    const showModal = ref(false);
    const showSearchModal = ref(false);

    const openSearchModal = () => {
      showSearchModal.value = !showSearchModal.value;
    };

    const closeSearchModal = () => {
      showSearchModal.value = false;
    };

    const openModal = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      showSearchModal,
      openModal,
      showModal,
      closeModal,
      openSearchModal,
      closeSearchModal,
    };
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 10px 10px;
  margin: 10px;
  opacity: 1;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  justify-content: center;
}
.nav {
  width: 100%;
  height: 121px;
  background: rgba(255, 255, 255, 1);
  opacity: 1;

  overflow: hidden;
}
.v580_329 {
  width: 176px;
  color: rgba(0, 25, 255, 1);
  position: absolute;
  top: 479px;
  left: 669px;
  font-family: Inter;
  font-weight: Extra Bold Italic;
  font-size: 50px;
  opacity: 1;
  text-align: left;
}
.logo {
  width: 300px;
  color: rgba(0, 25, 255, 1);
  position: absolute;
  top: 22px;
  left: 60px;
  font-style: italic;
  font-weight: Bold;
  font-size: 60px;
  opacity: 1;
  text-align: left;
}
.login {
  width: 100px;
  color: rgba(130, 130, 130, 1);
  position: absolute;
  top: 47px;
  right: 100px;
  font-family: Inter;
  font-weight: Light;
  font-size: 30px;
  opacity: 1;
  text-align: left;
}
.locInsert {
  width: 150px;
  color: rgba(130, 130, 130, 1);
  position: absolute;
  top: 47px;
  right: 200px;
  font-family: Inter;
  font-weight: Light;
  font-size: 30px;
  opacity: 1;
  text-align: left;
}

.search {
  width: 200px;
  color: rgba(0, 0, 0, 1);
  position: absolute;
  top: 47px;
  right: 300px;
  font-family: Inter;
  font-weight: Light;
  font-size: 30px;
  opacity: 1;
  text-align: left;
}
</style>

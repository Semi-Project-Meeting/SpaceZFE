// eslint-disable-next-line
<template>
  <nav>
    <nav class="nav">
      <span class="search" @click.stop="openSearchModal" style="cursor: pointer"
        >🔍</span
      >
      <router-link class="logo" :to="{ name: 'Home' }" style="cursor: pointer"
        >SpaceZ</router-link
      >
      <span
        v-if="member"
        class="locInsert"
        @click="movoeToPage"
        style="cursor: pointer"
      >
        장소등록</span
      >
      <span v-else-if="manager" class="locInsert" style="cursor: pointer">
        매니저 Space</span
      >
      <span v-else-if="master" class="locInsert" style="cursor: pointer">
        마스터 Space</span
      >
      <span
        v-show="!logined"
        class="login"
        @click.stop="openModal"
        style="cursor: pointer"
      >
        로그인</span
      >
      <span
        v-show="logined"
        class="login"
        @click="openLogOut"
        style="cursor: pointer"
        ><img
          class="mypage"
          :src="`http://localhost:8090/spaceZBE/resources/upload/img_0001.png`"
        />
      </span>
      <!-- <span v-if="loggedIn" class="login" @click.stop="openModal"></span> -->
      <br />
    </nav>
    <hr />
    <LogoutModal v-if="showLogoutModal" @close="closeModal" />
    <SearchModal v-if="showSearchModal" @close="closeSearchModal" />
    <Modal v-if="showModal" @close="closeModal" />
  </nav>
</template>

<script>
// import { 901.2useRouter } from "vue-router";
import SearchModal from "@/components/SearchModal.vue";
import Modal from "@/components/LoginModal.vue";
import { ref } from "vue";
import LogoutModal from "@/components/LogoutModal.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Modal,
    SearchModal,
    LogoutModal,
  },
  setup() {
    // const router = useRouter();
    const logined = ref("");
    const showModal = ref(false);
    const showLogoutModal = ref(false);
    const showSearchModal = ref(false);
    const router = useRouter();
    var member = ref(false); // authority
    var manager = ref(false); // authority
    var master = ref(false); // authority

    const loginCheck = () => {
      if (localStorage.getItem("memberId")) {
        logined.value = true;
      } else if (!localStorage.getItem("memberId")) {
        logined.value = false;
      }
    };

    loginCheck();

    const openLogOut = () => {
      showLogoutModal.value = true;
    };

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
      showLogoutModal.value = false;
    };

    const movoeToPage = () => {
      router.push({
        name: "InsertSpace",
      });
    };

    // authority 권한으로 버튼 구별
    const memberAuthority = () => {
      if (localStorage.getItem("authority") === "member") {
        member.value = true;
      } else {
        member.value = false;
      }
    };
    memberAuthority();

    const managerAuthority = () => {
      if (localStorage.getItem("authority") === "manager") {
        manager.value = true;
      } else {
        manager.value = false;
      }
    };
    managerAuthority();

    const masterAuthority = () => {
      if (localStorage.getItem("authority") === "master") {
        master.value = true;
      } else {
        master.value = false;
      }
    };
    masterAuthority();

    console.log(master.value);
    console.log(logined.value);
    console.log(localStorage.getItem("authority"));
    console.log(localStorage.getItem("authority") === "master");
    console.log(localStorage.getItem("authority") === "member");

    return {
      showSearchModal,
      showModal,
      showLogoutModal,
      member,
      manager,
      master,
      logined,
      loginCheck,
      openModal,
      closeModal,
      openSearchModal,
      closeSearchModal,
      openLogOut,
      memberAuthority,
      managerAuthority,
      masterAuthority,
      movoeToPage,
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
.mypage {
  width: 50px;
  height: 50px;
  border-radius: 100px;
}
</style>

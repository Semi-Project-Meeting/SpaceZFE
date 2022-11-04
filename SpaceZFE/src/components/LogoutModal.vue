// eslint-disable-next-line
<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title"></div>
          <button type="button" class="close">
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="ment">정말 로그아웃 하시겠습니까?</p>
          <button class="logoutBtn" @click="logout">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const logout = () => {
      localStorage.removeItem("memberId");
      window.location.reload(true);
      onClose();
    };

    const onClose = () => {
      emit("close");
    };

    return {
      onClose,
      logout,
    };
  },
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-title {
  padding-left: 160px;
  font-size: 40px;
}
.modal-header {
  height: 70px;
}

.modal-content {
  height: 300px;
  text-align: center;
  border-radius: 20px;
}
.close {
  margin: 0;
}
.ment {
  font-size: 30px;
}
.logoutBtn {
  font-size: 20px;
  margin-top: 20px;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid blue;
  background: blue;
  color: white;
}
.logoutBtn:hover {
  border: 1px solid white;
  background: white;
  color: blue;
}
</style>

// eslint-disable-next-line
<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">
            <slot name="title"></slot>
          </div>
          <button type="button" class="close">
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer" style="border-top: 1px solid white">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const onClose = () => {
      emit("close");
    };

    return {
      onClose,
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
  padding-left: 33%;
  font-size: 50px;
}
.modal-header {
  border-bottom: 1px solid white;
  padding-top: 20%;
}
.modal-content {
  height: 650px;
  text-align: center;
  border-radius: 20px;
}
.close {
  margin: 0;
}
.btn-secondary {
  color: blue;
}
</style>

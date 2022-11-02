import { createStore } from "vuex";

export default createStore({
  state: {
    memberId: "",
  },
  mutations: {
    GET_MEMBERID(state, payload) {
      state.memberId = payload;
    },
  },
});

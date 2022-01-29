import { createStore } from "vuex";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const store = createStore({
  state: {
    authUser: null,
  },
  mutations: {
    setUser(state, payload) {
      state.authUser = payload;
    },
  },
  actions: {
    async signIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", email);
      } else {
        console.log("ERROR :>> ");
      }
    },
  },
  getters: {
    __authUser: (state) => state.authUser,
  },
});

export default store;

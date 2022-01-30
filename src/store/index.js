import { createStore } from "vuex";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, deleteUser, addDoc, users, setPersistence, browserSessionPersistence } from "../config/firebase";

const store = createStore({
  state: {
    authUser: null,
  },
  mutations: {
    setUser(state, payload) {
      state.authUser = payload;
    },

    signOut(state) {
      state.authUser = null;
    },
  },
  actions: {
    async createUserWithEmail(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("setUser", email);
      } else {
        console.log(`ERROR`);
      }
    },

    async createUserInFirestore(context, { username, email }) {
      const response = await addDoc(users, { username, email });
      if (response) {
        console.log(response);
        context.commit("setUser", username);
      } else {
        console.log("error");
      }
    },

    async signIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        setPersistence(auth, browserSessionPersistence);
        context.commit("setUser", auth.currentUser.email);
      } else {
        console.log("ERROR :>> ");
      }
    },

    async deleteUser(context, { user }) {
      const response = await deleteUser(user);
      if (response) {
        context.commit("signOut");
      } else {
        console.log("ERROR");
      }
    },
  },
  getters: {
    __authUser: (state) => state.authUser,
  },
});

export default store;

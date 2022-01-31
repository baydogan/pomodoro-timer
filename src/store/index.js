import { createStore } from "vuex";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { auth, deleteUser, addDoc, users } from "../config/firebase";

const store = createStore({
  state: {
    authUserMail: null,
    authUserId: null,
  },
  mutations: {
    setUserMail(state, payload) {
      state.authUserMail = payload;
    },

    setUserId(state, payload) {
      state.authUserId = payload;
    },

    signOut(state) {
      state.authUserMail = null;
      state.authUserId = null;
    },
  },
  actions: {
    async createUserWithEmail(context, { email, password }) {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userId = auth.currentUser.uid;
      if (response) {
        context.commit("setUserMail", email);
        context.commit("setUserId", userId);
      } else {
        console.log(`ERROR`);
      }
    },

    async createUserInFirestore(context, { username, email }) {
      const response = await addDoc(users, { username, email });
      const userId = auth.currentUser.uid;
      if (response) {
        context.commit("setUserMail", email);
        context.commit("setUserId", userId);
      } else {
        console.log("error");
      }
    },

    async signIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        setPersistence(auth, browserSessionPersistence);
        const userId = auth.currentUser.uid;
        const userMail = auth.currentUser.email;
        context.commit("setUserMail", userMail);
        context.commit("setUserId", userId);
        // context.commit("setUser", auth.currentUser.email);
      } else {
        console.log("ERROR :>> ");
      }
    },

    async signOutUser(context) {
      signOut(auth).then(() => {
        context.commit("signOut");
      });
    },

    async fetchAuthUser(context) {
      const userId = auth.currentUser.uid;
      const userMail = auth.currentUser.email;
      if (!userId) return;
      context.commit("setUserMail", userMail);
      context.commit("setUserId", userId);
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

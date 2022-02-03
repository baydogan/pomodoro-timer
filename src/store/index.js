import { createStore } from "vuex";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { auth, deleteUser, addDoc, users, userSettings, getDocs } from "../config/firebase";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

const store = createStore({
  state: {
    authUserMail: null,
    authUserId: null,

    authUserOptions: {
      pomodoro: null,
      shortBreak: null,
      longBreak: null,
    },
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

    setUserSettings(state, pomodoro, short, long) {
      state.authUserOptions.pomodoro = pomodoro;
      state.authUserOptions.shortBreak = short;
      state.authUserOptions.shortBreak = long;
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
      if (response) {
        context.commit("setUserMail", email);
      } else {
        console.log("error");
      }
    },

    async createTimerSettings(context, { userEmail, pomodoro, shortBreak, longBreak }) {
      const response = await addDoc(userSettings, { userEmail, pomodoro, shortBreak, longBreak });
      if (response) {
        context.commit("setUserSettings", pomodoro, shortBreak, longBreak);
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

    async findUserSettings() {
      await getDocs(userSettings).then((snapshot) => {
        let settings = [];
        snapshot.docs.forEach((doc) => {
          settings.push({ ...doc.data(), id: doc.id });
        });
        const authUserSettings = settings.find((s) => s.userEmail === auth.currentUser.email);
        console.log(authUserSettings);
      });
    },

    async getAuthUserSettings() {},

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

  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});

export default store;

import { createStore } from "vuex";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { auth, deleteUser, addDoc, users, userSettings, getDocs } from "../config/firebase";

const store = createStore({
  state: {
    authUserMail: null,
    authUserId: null,
    authUserSettings: null,

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

    setAuthUserSettings(state, payload) {
      state.authUserSettings = payload;
    },

    setUserSettings(state, payload) {
      state.authUserOptions = payload;
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

    async findUserSettings(context) {
      await getDocs(userSettings).then((snapshot) => {
        let settings = [];
        snapshot.docs.forEach((doc) => {
          settings.push({ ...doc.data(), id: doc.id });
        });
        const authUserSettings = settings.find((s) => s.userEmail === auth.currentUser.email);
        const { id, userEmail, ...restData } = authUserSettings;
        console.log(userEmail);
        context.commit("setUserSettings", restData);
        context.commit("setAuthUserSettings", id);
      });
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
    __authUser: (state) => state.authUserMail,
    __authUserSettings: (state) => state.authUserSettings,
    __authUserOptions: (state) => state.authUserOptions,
  },
});

export default store;

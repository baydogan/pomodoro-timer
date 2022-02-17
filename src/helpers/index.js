import { getDocs } from "firebase/firestore";
import { userSettings, auth } from "../config/firebase";

export const resetForm = (form) => Object.keys(form).forEach((key) => (form[key] = null));

export const setTime = (time, startMin) => {
  time = startMin * 60;
};

export function findUserSettings() {
  getDocs(userSettings).then((snapshot) => {
    let settings = [];
    snapshot.docs.forEach((doc) => {
      settings.push({ ...doc.data(), id: doc.id });
    });
    const authUserSettings = settings.find((s) => s.userEmail === auth.currentUser.email);
    const { pomodoro, longBreak, shortBreak } = authUserSettings;
    return {
      pomodoro,
      longBreak,
      shortBreak,
    };
  });
}

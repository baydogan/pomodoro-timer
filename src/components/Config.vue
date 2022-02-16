<template>
  <div class="w-96 h-56 bg-white flex justify-center rounded-md m-auto shadow-xl flex-col fixed inset-0 z-50">
    <div class="text-left w-full p-3 flex justify-between">
      <h1 class="">Timer Settings</h1>
      <fa icon="times" class="fa-1x text-black cursor-pointer" @click="closeSettingsPopup" />
    </div>
    <div class="w-11/12 mx-auto mb-1">
      <hr />
    </div>
    <div class="flex justify-center mt-1">
      <div class="flex flex-col">
        <span class="ml-3 text-sm">Pomodoro</span>
        <input class="config-inputs" type="number" v-model="timerSettings.pomodoro" />
      </div>
      <div class="flex flex-col">
        <span class="ml-3 text-sm">Short Break</span>
        <input class="config-inputs" type="number" v-model="timerSettings.shortBreak" />
      </div>
      <div class="flex flex-col">
        <span class="ml-3 text-sm"> Long Break</span>
        <input class="config-inputs" type="number" v-model="timerSettings.longBreak" />
      </div>
      <hr />
    </div>
    <div class="flex justify-end p-4">
      <button class="p-3 bg-gray-800 w-20 rounded-md text-white" @click="saveSettings">OK</button>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";
import { doc, updateDoc } from "@firebase/firestore";
import { userSettings } from "../config/firebase";
import { computed } from "vue";

export default {
  setup(props, { emit }) {
    const closeSettingsPopup = () => {
      emit("closeSettingsPopup");
    };

    onBeforeMount(() => {
      store.dispatch("findUserSettings")
    })

    const store = useStore();
    const authUserSettings = computed(() => store.getters["__authUserSettings"]);
    const authUserOptions = reactive(store.getters["__authUserOptions"]);

    const timerSettings = reactive({
      pomodoro: authUserOptions.pomodoro,
      shortBreak: authUserOptions.shortBreak,
      longBreak: authUserOptions.longBreak,
    });

    const saveSettings = () => {
      const docRef = doc(userSettings, authUserSettings.value);
      updateDoc(docRef, {
        pomodoro: timerSettings.pomodoro,
        shortBreak: timerSettings.shortBreak,
        longBreak: timerSettings.longBreak,
      });
      store.commit("setUserSettings", timerSettings);
    };

    return {
      closeSettingsPopup,
      timerSettings,
      saveSettings,
      authUserSettings,
      authUserOptions,
    };
  },
};
</script>

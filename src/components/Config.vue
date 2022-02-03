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
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { auth } from "../config/firebase";

export default {
  setup(props, { emit }) {
    const closeSettingsPopup = () => {
      emit("closeSettingsPopup");
    };

    onMounted(async () => {
      await store.dispatch("findUserSettings");
    });

    const store = useStore();

    const timerSettings = reactive({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    });

    const saveSettings = () => {
      store.dispatch("createTimerSettings", {
        userEmail: auth.currentUser.email,
        pomodoro: timerSettings.pomodoro,
        shortBreak: timerSettings.shortBreak,
        longBreak: timerSettings.longBreak,
      });
    };

    return {
      closeSettingsPopup,
      timerSettings,
      saveSettings,
    };
  },
};
</script>

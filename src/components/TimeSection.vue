<template>
  <div class="flex justify-center items-center flex-col">
    <div class="flex gap-4 items-center mt-10">
      <ul class="flex">
        <li
          class="menu-button m-1"
          @click="
            changeTimer(durations[0].duration);
            currentPhase = durations[0].currentPhase;
          "
        >
          Pomodoro
        </li>
        <li
          class="menu-button m-1"
          @click="
            changeTimer(durations[1].duration);
            currentPhase = durations[1].currentPhase;
          "
        >
          Short Break
        </li>
        <li
          class="menu-button m-1"
          @click="
            changeTimer(durations[2].duration);
            currentPhase = durations[2].currentPhase;
          "
        >
          Long Break
        </li>
      </ul>
    </div>
    <div class="mt-10 mb-8 justify-center">
      <h1 class="text-8xl select-none font-fredoka text-white">{{ timeDisplay }}</h1>
    </div>
    <div class="flex items-center">
      <button
        @click="startTimer"
        class="bg-slate-50 px-4 mt-5 py-4 w-60 rounded-md shadow-bottom font-semibold cursor-pointer ml-10 active:shadow-none"
        :class="{
          'bg-slate-50 px-4 py-4 w-full  rounded-md shadow-none font-semibold cursor-pointer': isTimerEnable,
        }"
      >
        <span v-if="!isTimerEnable">START</span>
        <span v-if="isTimerEnable">STOP</span>
      </button>
      <button @click="resetTimer">
        <fa icon="redo-alt" class="fa-2x text-white ml-4 mt-4" />
      </button>
    </div>
  </div>
  <div class="flex justify-center mt-5">
    <h1 class="text-2xl text-white ml-3 mr-3">{{ currentPhase }}</h1>
  </div>
</template>

<script>
import { ref, computed, reactive, onBeforeMount } from "vue";
import { setTime } from "../helpers";
import { useStore } from "vuex";

export default {
  setup() {
    onBeforeMount(async () => {});
    const store = useStore();
    const authUserOptions = reactive(store.getters["__authUserOptions"]);


    const durations = reactive([
      {
        currentPhase: "Time to focus!",
        duration: 25
      },
      {
        currentPhase: "Short Break",
        duration: 5
      },
      {
        currentPhase: "Long Break",
        duration: authUserOptions.longBreak ,
      },
    ]);
    let currentPhase = ref("Time to focus!");
    let startButton = ref("");
    const isTimerEnable = ref(false);
    let startMin = ref(durations[0].duration);
    let time = ref(startMin.value * 60);
    let timer = setInterval(() => {
      if (isTimerEnable.value && time.value > 0) {
        time.value--;
      }
    }, 1000);

    const timeDisplay = computed(() => {
      const minutes = ref(Math.floor(time.value / 60));
      const seconds = ref(time.value % 60);
      const fixedMinutes = minutes.value < 10 ? `0${minutes.value}` : `${minutes.value}`;
      const fixedSeconds = seconds.value < 10 ? `0${seconds.value}` : `${seconds.value}`;
      return `${fixedMinutes}:${fixedSeconds}`;
    });

    const startTimer = () => {
      isTimerEnable.value = !isTimerEnable.value;
      console.log(store.state.authUserOptions.pomodoro);
    };

    const resetTimer = () => {
      isTimerEnable.value = false;
      time.value = startMin.value * 60;
    };

    const changeTimer = (val) => {
      startMin.value = val;
      time.value = startMin.value * 60;
      setTime(startMin.value);
    };

    const setPhase = (val) => {
      currentPhase.value == val;
    };

    return {
      setPhase,
      changeTimer,
      startTimer,
      isTimerEnable,
      time,
      timer,
      timeDisplay,
      startButton,
      resetTimer,
      currentPhase,
      durations,
    };
  },
};
</script>

<template>
  <Header @openSettingsPopup="toggleSettingsPopup" />

  <TimeSection />
  <Transition name="fade">
    <Config v-if="configPopup" @closeSettingsPopup="toggleSettingsPopup" />
  </Transition>
  <div v-if="configPopup" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
</template>
<script>
import Header from "./Header.vue";
import TimeSection from "./TimeSection.vue";
import Config from "./Config.vue";
import { ref } from "vue";
export default {
  components: {
    Header,
    TimeSection,
    Config,
  },

  setup() {
    let configPopup = ref(false);

    const toggleSettingsPopup = () => {
      configPopup.value = !configPopup.value;
    };

    return {
      configPopup,
      toggleSettingsPopup,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

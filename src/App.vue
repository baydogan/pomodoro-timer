<template>
  <router-view />
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("findUserSettings");
    });
  },
};
</script>

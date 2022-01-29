<template>
  <div class="m-auto max-w-5xl pr-3 pl-3 mt-5">
    <div class="bg-inherit w-full flex justify-between">
      <Logo />
      <div class="flex items-center mt-1">
        <button class="header-button">
          <fa icon="tasks" class="fa-lg" />
          <span class="text-xs md:text-base"> Tasks </span>
        </button>
        <button class="header-button" @click="openSettingsPopup">
          <fa icon="cog" class="fa-lg" />
          <span class="text-xs md:text-base"> Config </span>
        </button>

        <router-link :to="{ name: 'Login' }" class="header-button">
          <fa icon="user-circle" class="fa-lg" />
          <span class="text-xs md:text-base"> Login </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  components: {
    Logo,
  },

  setup(props, { emit }) {
    const openSettingsPopup = () => {
      emit("openSettingsPopup");
    };

    return {
      openSettingsPopup,
    };
  },
};
</script>

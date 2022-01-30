<template>
  <div class="m-auto max-w-5xl pr-3 pl-3 mt-5">
    <div class="bg-inherit w-full flex justify-between">
      <Logo />
      <div class="flex items-center mt-1">
        <div class="mt-16">
          <UserOptions v-if="userMenuPopup && authUser !== null" />
        </div>
        <button class="header-button">
          <fa icon="tasks" class="fa-lg" />
          <span class="text-xs md:text-base"> Tasks </span>
        </button>

        <button class="header-button" @click="openSettingsPopup">
          <fa icon="cog" class="fa-lg" />
          <span class="text-xs md:text-base"> Config </span>
        </button>

        <router-link :to="{ name: 'Login' }" class="header-button" v-if="authUser == null">
          <fa icon="user-circle" class="fa-lg" />
          <span class="text-xs md:text-base"> Login </span>
        </router-link>
        <div v-else class="flex flex-col mb-1 ml-3 cursor-pointer" @click="userMenuPopup = !userMenuPopup">
          <img src="../assets/default-user-image.png" class="w-10 h-10 rounded-full" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserOptions from "./UserOptions.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import Logo from "./Logo";
export default {
  components: {
    Logo,
    UserOptions,
  },

  setup(props, { emit }) {
    const store = useStore();
    const userMenuPopup = ref(false);
    const openSettingsPopup = () => {
      emit("openSettingsPopup");
    };

    const authUser = computed(() => {
      return store.state.authUser;
    });

    return {
      openSettingsPopup,
      authUser,
      userMenuPopup,
    };
  },
};
</script>

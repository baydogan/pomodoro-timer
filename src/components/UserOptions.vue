<template>
  <div class="bg-white rounded-md absolute p-2 w-40 md:w-52 h-28 ml-8 shadow-lg">
    <div class="p-1 hover:bg-slate-200 rounded-md cursor-pointer">
      <fa icon="user-circle" class="fa-lg" />
      <span class="ml-2 text-sm md:text-base">Profile</span>
    </div>
    <div class="p-1 hover:bg-slate-200 rounded-md cursor-pointer">
      <fa icon="sign-out-alt" class="fa-lg" />
      <span class="ml-2 text-sm md:text-base" @click="signOut">Logout</span>
    </div>
    <div class="p-1 hover:bg-slate-200 rounded-md cursor-pointer">
      <fa icon="trash" class="fa-lg" />
      <span class="ml-2 text-sm md:text-base" @click="deleteUser">Delete Account</span>
    </div>
    {{}}
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const authUser = computed(() => {
      return store.state.authUser;
    });
    const signOut = () => {
      store.dispatch("signOutUser");
    };

    const deleteUser = () => {
      store.dispatch("deleteUser", { user: authUser.value });
    };

    return {
      signOut,
      deleteUser,
      authUser,
    };
  },
};
</script>

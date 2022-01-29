<template>
  <form action="" @submit.prevent="loginAction">
    <div class="flex items-center justify-center flex-col h-screen">
      <div class="flex flex-col items-center justify-center">
        <router-link :to="{ name: 'Home' }">
          <Logo />
        </router-link>
        <span class="mb-4 mt-4 text-white text-xl"> Login </span>
      </div>
      <div class="form-container">
        <button class="form-button">
          <img src="../assets/glogo.svg" class="h-4 mr-1" alt="" />
          Login with Google
        </button>
        <div class="text-center border-b border-gray-300 w-full">
          <span class="relative top-10px text-gray-400 text-xs bg-white pl-1 pr-1">or</span>
        </div>
        <EmailField v-model="email" />
        <PassField v-model="password" />

        <button
          type="submit"
          class="form-button bg-slate-600 font-bold shadow-lg hover:bg-slate-800 transition-all duration-500"
        >
          LOGIN WITH EMAIL
        </button>
        <router-link to="ResetPassword" class="flex justify-center mt-3 text-xs hover:underline cursor-pointer"
          >Reset Password</router-link
        >
      </div>

      <div class="flex items-center justify-center flex-col">
        <div class="mt-4 text-sm mb-1 text-white">DO NOT HAVE AN ACCOUNT</div>
        <router-link to="SignUp" class="underline text-sm">Create Account</router-link>
      </div>
      <div v-if="error">{{ error }}</div>
      {{ authUser }}
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import Logo from "../components/Logo";
import EmailField from "../components/forms/EmailField.vue";
import PassField from "../components/forms/PassField.vue";

export default {
  components: {
    Logo,
    EmailField,
    PassField,
  },

  setup() {
    const email = ref("");
    const password = ref("");

    const store = useStore();
    let error = ref(null);

    const loginAction = () => {
      store.dispatch("signIn", {
        email: email.value,
        password: password.value,
      });
    };

    const authUser = computed(() => store.getters["__authUser"]);

    return { email, password, error, loginAction, authUser };
  },
};
</script>

<template>
  <form>
    <div class="flex items-center justify-center flex-col h-screen">
      <div class="flex flex-col items-center justify-center">
        <router-link :to="{ name: 'Home' }">
          <Logo />
        </router-link>
        <span class="mb-4 mt-4 text-gray-200"> Create An Account </span>
      </div>
      <div class="form-container">
        <button class="form-button" @click="signInWithGooglePopup">
          <img src="../assets/glogo.svg" class="h-4 mr-1" alt="" />
          Singup with Google
        </button>
        <div class="text-center border-b border-gray-300 w-full">
          <span class="relative top-10px text-gray-400 text-xs bg-white pl-1 pr-1">or</span>
        </div>
        <UserNameField v-model="userData.userName" />
        <EmailField v-model="userData.email" />
        <PassField v-model="userData.password" />
        <button
          @click="createUserWithEmail"
          type="submit"
          class="form-button bg-slate-600 font-bold shadow-lg"
          :disabled="buttonState"
        >
          SIGNUP WITH EMAIL
        </button>
      </div>
      <div class="flex items-center justify-center flex-col">
        <div class="mt-4 text-gray-200 text-xl">ALREADY HAVE AN ACCOUNT?</div>
        <router-link to="Login" class="underline text-sm text-gray-900">Login</router-link>
      </div>
    </div>
  </form>
</template>

<script>
import UserNameField from "../components/forms/UserNameField.vue";
import useFormValidations from "../modules/useFormValidations";
import EmailField from "../components/forms/EmailField.vue";
import PassField from "../components/forms/PassField.vue";
import Logo from "../components/Logo";
import { reactive, computed } from "vue";
import { GoogleAuthProvider, signInWithRedirect, auth } from "../config/firebase";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    Logo,
    EmailField,
    PassField,
    UserNameField,
  },

  setup() {
    const { errors, isDisabled } = useFormValidations();
    const userData = reactive({
      userName: "",
      email: "",
      password: "",
    });

    const router = useRouter();
    const store = useStore();
    const createUserWithEmail = async () => {
      try {
        store.dispatch("createUserWithEmail", {
          email: userData.email,
          password: userData.password,
        });
        store.dispatch("createUserInFirestore", {
          username: userData.userName,
          email: userData.email,
        });
        store.dispatch("createTimerSettings", {
          userEmail: userData.email,
          pomodoro: 25,
          shortBreak: 5,
          longBreak: 10,
        });
      } catch (error) {
        console.log(error.message);
      }

      router.push("/");
    };

    const signInWithGooglePopup = () => {
      const provider = new GoogleAuthProvider();
      try {
        signInWithRedirect(auth, provider);
      } catch (error) {
        console.log(error.message);
      }
    };

    const buttonState = computed(() => {
      return isDisabled(errors);
    });

    return {
      userData,
      errors,
      createUserWithEmail,
      buttonState,
      signInWithGooglePopup,
    };
  },
};
</script>

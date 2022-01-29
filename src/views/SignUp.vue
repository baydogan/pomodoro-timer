<template>
  <form @submit.prevent="createUserWithEmail">
    <div class="flex items-center justify-center flex-col h-screen">
      <div class="flex flex-col items-center justify-center">
        <router-link :to="{ name: 'Home' }">
          <Logo />
        </router-link>
        <span class="mb-4 mt-4 text-gray-200"> Create An Account </span>
      </div>
      <div class="form-container">
        <button class="form-button">
          <img src="../assets/glogo.svg" class="h-4 mr-1" alt="" />
          Singup with Google
        </button>
        <div class="text-center border-b border-gray-300 w-full">
          <span class="relative top-10px text-gray-400 text-xs bg-white pl-1 pr-1">or</span>
        </div>
        <UserNameField v-model="userData.userName" />
        <EmailField v-model="userData.email" />
        <PassField v-model="userData.password" />
        <button type="submit" class="form-button bg-slate-600 font-bold shadow-lg" :disabled="isDisabled">
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
import { auth, users, addDoc } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { resetForm } from "../helpers";
// import { useStore } from "vuex";

// import { useRouter } from 'vue-router';

export default {
  components: {
    Logo,
    EmailField,
    PassField,
    UserNameField,
  },

  setup() {
    const { errors } = useFormValidations();
    const userData = reactive({
      userName: "",
      email: "",
      password: "",
    });

    const createUserWithEmail = async () => {
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await addDoc(users, {
        username: userData.userName,
        email: userData.email,
      });
      resetForm(userData);
    };

    const isDisabled = computed(() => {
      let disabled = true;
      for (let prop in errors) {
        if (errors[prop] !== "") {
          disabled = true;
          break;
        } else {
          disabled = false;
        }
      }
      return disabled;
    });

    return {
      userData,
      errors,
      isDisabled,
      createUserWithEmail,
    };
  },
};
</script>

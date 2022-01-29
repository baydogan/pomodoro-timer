<template>
  <div class="flex items-center justify-center flex-col h-screen">
    <div class="flex flex-col items-center justify-center">
      <router-link :to="{ name: 'Home' }">
        <Logo />
      </router-link>
      <span class="mb-4 mt-4"> Reset Password </span>
    </div>
    <div class="form-container">
      <div class="mt-4 text-xs">EMAIL</div>
      <input
        type="email"
        class="form-input"
        placeholder="Your e-mail address"
      />
      <button class="form-button bg-slate-600 font-bold shadow-lg">
        RESET PASSWORD
      </button>
    </div>

    <div class="flex items-center justify-center flex-col">
      <div class="text-sm mt-4">TRY OTHER METHODS</div>
      <router-link to="Login" class="underline text-sm">Login</router-link>
    </div>
  </div>
</template>
<script>
import Logo from "../components/Logo";
export default {
  components: {
    Logo,
  },
};
</script>

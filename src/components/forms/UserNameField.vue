<template>
  <div class="flex flex-col">
    <label for="" class="text-xs mt-2 mb-1 ml-1">USERNAME</label>
    <input
      type="text"
      class="form-input"
      @keyup="validName"
      v-model="userNameInput"
      placeholder="Username"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="text-xs text-red-400 mt-1 ml-1" v-if="errors.username">
      {{ errors.username }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidations from "../../modules/useFormValidations";
export default {
  setup() {
    const userNameInput = ref("");
    const { validateUserNameLength, errors } = useFormValidations();
    const validName = () => {
      validateUserNameLength(userNameInput.value, "username");
    };
    return { userNameInput, validName, errors };
  },
};
</script>

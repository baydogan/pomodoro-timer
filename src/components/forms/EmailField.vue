<template>
  <div class="flex flex-col">
    <label for="" class="text-xs mt-2 mb-1 ml-1">E-MAIL</label>
    <input
      type="email"
      placeholder="Email address"
      class="form-input"
      v-model="input"
      @keyup="validateEmail"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="text-xs text-red-400 mt-1 ml-1" v-if="errors.email">
      {{ errors.email }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidations from "../../modules/useFormValidations";

export default {
  setup() {
    let input = ref("");
    const { validateEmailField, errors } = useFormValidations();
    const validateEmail = () => {
      validateEmailField("email", input.value);
    };
    return { input, errors, validateEmail };
  },
};
</script>

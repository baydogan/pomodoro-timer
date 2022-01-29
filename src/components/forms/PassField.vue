<template>
  <div class="flex flex-col">
    <label for="" class="text-xs mt-1 ml-1">PASSWORD</label>
    <input
      type="password"
      class="form-input"
      placeholder="Password"
      v-model="firstPass"
      @keyup="checkPassLength"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="text-xs text-red-400 mt-1 ml-1" v-if="errors.password">
      {{ errors.password }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useFormValidations from "../../modules/useFormValidations";
export default {
  setup() {
    let firstPass = ref("");
    const { validateMinLength, errors } = useFormValidations();
    const checkPassLength = () => {
      validateMinLength(firstPass.value, "password");
    };

    return { firstPass, checkPassLength, errors };
  },
};
</script>

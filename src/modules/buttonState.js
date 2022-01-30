import { computed } from "vue";

export const isDisabled = computed((errors) => {
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

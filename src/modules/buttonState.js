import { computed } from "vue";

export const isDisabled = computed((errors) => {
  let disabled = true;
  for (let prop in errors) {
    if (errors[prop] !== "") {
      disabled = true;
    } else {
      disabled = false;
    }
  }
  return disabled;
});

// export default function buttonState(errors) {
//   const isDisabled = computed(() => {
//     let disabled = true;
//     for (let prop in errors) {
//       if (errors[prop] !== "") {
//         disabled = true;
//         break;
//       } else {
//         disabled = false;
//       }
//       return disabled;
//     }
//     return isDisabled;
//   });

//   return {isDisabled}
// }
// const isDisabled = computed(() => {
//     let disabled = true;
//     for (let prop in errors) {
//       if (errors[prop] !== "") {
//         disabled = true;
//         break;
//       } else {
//         disabled = false;
//       }
//       return disabled;
//     }
//     return isDisabled;
//   });

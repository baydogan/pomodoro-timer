import { reactive } from "vue";
import useValidators from "./useValidators";

const errors = reactive({});

export default function useFormValidations() {
  const { isEmail, isEmpty, minLength, isEqual } = useValidators();
  const validateInputField = (fieldName, fieldValue) => {
    errors[fieldName] = fieldValue === "" ? "The " + fieldName + " is required" : "";
  };
  const validateEmailField = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldValue);
  };

  const validateMinLength = (fieldValue, fieldName) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldValue, 8, fieldName);
  };

  const validateUserNameLength = (fieldValue, fieldName) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldValue, 5, fieldName);
  };

  const checkPasswords = (fieldOne, fieldTwo, fieldName) => {
    errors[fieldName] = isEqual(fieldOne, fieldTwo);
  };

  const isDisabled = (errors) => {
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
  };

  return {
    errors,
    validateInputField,
    validateEmailField,
    validateMinLength,
    checkPasswords,
    isDisabled,
    validateUserNameLength,
  };
}

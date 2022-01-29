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
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldValue, 8);
  };

  const checkPasswords = (fieldOne, fieldTwo, fieldName) => {
    errors[fieldName] = isEqual(fieldOne, fieldTwo);
  };

  return { errors, validateInputField, validateEmailField, validateMinLength, checkPasswords };
}


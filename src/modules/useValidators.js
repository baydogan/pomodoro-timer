export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };

  const minLength = (fieldValue, min) => {
    return fieldValue.length < min ? `The password field must be at least ${min} char` : "";
  };

  const isEqual = (fieldOne, fieldTwo) => {
    return fieldOne == fieldTwo ? "" : "Passwords are not matched";
  };

  const isEmail = (fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(fieldValue) ? "Please type a valid email address" : "";
  };

  return { isEmpty, minLength, isEqual, isEmail };
}

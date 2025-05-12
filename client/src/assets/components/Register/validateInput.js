import {
  checkEmailRequirements,
  checkPasswordRequirements,
} from "../../utils/checkInputRequirements.js";

export const validateInput = (value, name, serverInputError = "") => {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return {
      isError: null,
      msg: "",
    };
  }

  if (name === "email") {
    return checkEmailRequirements(trimmedValue, serverInputError);
  }

  if (name === "password") {
    return checkPasswordRequirements(trimmedValue);
  }

  // Per il campo "nume" o altri, non viene effettuato un controllo complesso
  return {
    isError: false,
    msg: "",
  };
};

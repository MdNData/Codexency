export const checkPasswordRequirements = (password) => {
  if (password.length < 8) {
    return {
      isError: true,
      msg: "Parola trebuie să conțină cel puțin 8 caractere",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isError: true,
      msg: "Parola trebuie să includă cel puțin o literă mică",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isError: true,
      msg: "Parola trebuie să includă cel puțin o literă mare",
    };
  }

  if (!/\d/.test(password)) {
    return {
      isError: true,
      msg: "Parola trebuie să includă cel puțin un număr",
    };
  }

  if (!/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(password)) {
    return {
      isError: true,
      msg: "Parola trebuie să includă cel puțin un caracter special",
    };
  }

  return {
    isError: false,
    msg: "",
  };
};

export const checkEmailRequirements = (email, serverInputError = "") => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      isError: true,
      msg: "Emailul trebuie să fie valid",
    };
  } else if (serverInputError?.response?.data?.msg === "email deja folosit") {
    serverInputError.response.data.msg = "";
    return {
      isError: true,
      msg: "Email deja folosită",
    };
  } else {
    return {
      isError: false,
      msg: "",
    };
  }
};

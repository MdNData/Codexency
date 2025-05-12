import React from "react";
import apiFetch from "../utils/apiFetch.js";
import { useActionData } from "react-router-dom";
import RegisterComponent from "../components/Register/RegisterComponent.jsx";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await apiFetch.post("/access/register", data);
    window.location.href = "/cont";
  } catch (error) {
    return error.response?.data || error;
  }
};

const Register = () => {
  const error = useActionData();
  return <RegisterComponent serverInputError={error} />;
};

export default Register;

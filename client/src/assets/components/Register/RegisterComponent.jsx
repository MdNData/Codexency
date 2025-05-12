import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { validateInput } from "./validateInput";
import StandardInputFiled from "../Inputs/StandardInputField/StandardInputFiled";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import OnOffCheck from "../Buttons/OnOffCheck/OnOffCheck";

const RegisterComponent = ({ serverInputError }) => {
  const [nume, setNume] = useState("");
  const [numeError, setNumeError] = useState({ isError: false, msg: "" });
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({ isError: false, msg: "" });
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    isError: false,
    msg: "",
  });
  const [marketing, setMarketing] = useState(false);
  const [generalError, setGeneralError] = useState(true);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const serverActionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverInputError) {
      const errorMessage =
        typeof serverInputError === "string"
          ? serverInputError
          : serverInputError.msg || "A apărut o eroare la înregistrare.";
      toast.error(errorMessage);
    }
  }, [serverInputError]);

  useEffect(() => {
    if (
      serverActionData &&
      !serverActionData.error &&
      serverActionData.msg === "Utilizator creat cu succes"
    ) {
      navigate("/cont");
    }
  }, [serverActionData, navigate]);

  useEffect(() => {
    const hasError =
      numeError.isError || emailError.isError || passwordError.isError;
    setGeneralError(hasError || !nume || !email || !password);
  }, [numeError, emailError, passwordError, nume, email, password]);

  const handleSubmit = (e) => {
    const numeValidation = validateInput(nume, "nume", serverInputError);
    const emailValidation = validateInput(email, "email", serverInputError);
    const passwordValidation = validateInput(
      password,
      "password",
      serverInputError
    );

    setNumeError(numeValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (
      numeValidation.isError ||
      emailValidation.isError ||
      passwordValidation.isError ||
      !nume ||
      !email ||
      !password
    ) {
      e.preventDefault();
      toast.error(
        "Vă rugăm să corectați erorile înainte de a trimite formularul."
      );
      return;
    }
  };

  return (
    <section className="register">
      <Form method="POST" onSubmit={handleSubmit}>
        <h2>Creare cont nou</h2>
        {/*nume*/}
        <StandardInputFiled
          label="Nume"
          name="nume"
          placeholder="Nume complet"
          iconElement={<FiUser />}
          value={nume}
          setValue={setNume}
          error={numeError}
          setError={setNumeError}
          validate={validateInput}
          isSubmitting={isSubmitting}
          serverInputError={serverInputError}
        />

        {/*email*/}
        <StandardInputFiled
          name="email"
          label="Email"
          placeholder="nume@email.com"
          iconElement={<FiMail />}
          value={email}
          setValue={setEmail}
          error={emailError}
          setError={setEmailError}
          validate={validateInput}
          isSubmitting={isSubmitting}
          serverInputError={serverInputError}
        />

        {/*parola*/}
        <StandardInputFiled
          name="password"
          label="Parolă"
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="••••••••"
          iconElement={<FiLock />}
          error={passwordError}
          setError={setPasswordError}
          validate={validateInput}
          isSubmitting={isSubmitting}
        />

        <OnOffCheck
          name="marketing"
          label="Vreau să primesc promotii, oferte, noutăți și informații despre produse."
          value={marketing}
          setValue={setMarketing}
        />

        <p className="accept-terms-button">
          Apăsând pe „Înregistrează-te”, sunt de acord cu
          <Link to="/termeni"> Termeni și Condiții </Link>
          și cu prelucrarea datelor mele cu caracter personal pentru gestionarea
          contului și a comenzilor.
        </p>

        <SubmitButton
          text="Înregistrează-te"
          generalError={generalError}
          isSubmitting={isSubmitting}
        />

        <Link to="/login">Ai deja cont? Autentifică-te aici</Link>
      </Form>
    </section>
  );
};

export default RegisterComponent;

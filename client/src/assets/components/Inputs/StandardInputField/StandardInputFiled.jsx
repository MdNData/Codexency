import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const StandardInputFiled = ({
  name = "",
  label,
  type = "text",
  value = "",
  required = true,
  autoComplete = "on",
  placeholder = "",
  iconElement = null,
  error,
  setError,
  validate,
  isSubmitting,
  serverInputError,
  setValue,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    if (!isTouched) setIsTouched(true);
    if (typeof validate === "function") {
      const validationResult = validate(inputValue, name, serverInputError);
      setError(validationResult);
    }
  };

  const handleBlur = () => {
    if (!isTouched) setIsTouched(true);
    if (typeof validate === "function") {
      const validationResult = validate(value, name, serverInputError);
      setError(validationResult);
    }
  };

  const effectiveType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  let borderColor = "rgb(209, 213, 219)";
  if (isTouched) {
    if (error && error.isError) {
      borderColor = "red";
    } else if (!error?.isError && value) {
      borderColor = "green";
    }
  }

  return (
    <div className="standard-input-field">
      <label htmlFor={name}>
        <p>{label || name}</p>

        {iconElement && <span className="left-icon">{iconElement}</span>}

        {type === "password" && (
          <span
            className="password-toggle"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}

        <input
          id={name}
          type={effectiveType}
          name={name}
          value={value}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor }}
          disabled={isSubmitting}
        />
      </label>

      {isTouched && error && error.isError && (
        <div className="error-message">{error.msg}</div>
      )}
    </div>
  );
};

export default StandardInputFiled;

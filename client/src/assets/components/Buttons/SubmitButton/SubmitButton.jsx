import React from "react";

const SubmitButton = ({ text, generalError, isSubmitting, disabled }) => {
  return (
    <button
      type="submit"
      className="submit-button"
      disabled={disabled || generalError || isSubmitting}
    >
      {isSubmitting ? <div className="spinner"></div> : text}
    </button>
  );
};

export default SubmitButton;

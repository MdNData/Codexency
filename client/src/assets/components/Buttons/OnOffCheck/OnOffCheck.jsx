import React from "react";

const OnOffCheck = ({ name, label, value, setValue }) => {
  const handleToggle = () => {
    setValue(!value);
  };

  return (
    <div className="onoff-check">
      <label htmlFor={name} className="toggle-label">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          onChange={handleToggle}
        />
        <span className="slider" />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default OnOffCheck;

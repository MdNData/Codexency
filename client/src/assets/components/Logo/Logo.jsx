import React from "react";
import { NavLink } from "react-router-dom";

const Logo = ({
  isMenuOpen,
  setIsMenuOpen = () => {},
  title = "",
  img = "",
  alt = "",
  name = "",
}) => {
  return (
    <div className="logo" title={title}>
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <img src={img} alt={alt} />
        <span>{name}</span>
      </NavLink>
    </div>
  );
};

export default Logo;

import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../imgs/favicon/favicon.svg";

const Logo = ({ isMenuOpen, setIsMenuOpen = () => {} }) => {
  return (
    <div className="logo" title="Codexency Home">
      <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
        <img src={logo} alt="Codexency logo" />
        <span>Codexency</span>
      </NavLink>
    </div>
  );
};

export default Logo;

import React, { useState } from "react";
import Logo from "../Logo/Logo";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Logo isMenuOpen setIsMenuOpen />
      </nav>
    </div>
  );
};

export default NavBar;

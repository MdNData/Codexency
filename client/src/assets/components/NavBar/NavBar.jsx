import React, { useState } from "react";
import Logo from "../Logo/Logo";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Logo isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
    </div>
  );
};

export default NavBar;

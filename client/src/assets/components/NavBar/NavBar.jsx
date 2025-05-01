import React, { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import AccountButton from "../AccountButton/AccountButton";
import { useScreenSize } from "../../../context";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenSize = useScreenSize();
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Logo isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <AccountButton screenSize={screenSize} />
      </nav>
    </div>
  );
};

export default NavBar;

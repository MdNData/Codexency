import React, { useContext, useState } from "react";
import Logo from "../Logo/Logo";
import AccountButton from "../Buttons/AccountButton/AccountButton";
import { useScreenSize } from "../../../context";
import logo from "../../imgs/favicon/favicon.svg";
import { AuthContext } from "../../utils/AuthContext";
import AccessButton from "../Buttons/AccessButton/AccessButton";
import CartButton from "../Buttons/CartButton/CartButton";
import MenuButton from "../Buttons/MenuButton/MenuButton";
import Menu from "./Menu/Menu";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenSize = useScreenSize();
  const { user } = useContext(AuthContext);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Logo
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          title="Codexency Home"
          img={logo}
          alt="Codexency logo"
          name="Codexency"
        />
        <CartButton />
        {user ? (
          <AccountButton screenSize={screenSize} />
        ) : (
          <AccessButton screenSize={screenSize} />
        )}
        {screenSize.width < 1000 ? (
          <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        ) : null}
        <Menu
          isMenuOpen={screenSize.width < 1000 ? isMenuOpen : true}
          setIsMenuOpen={setIsMenuOpen}
          screenSize={screenSize}
        />
      </nav>
    </div>
  );
};

export default NavBar;

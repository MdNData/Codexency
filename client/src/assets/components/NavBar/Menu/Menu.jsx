import React from "react";
import useDetectUrl from "../../../hooks/useDetectUrl";
import { NavLink } from "react-router-dom";

const Menu = ({
  isMenuOpen = () => {},
  setIsMenuOpen = () => {},
  screenSize = {},
}) => {
  const currentUrl = useDetectUrl();
  const { width } = screenSize;
  const user = null;
  return (
    <div
      className={isMenuOpen ? "nav-menu" : "nav-menu closed"}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      <ul
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <li>
          <NavLink className={currentUrl == "/" ? "page_now" : ""} to={"/"}>
            <span>Acasa</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={currentUrl == "/about-me" ? "page_now" : ""}
            to={"/about-me"}
          >
            <span>Despre Mine</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={currentUrl == "/cursuri" ? "page_now" : ""}
            to={"/cursuri"}
          >
            <span>Cursuri Fizice</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={currentUrl == "/cursuri-online" ? "page_now" : ""}
            to={"/cursuri-online"}
          >
            <span>Cursuri Online</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={currentUrl == "/produse" ? "page_now" : ""}
            to={"/produse"}
          >
            <span>Produse</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={currentUrl == "/contact" ? "page_now" : ""}
            to={"/contact"}
          >
            <span>Contact</span>
          </NavLink>
        </li>
        {user?.status === "admin" ? (
          <li>
            <NavLink
              className={currentUrl == "/admin" ? "page_now" : ""}
              to={"/admin"}
            >
              <span>Admin</span>
            </NavLink>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default Menu;

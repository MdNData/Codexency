import React from "react";

const MenuButton = ({
  containerWidth = 25,
  color = "#041c4c",
  barHeight = 2,
  barBorderRadius = 99,
  barMargins = "6px 0 6px 0px",
  barTransition = "200ms all linear",
  isMenuOpen = () => {},
  setIsMenuOpen = () => {},
}) => {
  const defaultBarStyle = {
    backgroundColor: color,
    height: barHeight + "px",
    display: "block",
    borderRadius: barBorderRadius + "px",
    margin: barMargins,
    transition: barTransition,
    transform: "rotate(0) translateY(0)",
    width: "100%",
  };

  const topBarStyle = {
    transform: "rotate(45deg) translateY(11px)",
    margin: "6px 0 6px 9px",
  };

  const middleBarStyle = {
    width: "0px",
  };

  const bottomBarStyle = {
    transform: "rotate(-45deg) translateY(-12px)",
    margin: "6px 0 6px 9px",
  };

  return (
    <div
      className="nav-menu-btn"
      style={{ width: containerWidth + "px", cursor: "pointer", zIndex: "100" }}
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      <span
        style={
          isMenuOpen
            ? { ...defaultBarStyle, ...topBarStyle }
            : { ...defaultBarStyle }
        }
      ></span>
      <span
        style={
          isMenuOpen
            ? { ...defaultBarStyle, ...middleBarStyle }
            : { ...defaultBarStyle }
        }
      ></span>
      <span
        style={
          isMenuOpen
            ? { ...defaultBarStyle, ...bottomBarStyle }
            : { ...defaultBarStyle }
        }
      ></span>
    </div>
  );
};
export default MenuButton;

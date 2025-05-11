import React from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const AccessButton = ({ screenSize }) => {
  return (
    <div className="access-button">
      <Link to={"/"}>
        <FiUser />
        {screenSize.width > 1000 ? <span>Intra in cont</span> : ""}
      </Link>
    </div>
  );
};

export default AccessButton;

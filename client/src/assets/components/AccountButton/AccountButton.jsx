import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiSolidUpArrow } from "react-icons/bi";

const AccountButton = ({ screenSize }) => {
  const [isOnAccount, setIsOnAccount] = useState(false);
  const hideTimer = useRef(null);
  const containerRef = useRef(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const startHideTimer = () => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      setIsOnAccount(false);
    }, 600); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        clearHideTimer();
        setIsOnAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="account-button"
      ref={containerRef}
      onMouseEnter={() => {
        clearHideTimer();
        setIsOnAccount(true);
      }}
      onMouseLeave={startHideTimer}
    >
      <Link>
        <FiUser />
        {screenSize.width > 799 ? <span>Contul meu</span> : null}
      </Link>

      {screenSize.width > 799 && (
        <div
          className={`account-menu ${isOnAccount ? "visible" : "hidden"}`}
          onMouseEnter={clearHideTimer}
          onMouseLeave={startHideTimer}
        >
          <BiSolidUpArrow className="up-arrow" />
          <p>Buna Dragos!</p>
          <a href="/">Cursurile mele</a>
          <a href="/">Comenzile mele</a>
          <a href="/">Contul meu</a>
          <a href="/">Vouchere</a>
          <a href="/">Retururile mele</a>
          <a href="/">Review-urile mele</a>
          <a href="/">Adrese de livrare</a>
          <a href="/">Date facturare</a>
          <a href="/">Log out</a>
        </div>
      )}
    </div>
  );
};

export default AccountButton;

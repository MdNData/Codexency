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

  const handleLinkClick = () => {
    clearHideTimer();
    setIsOnAccount(false);
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
        {screenSize.width > 999 ? <span>Contul meu</span> : null}
      </Link>

      {screenSize.width > 999 && (
        <div
          className={`account-menu ${isOnAccount ? "visible" : "hidden"}`}
          onMouseEnter={clearHideTimer}
          onMouseLeave={startHideTimer}
        >
          <BiSolidUpArrow className="up-arrow" />
          <p>Buna Dragos!</p>
          <Link href="/" onClick={handleLinkClick}>
            Cursurile mele
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Comenzile mele
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Contul meu
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Vouchere
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Retururile mele
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Review-urile mele
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Adrese de livrare
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Date facturare
          </Link>
          <Link to="/cont#facturi" onClick={handleLinkClick}>
            Facturile mele
          </Link>
          <Link to="/cont" onClick={handleLinkClick}>
            Diplomele mele
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Log out
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountButton;

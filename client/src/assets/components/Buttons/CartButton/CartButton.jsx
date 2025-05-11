import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

const CartButton = () => {
    
  return (
    <div className="cart-button">
      <Link>
        <HiOutlineShoppingBag />
      </Link>
    </div>
  );
};

export default CartButton;

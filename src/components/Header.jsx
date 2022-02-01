import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header({ onClickCart }) {
  const { totalPrice } = useCart();
  return (
    <header>
      <Link to="/">
        <div className="header__left">
          <img
            className="header__logo"
            width={40}
            src="/img/image 4.png"
            alt="logo"
          />
          <div className="header__info">
            <h3>React sneackers</h3>
            <p>Магазин лучших кросовок</p>
          </div>
        </div>
      </Link>
      <ul className="header__right">
        <li onClick={onClickCart} className="cart">
          <img width={18} src="/img/cart.svg" alt="cart" />
          <span>{totalPrice} руб.</span>
        </li>
        <Link to="favourites">
          {" "}
          <li>
            <img width={18} src="/img/like.svg" alt="like" />
          </li>
        </Link>
        <Link to="orders">
          <li>
            <img width={18} src="/img/Profile.svg" alt="" />
          </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;

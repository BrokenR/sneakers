import React, { useState } from "react";
import Info from "../Info";
import styles from "./Drawer.module.scss";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

function Drawer({ onClose, items, onRemove, opened }) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { cartItems, setCartItems, totalPrice } = useCart();
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://61ad0fd6d228a9001703ace8.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderCompleted(true);
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://61ad0fd6d228a9001703ace8.mockapi.io/cart" + item.id
        );
        await delay(1000);
      }
      setCartItems([]);
    } catch (e) {
      alert(e.value);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(opened);

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className="drawer">
        <h2>
          Корзина{" "}
          <img
            onClick={onClose}
            className="btn_remove"
            src="/img/btn-remove.svg"
            alt=""
          />
        </h2>
        {items.length > 0 ? (
          <React.Fragment>
            <div className="items">
              {items &&
                items.map((obj, index) => (
                  <div key={`${obj.name}__${index}}`} className="cart__item">
                    <div
                      style={{ backgroundImage: `url(${obj.imgURL})` }}
                      className="cart__item--photo"
                    ></div>
                    <div className="cart__item--info">
                      <p>{obj.name}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="btn_remove"
                      src="/img/btn-remove.svg"
                      alt=""
                    />
                  </div>
                ))}
            </div>
            <div className="drawer__bottom">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </React.Fragment>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ будет #${orderId} передан курьерской службе.`
                : "Добавь шото"
            }
            image={
              isOrderCompleted ? "/img/ordered.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;

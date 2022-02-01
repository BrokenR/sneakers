import React, { useState } from "react";
import Card from "../components/card/Card";
import { AppContext } from "../App";
import axios from "axios";

function Favourites({}) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAddToFavourite, onAddToCart } = React.useContext(AppContext);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://61ad0fd6d228a9001703ace8.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj], []));
        setIsLoading(false);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);
  return (
    <div className="content">
      <div className="content__top">
        <h1>Мои заказы</h1>
      </div>
      <div className="content__wrapper">
        {(isLoading ? [...Array(12)] : orders).map((obj, index) => (
          <Card
            key={`${obj.name}__${index}`}
            name={obj.name}
            price={obj.price}
            id={obj.id}
            imgURL={obj.imgURL}
            favourited={true}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Favourites;

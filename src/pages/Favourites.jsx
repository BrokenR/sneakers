import React from "react";
import Card from "../components/card/Card";
import { AppContext } from "../App";

function Favourites({ onAddToFavourite }) {
  const state = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="content__top">
        <h1>Мои закладки</h1>
      </div>
      <div className="content__wrapper">
        {state.favourites &&
          state.favourites.map((obj, index) => (
            <Card
              key={`${obj.name}__${index}`}
              name={obj.name}
              price={obj.price}
              id={obj.id}
              imgURL={obj.imgURL}
              favourited={true}
              onFavourite={onAddToFavourite}
            />
          ))}
      </div>
    </div>
  );
}

export default Favourites;

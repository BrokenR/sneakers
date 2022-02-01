import React from "react";

import Card from "../components/card/Card";
import { AppContext } from "../App";

function Home({
  items,
  cartItems,
  onAddToFavourite,
  onAddToCart,
  onChangeSearchInput,
  setSearchValue,
  searchValue,
  loading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (loading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavourite={(obj) => onAddToFavourite(obj)}
        loading={loading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="content__top">
        <h1>{searchValue ? `Поиск:${searchValue}` : "Все кросовки"}</h1>
        <div className="search__block">
          <img src="/img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="btn_remove"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск"
          />
        </div>
      </div>
      <div className="content__wrapper">{renderItems()}</div>
    </div>
  );
}

export default Home;

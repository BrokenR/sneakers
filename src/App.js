import React from "react";
import "./index.scss";
import Card from "./components/card/Card";
import Header from "./components/Header";
import Drawer from "./components/drawer/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

// https://61ad0fd6d228a9001703ace8.mockapi.io/items

export const AppContext = React.createContext({});
function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get(
        "https://61ad0fd6d228a9001703ace8.mockapi.io/items"
      );

      const cartResponse = await axios.get(
        "https://61ad0fd6d228a9001703ace8.mockapi.io/cart"
      );

      const favouriteResponse = await axios.get(
        "https://61ad0fd6d228a9001703ace8.mockapi.io/favourites"
      );
      setCartItems(cartResponse.data);
      setFavourites(favouriteResponse.data);
      setItems(itemsResponse.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    );
    try {
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://61ad0fd6d228a9001703ace8.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://61ad0fd6d228a9001703ace8.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.log("Не удалось добавить в корзину");
    }
  };
  const onRemoveItem = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      await axios.delete(
        `https://61ad0fd6d228a9001703ace8.mockapi.io/cart/${id}`
      );
    } catch (e) {
      alert(e);
    }
  };
  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://61ad0fd6d228a9001703ace8.mockapi.io/favourites/${obj.id}`
        );
        setFavourites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://61ad0fd6d228a9001703ace8.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("не удалось добавить в закладки");
    }
  };
  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favourites,
        isItemAdded,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavourite,
      }}
    >
      <div className="container">
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          opened={cartOpened}
          onClose={() => setCartOpened(false)}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavourite={onAddToFavourite}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                loading={isLoading}
              />
            }
          />
          <Route
            path="/favourites"
            element={<Favourites onAddToFavourite={onAddToFavourite} />}
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://6899d95dfed141b96ba0f5e9.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6899d95dfed141b96ba0f5e9.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios
      .post("https://6899d95dfed141b96ba0f5e9.mockapi.io/cart", obj)
      .then((res) => setCartItems((prev) => [...prev, res.data]));
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6899d95dfed141b96ba0f5e9.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    console.log(id);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              items={items}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />
        <Route path="/favorites" element={<Favorites />} exact />
      </Routes>
    </div>
  );
}

export default App;

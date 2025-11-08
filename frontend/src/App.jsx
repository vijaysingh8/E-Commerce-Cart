import React, { useState } from "react";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import axios from "axios"; 

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [page, setPage] = useState("products");
  const [checkoutCart, setCheckoutCart] = useState([]);

  // ✅ Main addToCart logic used by Products
  const addToCart = async (productId) => {
    await axios.post(`${BASE_URL}/api/cart/add`, { productId, qty: 1 });
    console.log("Added to cart");
  };

  return (
    <div>
      <nav className="flex gap-5 p-3 border-b">
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
      </nav>

      {page === "products" && <Products addToCart={addToCart} />}

      {page === "cart" && (
        <Cart goToCheckout={(cart) => {
          setCheckoutCart(cart);
          setPage("checkout");
        }} />
      )}

      {page === "checkout" && <Checkout cart={checkoutCart} />}
    </div>
  );
}

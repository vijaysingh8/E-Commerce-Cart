import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cart({ goToCheckout }) {
  const [cartData, setCartData] = useState({ cart: [], total: 0 });

  // ✅ Load Cart
  const loadCart = () => {
    axios
      .get(`${BASE_URL}/api/cart/get`)
      .then((res) => setCartData(res.data))
      .catch((err) =>
        console.log("GET CART ERROR:", err.response?.data || err.message)
      );
  };

  useEffect(() => loadCart(), []);

  // ✅ Remove item using productId (NOT cart item id)
  const removeItem = (productId) => {
    axios
      .delete(`${BASE_URL}/api/cart/delete/${productId}`)
      .then(loadCart)
      .catch((err) =>
        console.log("DELETE ERROR:", err.response?.data || err.message)
      );
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Your Cart</h1>

      {cartData.cart.length === 0 && (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      {cartData.cart.map((item) => (
        <div
          key={item._id}
          className="border p-3 rounded mb-2 flex justify-between"
        >
          <div>
            {item.productId?.name} (x{item.qty})
          </div>

          <button
            onClick={() => removeItem(item.productId._id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <h2 className="font-bold mt-3">Total: ₹{cartData.total}</h2>

      {cartData.cart.length > 0 && (
        <button
          onClick={() => goToCheckout(cartData.cart)}
          className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
        >
          Checkout
        </button>
      )}
    </div>
  );
}

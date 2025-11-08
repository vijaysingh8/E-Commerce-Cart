import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState({ cart: [], total: 0 });

  // ✅ Load Cart
  const loadCart = () => {
    axios.get(`${BASE_URL}/api/cart/get`)
      .then(res => setCartData(res.data))
      .catch(err => console.log("GET CART ERROR:", err.response?.data || err.message));
  };

  // ✅ Add to cart (with error handling)
  const addToCart = async (productId) => {
    try {
      await axios.post(`${BASE_URL}/api/cart/add`, { productId, qty: 1 });
      loadCart();
    } catch (err) {
      console.log("ADD ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  // ✅ Remove quantity or delete item
  const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${BASE_URL}/api/cart/delete/${productId}`);

    loadCart();
  } catch (err) {
    console.log("REMOVE ERROR:", err.response?.data || err.message);
  }
};

  // ✅ Load Products
  useEffect(() => {
    axios.get(`${BASE_URL}/api/products`)
      .then(res => setProducts(res.data.products))
      .catch(err => console.log("PRODUCT API ERROR:", err.response?.data || err.message));
  }, []);

  // ✅ Load Cart Initially
  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Convert cart array → { productId: qty }
  const cartMap = {};
  cartData.cart.forEach(item => {
    if (item.productId) {
      cartMap[item.productId._id] = item.qty;
    }
  });

  return (
    <div className="p-5 grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="border p-4 rounded shadow flex flex-col">
          
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-40 object-cover rounded"
          />

          <h2 className="text-lg font-bold mt-2">{p.name}</h2>
          <p className="text-gray-600">₹{p.price}</p>

          <div className="mt-3 text-indigo-500">

            {!cartMap[p._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 w-[80px] h-[34px] rounded text-indigo-600 font-medium"
                onClick={() => addToCart(p._id)}
              >
                Add 
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-20 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={() => removeFromCart(p._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>

                <span className="w-5 text-center font-semibold">
                  {cartMap[p._id]}
                </span>

                <button
                  onClick={() => addToCart(p._id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

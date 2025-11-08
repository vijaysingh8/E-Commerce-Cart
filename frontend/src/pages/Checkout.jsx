import React, { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Checkout({ cart }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Checkout Handler
 const checkout = async () => {
  if (!name.trim() || !email.trim()) {
    alert("Please enter name and email.");
    return;
  }

  // ✅ Skip invalid items
  const cartItems = cart
    .filter(c => c.productId)  
    .map(c => ({
      productId: c.productId._id,
      qty: c.qty,
      price: c.productId.price,
      name: c.productId.name
    }));

  if (cartItems.length === 0) {
    alert("Your cart contains invalid items. Please refresh cart.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(`${BASE_URL}/api/checkout`, {
      name,
      email,
      cartItems
    });

    setReceipt(res.data.receipt);

  } catch (err) {
    console.log("CHECKOUT ERROR:", err.response?.data || err.message);
    alert("Checkout failed.");
  } finally {
    setLoading(false);
  }
};


  // ✅ Receipt View After Success
  if (receipt) {
    return (
      <div className="p-5 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          ✅ Payment Successful!
        </h1>

        <div className="border rounded p-4 shadow bg-white inline-block text-left">
          <p><strong>Order ID:</strong> {receipt._id}</p>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>

          <h2 className="font-bold mt-2 mb-1">Items:</h2>
          {receipt.items.map((item) => (
            <p key={item.productId}>
              {item.name} (x{item.qty}) — ₹{item.price * item.qty}
            </p>
          ))}

          <h2 className="font-bold mt-3 text-xl">
            Total Paid: ₹{receipt.total}
          </h2>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ✅ Checkout Input Form
  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>

      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={checkout}
        disabled={loading}
        className={`${
          loading ? "bg-gray-400" : "bg-green-600"
        } text-white px-4 py-2 rounded w-full`}
      >
        {loading ? "Processing..." : "Pay (Mock)"}
      </button>
    </div>
  );
}

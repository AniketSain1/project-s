import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQty, removeFromCart, clearCart } from "./cartSlice";
import useDebounce from "../../common/hooks/useDebounce";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Filter cart items based on debounced search term
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Handler to change quantity, ensures minimum 1
  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(changeQty({ id, qty }));
  };

  if (!filteredItems.length) {
    return (
      <div>
        <input
          type="text"
          aria-label="Search cart items"
          placeholder="Search cart items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input mb-4 px-3 py-2 border rounded w-full max-w-md mx-auto block"
        />
        <p className="text-center my-16">
          Your cart is empty or no item matches your search.
        </p>
      </div>
    );
  }

  // Calculate total price for filtered items
  const total = filteredItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      <input
        type="text"
        aria-label="Search cart items"
        placeholder="Search cart items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input mb-4 px-3 py-2 border rounded w-full max-w-md mx-auto"
      />
      {filteredItems.map(({ id, image, title, price, qty }) => (
        <div
          key={id}
          className="flex items-center justify-between py-2 border-b gap-2"
        >
          <img
            src={image || "https://via.placeholder.com/50"}
            alt={title}
            className="w-14 h-14 object-cover rounded mr-2 border"
          />
          <div className="flex-1">
            <p className="font-bold">{title}</p>
            <p className="text-gray-500 text-xs">${price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleQtyChange(id, qty - 1)}
              className="px-2 py-0 rounded bg-gray-200 hover:bg-gray-300"
              aria-label={`Decrease quantity of ${title}`}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => handleQtyChange(id, Number(e.target.value))}
              className="w-14 text-center border rounded"
              style={{
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
              aria-label={`Quantity of ${title}`}
            />
            <button
              onClick={() => handleQtyChange(id, qty + 1)}
              className="px-2 py-0 rounded bg-gray-200 hover:bg-gray-300"
              aria-label={`Increase quantity of ${title}`}
            >
              +
            </button>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(id))}
            className="text-xs bg-red-400 text-white px-2 py-1 rounded ml-2 hover:bg-red-500"
            aria-label={`Remove ${title} from cart`}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between font-bold mt-6 text-lg">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        onClick={() => dispatch(clearCart())}
        className="btn btn-sm w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}

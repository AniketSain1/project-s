import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  // Get total cart quantity from Redux store
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.qty, 0)
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 p-4 text-white flex justify-between items-center shadow z-50">
      <Link to="/" className="font-bold text-xl">
        MyShop
      </Link>
      <nav className="space-x-4">
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/add-product" className="hover:underline">
          Add Product
        </Link>
        <Link to="/cart" className="relative hover:underline">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 ml-1 rounded-full bg-red-500 px-2 py-1 text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

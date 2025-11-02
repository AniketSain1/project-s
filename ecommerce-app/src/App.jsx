import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProductPage from "./pages/AddProductPage";
import Cart from "./features/cart/Cart";
import { useSelector } from "react-redux";
import EditProductPage from "./pages/EditProductPage";

export default function App() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.qty, 0)
  );

  return (
    <BrowserRouter>
      <Navbar cartCount={cartCount} />
      <main className="pt-16 min-h-[calc(100vh-4rem-3rem)] max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

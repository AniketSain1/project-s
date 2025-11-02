import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductForm from "../features/products/ProductForm";
import { addProduct } from "../features/products/productSlice";

export default function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission by dispatching addProduct thunk
  const handleSave = async (product) => {
    try {
      await dispatch(addProduct(product)).unwrap();
      // Redirect to products list after successful add
      navigate("/products");
    } catch (error) {
      alert("Failed to add product: " + error);
    }
  };

  return (
    <div className="page-container p-4">
      <ProductForm onSave={handleSave} onCancel={() => navigate("/products")} />
    </div>
  );
}

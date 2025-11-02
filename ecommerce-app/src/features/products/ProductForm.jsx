import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "./productSlice";
import { useNavigate, Link } from "react-router-dom";

/**
 * Form component for adding or editing a product.
 * Uses controlled inputs with validation.
 */
export default function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // Populate form when 'product' prop changes (for edit)
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        description: product.description || "",
        image: product.image || "",
      });
    }
  }, [product]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic form validation before save
  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.price !== "" &&
      !isNaN(parseFloat(formData.price)) &&
      parseFloat(formData.price) >= 0
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Please enter a valid title and non-negative price.");
      return;
    }

    const productToSave = {
      ...product,
      ...formData,
      price: parseFloat(formData.price),
    };

    onSave(productToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-6">{product ? "Edit Product" : "Add Product"}</h2>

      <label htmlFor="title" className="block mb-2 font-semibold">
        Title<span className="text-red-500">*</span>
      </label>
      <input
        id="title"
        name="title"
        type="text"
        value={formData.title}
        onChange={handleChange}
        required
        className="input input-bordered w-full mb-4"
        placeholder="Product title"
      />

      <label htmlFor="price" className="block mb-2 font-semibold">
        Price ($)<span className="text-red-500">*</span>
      </label>
      <input
        id="price"
        name="price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
        min="0"
        className="input input-bordered w-full mb-4"
        placeholder="0.00"
      />

      <label htmlFor="category" className="block mb-2 font-semibold">
        Category
      </label>
      <input
        id="category"
        name="category"
        type="text"
        value={formData.category}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Product category"
      />

      <label htmlFor="description" className="block mb-2 font-semibold">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Product description"
      />

      <label htmlFor="image" className="block mb-2 font-semibold">
        Image URL
      </label>
      <input
        id="image"
        name="image"
        type="url"
        value={formData.image}
        onChange={handleChange}
        className="input input-bordered w-full mb-6"
        placeholder="https://example.com/image.jpg"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!isFormValid()}
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </form>
  );
}

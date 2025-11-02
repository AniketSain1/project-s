import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../features/products/ProductForm";
import { updateProduct, fetchProducts } from "../features/products/productSlice";

export default function EditProductPage() {
  const { id } = useParams(); // Get product id from route params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const [product, setProduct] = useState(null);

  // Fetch products if not available
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Find product to edit by id when products load or id changes
  useEffect(() => {
    const prod = products.find((p) => p.id.toString() === id);
    setProduct(prod || null);
  }, [products, id]);

  // Handle saving updates
  const handleSave = async (updatedProduct) => {
    try {
      await dispatch(updateProduct(updatedProduct)).unwrap();
      navigate("/products");
    } catch (error) {
      alert("Failed to update product: " + error);
    }
  };

  if (!product) {
    return <p className="text-center mt-20">Loading product details...</p>;
  }

  return (
    <div className="page-container p-4">
      <ProductForm
        product={product}
        onSave={handleSave}
        onCancel={() => navigate("/products")}
      />
    </div>
  );
}

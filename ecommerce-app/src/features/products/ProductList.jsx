import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "./productSlice";
import { addToCart } from "../cart/cartSlice";
import { Link } from "react-router-dom";
import useDebounce from "../../common/hooks/useDebounce";

export default function ProductList({ onEdit }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((s) => s.products);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 900); // 300ms debounce
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Filter with debounced search term
  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-blue-600 font-semibold">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="input px-3 py-2 border rounded w-64"
        />
        <Link
          to="/add-product"
          className="btn bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-200 hover:scale-105"
        >
          Add New Product
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white p-4 rounded shadow flex flex-col transition-transform duration-200 hover:scale-105"
          >
            <img
              src={prod.image || "https://via.placeholder.com/150"}
              alt={prod.title}
              className="w-full h-44 object-cover rounded mb-3 transition-transform duration-200 hover:scale-105"
            />
            <div className="font-bold text-lg mb-1">{prod.title}</div>
            <div className="text-gray-500 mb-1">{prod.category}</div>
            <div className="text-blue-600 font-semibold mb-2">${prod.price}</div>
            <p className="text-xs text-gray-400 mb-4 flex-grow">{prod.description}</p>
            <div className="flex gap-2 mt-auto">
              <Link
                to={`/edit-product/${prod.id}`}
                className="btn btn-sm bg-yellow-500 text-white rounded px-4 py-2 inline-block transition-transform duration-200 hover:scale-105">
                Edit
              </Link>

              <button
                onClick={() => dispatch(deleteProduct(prod.id))}
                className="btn btn-sm bg-red-500 text-white rounded px-4 py-2 inline-block transition-transform duration-200 hover:scale-105">
                Delete
              </button>
              <button
                onClick={() => dispatch(addToCart(prod))}
                className="btn btn-sm bg-blue-600 text-white flex-1 rounded transition-transform duration-200 hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center my-8 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}>
            &lt;
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

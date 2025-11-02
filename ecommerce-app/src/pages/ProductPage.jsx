import React, { useState } from 'react';
import ProductList from '../features/products/ProductList';
import ProductForm from '../features/products/ProductForm';

export default function ProductPage() {
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {showForm ?
        <ProductForm initial={edit} /> :
        <ProductList onEdit={p => { setEdit(p); setShowForm(true); }} />
      }
    </div>
  );
}

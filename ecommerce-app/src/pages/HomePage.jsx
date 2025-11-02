import React from "react";
import {Link} from 'react-router-dom';
export default function HomePage() {
  return (
    <div className="text-center mt-20 mx-auto max-w-xl bg-white p-10 rounded shadow transition-transform duration-200 hover:scale-105">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Shop!</h1>
      <p className="text-lg text-gray-600 mb-4">Super simple e-commerce app with product management and cart.</p>
      <Link to="/Products"><img className="mx-auto rounded transition-transform duration-200 hover:scale-105" style={{maxHeight: '300px'}} src="https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80" alt="E-commerce" /></Link> 
    </div>
  )
}

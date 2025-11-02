import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
                {/* Display current year dynamically */}
        <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>
    </footer>
  );
}

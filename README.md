x# E-Commerce React App with Redux Toolkit

## Project Overview
This is a responsive e-commerce web application built using React, Redux Toolkit, React Router, and Tailwind CSS. It allows users to browse products, search and paginate through them, add new products, edit existing ones, and manage a shopping cart with real-time quantity and removal options.

## Features
- Product listing with search and pagination
- Add new products and edit existing products via reusable forms
- Delete products from the catalog
- Shopping cart with add, update quantity, remove, and clear functionality
- State management with Redux Toolkit slices and async thunks
- Routing handled by React Router with dynamic params
- Styling with Tailwind CSS for responsive and accessible UI

## Tech Stack
- React 
- Redux Toolkit for state management
- React Router for routing
- Tailwind CSS for styling
- JSON Server as backend

## Installation
1. Clone the repository:
`git clone <repo-url>`
2. Install dependencies:
`npm install`
3. Start the JSON Server backend:
`npm run backend`
4. Start the React development server:
`npm start`
5. Open browser at:
`http://localhost:3000`

## Project Structure
- `/src/components` - reusable presentational components
- `/src/pages` - page/container components for routes
- `/src/features/products` - product slice, thunks, ProductList, ProductForm
- `/src/features/cart` - cart slice and Cart component
- `/src/App.jsx` - main router and layout
- `/src/store.js` - Redux store configuration

## Important Files
- `productSlice.js` - Redux slice managing product state, including async CRUD thunks
- `cartSlice.js` - Redux slice managing cart state with actions for add, remove, qty change
- `ProductForm.jsx` - controlled form used for both adding and editing products
- `HomePage.jsx` - loads products on mount, shows product list
- `EditProductPage.jsx` - loads product by id and wraps ProductForm for editing

## How to Use
- Browse products on the Home page with search and pagination
- Add new products via "Add Product" page
- Edit existing products by clicking the Edit button on product cards
- Add products to cart and update quantities in Cart page
- Remove items or clear the cart as needed


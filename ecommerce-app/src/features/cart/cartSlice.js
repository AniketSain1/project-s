import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Cart items: {id, title, price, qty, ...}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart or increase qty if exists
    addToCart: (state, action) => {
      const item = action.payload;
      const existingIndex = state.items.findIndex((i) => i.id === item.id);

      if (existingIndex !== -1) {
        state.items[existingIndex].qty += 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
    },

    // Change quantity of a product by id, ensuring qty >= 1
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      const index = state.items.findIndex((i) => i.id === id);

      if (index !== -1 && qty >= 1) {
        state.items[index].qty = qty;
      }
    },

    // Remove product from cart by id
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, changeQty, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

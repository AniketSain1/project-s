import { createSlice } from "@reduxjs/toolkit";
const initial = JSON.parse(localStorage.getItem("cart") || "[]");
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: initial },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find((i) => i.id === action.payload.id);
      found ? found.qty++ : state.items.push({ ...action.payload, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    changeQty: (state, { payload }) => {
      const item = state.items.find((i) => i.id === payload.id);
      if (item) item.qty = payload.qty;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});
export const { addToCart, removeFromCart, changeQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

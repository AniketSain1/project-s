import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../common/constants/config";

// Base API URL from config
const API_URL = `${CONFIG.API_BASE}/products`;

// AT for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AT for adding a product
export const addProduct = createAsyncThunk(
  "products/add",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AT for updating a product
export const updateProduct = createAsyncThunk(
  "products/update",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AT for deleting a product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state for the slice
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Product slice definition
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;

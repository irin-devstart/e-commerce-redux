import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://fakestoreapi.com/products";

interface Props {
  isLoading: boolean;
  product: { id: number; title: string }[];
  cart: { id: number; title: string; qty: number }[];
  productDetail: { id: number; title: string };
}
const initialState: Props = {
  isLoading: false,
  product: [],
  cart: [],
  productDetail: { id: 0, title: "" },
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

export const fetchProductDetail = createAsyncThunk(
  "product/fetchProductDetail",
  async (id: number) => {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addCart: (state, action): any => {
      const item = state.product.find((value) => value.id === action.payload);
      return {
        ...state,
        cart: state.cart.some((value) => value.id === action.payload)
          ? state.cart.map((value) =>
              value.id === action.payload
                ? { ...value, qty: value.qty + 1 }
                : value
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    },
    removeCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((value) => value.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      // action is inferred correctly here if using TS
      return {
        ...state,
        isLoading: false,
        product: action.payload,
      };
    });

    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      // action is inferred correctly here if using TS
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
      };
    });
  },
});

export const { addCart, removeCart } = productSlice.actions;

export default productSlice.reducer;

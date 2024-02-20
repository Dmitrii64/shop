import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalPrice: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.products.push({...action.payload, count: 1});
      }

      state.totalPrice = state.products.reduce((sum, obj) => {
        return +obj.price.replaceAll(' ', '') * obj.count + sum;
      }, 0)
    },
    decrementProduct(state, action) {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      findItem.count--;
      state.totalPrice -= findItem.price.replaceAll(' ', '')
    },
    removeProduct(state, action) {
      const findItem = state.products.find((obj) => obj.id === action.payload.id);
      state.products = state.products.filter(obj => obj !== findItem);
      state.totalPrice -= findItem.price.replaceAll(' ', '') * findItem.count;
    },
    clearProducts(state) {
      state.products = [];
      state.totalPrice = 0;
    }
  }
})

export const {addProduct, decrementProduct, removeProduct, clearProducts} = cartSlice.actions;

export default cartSlice.reducer;
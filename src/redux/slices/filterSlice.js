import {createSlice} from "@reduxjs/toolkit";
import {sorts} from "../../data/sorts";

const initialState = {
  activeCategory: 'Все',
  selectedSort: {
    name: "популярности",
    property: "rating",
    order: false
  },
  currentPage: 1
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSort(state, action) {
      state.selectedSort = action.payload;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.activeCategory = action.payload.activeCategory;
      state.selectedSort.property = action.payload.sort;
      state.selectedSort.order = JSON.parse(action.payload.order);
      state.currentPage = Number(action.payload.currentPage);
      let currentSort = sorts.find(obj => obj.property === state.selectedSort.property);
      state.selectedSort.name = currentSort.name;
    }
  }
})

export const {setCategory, setSort, setPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types";

type BookArr = {
  books: Book[] | [];
};

const initialState: BookArr = {
  books: [],
};

const bookArraySlice = createSlice({
  name: "bookArray",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    removeBooks: (state) => {
      state.books = [];
    },
  },
});

export const { setBooks, removeBooks } = bookArraySlice.actions;

export default bookArraySlice.reducer;

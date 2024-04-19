import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../../../types";

type BookDetails = {
  book: Book | null;
};

const initialState: BookDetails = {
  book: null,
};

const bookDetailsSlice = createSlice({
  name: "bookDetails",
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    removeBook: (state) => {
      state.book = null;
    },
  },
});

export const { setBook, removeBook } = bookDetailsSlice.actions;

export default bookDetailsSlice.reducer;

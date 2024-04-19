import { combineReducers } from "redux";
import bookDetailsSlice from "./slices/bookDetailsSlice";
import bookArraySlice from "./slices/bookArraySlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  books: bookArraySlice,
  bookDetails: bookDetailsSlice,
  user: userSlice,
});

export default rootReducer;

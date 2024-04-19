import { combineReducers } from "redux";
import bookDetailsSlice from "./slices/bookDetailsSlice";
import bookArraySlice from "./slices/bookArraySlice";
import userSlice from "./slices/userSlice";
import loaderSlice from "./slices/loaderSlice";

const rootReducer = combineReducers({
  books: bookArraySlice,
  bookDetails: bookDetailsSlice,
  user: userSlice,
  loader: loaderSlice,
});

export default rootReducer;

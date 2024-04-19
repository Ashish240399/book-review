// Importing necessary hooks from react-redux
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Importing types for RootState and AppDispatch from the store
import type { RootState, AppDispatch } from "./store";

// Creating a typed version of useDispatch hook
// This will provide autocompletion and type checking for dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Creating a typed version of useSelector hook
// This will provide autocompletion and type checking for state selection
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
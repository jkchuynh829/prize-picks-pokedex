import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as useUntypedSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
} from "react-redux";
import rootReducer from "./reducers";
import type { RootState } from "./reducers";

export function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./store", () => store.replaceReducer(rootReducer));
  }
  return store;
}
const store = configureAppStore();

export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;

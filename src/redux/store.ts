import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import counterSlice from "./counter/counterSlice";
import { useDispatch } from "react-redux";
import { persistStore } from "redux-persist";
import productSlice from "./products/productSlice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";

const middleware = [thunk];

const reducers = combineReducers({
  product: productSlice,
  counter: counterSlice,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  // middleware,
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

import { authApi } from "@/redux/api/authApi";
import authReducer from "@/redux/features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { wallpaperApi } from "./api/wallpaperApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [wallpaperApi.reducerPath]: wallpaperApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(wallpaperApi.middleware),
});
export const persistor = persistStore(store);
export default store;

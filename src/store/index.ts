import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage by default

// Step 1: Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Step 2: Define persist config for slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Step 3: Only persist the auth slice
  // blacklist: ["auth"], // for the slices you dont want to persist
};

// Step 4: Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 5: Create store using persistedReducer and handle middleware for redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Step 6: Export persistor
export const persistor = persistStore(store);

// Step 7: Define types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

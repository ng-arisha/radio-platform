import { isClient } from "@/utils/utils";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { authReducer } from "./auth/auth";
import { commissionReducer } from "./commission/commission";
import { financeReducer } from "./finance/finance";
import { masterReducer } from "./master/master";
import { mediaReducer } from "./media/media";
import { promotionReducer } from "./promotions/promotion";
import { showReducer } from "./shows/shows";
import { stationReducer } from "./stations/stations";
import { statsReducer } from "./stats/stats";
import { transactionReducer } from "./transactions/transaction";
import { userReducer } from "./users/users";
import { utilReducer } from "./util/util";




const createNoopStorage = () => {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: unknown) {
        return Promise.resolve(value);
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  };

  const storageEngine = isClient
  ? createWebStorage("local")
  : createNoopStorage();

  const persistConfig={
    key:'root',
    storage:storageEngine
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer:{
        auth:persistedAuthReducer,
        users:userReducer,
        media: mediaReducer,
        util:utilReducer,
        stations:stationReducer,
        stats:statsReducer,
        finance:financeReducer,
        shows:showReducer,
        promotions: promotionReducer,
        master:masterReducer,
        commission:commissionReducer,
        transactions:transactionReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:{
          ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
      })
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

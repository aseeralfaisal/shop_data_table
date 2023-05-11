import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { Slice } from './slice'

const persistConfig = {
  key: 'root',
  storage: storage,
}
const reducer = combineReducers({
  slice: Slice.reducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
})

export const persistor = persistStore(store)
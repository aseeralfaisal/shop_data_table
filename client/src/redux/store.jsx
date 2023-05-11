import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { userRoleSlice } from './slices/UserRoleSlice'
import { formRoleSlice } from './slices/FormRoleSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
}
const reducer = combineReducers({
  userRole: userRoleSlice.reducer,
  formRole: formRoleSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
})

export const persistor = persistStore(store)
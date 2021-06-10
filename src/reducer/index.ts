import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
  } from '@reduxjs/toolkit';
  import {TypedUseSelectorHook, useSelector} from 'react-redux';
  import {persistReducer, persistStore} from 'redux-persist';
  // import storage from 'redux-persist/lib/storage';
  import AsyncStorage from '@react-native-community/async-storage';
  import { categoryReducer } from './categorySlice';
  import { taskReducer } from './taskSlice';

  
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
// 
  };
  
  const reducers = combineReducers({
    task: taskReducer,
    category: categoryReducer,
  });
  
  const persistedReducers = persistReducer(persistConfig, reducers);
  
  const store = configureStore({
    reducer: persistedReducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  });
  
  export const persistor = persistStore(store);
  
  // State Type
  export type RootState = ReturnType<typeof reducers>;
  
  // Inject Type RootState on useSelector
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  export default store;
  
import { useMemo } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

let initialState = {
  isAuthenticated: false,
  quantity: null,
  customerId: null,
  guestId: null,
  loading: false,
  error: null,
};

let store:
  | (import('redux').Store<
      {
        isAuthenticated: boolean;
        quantity: null;
        customerId: null;
        guestId: null;
      },
      import('redux').Action<any>
    > & { dispatch: unknown })
  | undefined;

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['isAuthenticated', 'quantity', 'customerId', 'guestId'], // place to select which state you want to persist
  blacklist: ['error', 'loading'],
};

const persistedReducer: any = persistReducer(persistConfig, reducer);

function initStore(preloadedState = initialState) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(
  initialState: { isAuthenticated: boolean } | undefined
) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

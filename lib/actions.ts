import ActionTypes from './types';
import { Action } from './reducers';

// SET IS AUTHENTICATED TO TRUE
export const isLoggedIn = () => ({ type: ActionTypes.LOGIN });

// SET IS AUTHENTICATED TO FALSE
export const isLoggedOut = () => ({ type: ActionTypes.LOGOUT });

// SET ERROR MESSAGE
export const setError = (error: string) => (
  dispatch: (action: Action) => any
) =>
  dispatch({
    type: ActionTypes.ERROR,
    payload: {
      error,
    },
  });

// SET LOADING
export const setLoading = (loading: boolean) => (
  dispatch: (action: Action) => any
) =>
  dispatch({
    type: ActionTypes.LOADING,
    payload: {
      loading,
    },
  });

// SET GUEST CART ID
export const setGuestcustomerId = (guestId: string) => (
  dispatch: (action: Action) => any
) =>
  dispatch({
    type: ActionTypes.CART,
    payload: {
      guestId,
      customerId: null,
    },
  });

// SET CUSTOMER CART ID
export const setCustomercustomerId = (customerId: string) => (
  dispatch: (action: Action) => any
) =>
  dispatch({
    type: ActionTypes.CART,
    payload: {
      customerId,
      guestId: null,
    },
  });

// SET CUSTOMER CART ID
export const setCartQuantity = (quantity: Number) => (
  dispatch: (action: Action) => any
) =>
  dispatch({
    type: ActionTypes.CART,
    payload: {
      quantity,
    },
  });

import ActionTypes from './types';

let initialState = {
  isAuthenticated: false,
  quantity: null,
  customerId: null,
  guestId: null,
};

export interface Action {
  type: string;
  payload: {
    customerId?: string | any;
    guestId?: string | any;
    quantity?: string | any;
    loading?: boolean | any;
    error?: string | any;
  };
}

export default function reducer(
  state = initialState,
  { type, payload }: Action
) {
  switch (type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: payload.loading,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        error: payload.error,
      };

    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        customerId: null,
        quantity: null,
      };

    case ActionTypes.CART:
      return {
        ...state,
        ...payload,
        // customerId: payload.customerId,
        // quantity: payload.quantity,
      };

    default:
      return state;
  }
}

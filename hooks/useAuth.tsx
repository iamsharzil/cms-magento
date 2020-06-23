import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import Router from 'next/router';

import { isLoggedIn, isLoggedOut } from 'lib/actions';
import useCart from './useCart';

const useAuth = () => {
  const dispatch = useDispatch();

  const { createEmptyCartCustomer } = useCart();

  const login = (token: string) => {
    cookie.set('token', token, {
      expires: 60,
      secure: process.env.NODE_ENV === 'production',
    });

    /**
     * SET isAuthenticated TO TRUE IN REDUX STATE
     */
    dispatch(isLoggedIn());

    createEmptyCartCustomer(token);

    Router.push('/');
  };

  const logout = () => {
    cookie.remove('token');

    /**
     * SET isAuthenticated TO FALSE IN REDUX STATE,
     * CUSTOMER ID TO NULL
     * QUANTITY TO NULL
     */
    dispatch(isLoggedOut());

    Router.push('/account/login');
  };

  return { login, logout };
};

export default useAuth;

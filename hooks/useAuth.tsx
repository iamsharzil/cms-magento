import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
import Router from 'next/router';

interface Props {
  token?: string;
}

const useAuth = () => {
  const dispatch = useDispatch();

  const login = (token: Props) => {
    cookie.set('token', token, {
      expires: 60,
      secure: process.env.NODE_ENV === 'production',
    });

    dispatch({
      type: 'LOGIN',
    });

    Router.push('/');
  };

  const logout = () => {
    cookie.remove('token');

    dispatch({
      type: 'LOGOUT',
    });

    Router.push('/account/login');
  };

  return { login, logout };
};

export default useAuth;

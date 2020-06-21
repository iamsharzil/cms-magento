import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';

const Header = () => {
  const isAuthenticated = useSelector(
    (state: { isAuthenticated: boolean }) => state.isAuthenticated
  );

  const { logout } = useAuth();

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        {/* <Link href='/'>
          <a className='navbar-brand'>Home</a>
        </Link> */}

        <button
          className='navbar-toggler collapsed'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div className='navbar-collapse collapse' id='navbarColor01' style={{}}>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link href='/'>
                <a className='nav-link'>
                  Home <span className='sr-only'>(current)</span>
                </a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/account/profile'>
                <a className='nav-link'>My Profile</a>
              </Link>
            </li>
            <li className='nav-item'>
              {!!isAuthenticated ? (
                <a className='nav-link' onClick={logout}>
                  Logout
                </a>
              ) : (
                <Link href='/account/login'>
                  <a className='nav-link'>Login</a>
                </Link>
              )}
            </li>
            <li className='nav-item'>
              <Link href='/account/signup'>
                <a className='nav-link'>Sign Up</a>
              </Link>
            </li>
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <input
              className='form-control mr-sm-2'
              type='text'
              placeholder='Search'
            />
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
              Search
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;

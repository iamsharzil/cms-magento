import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from './Header';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link
        rel='stylesheet'
        href='https://bootswatch.com/4/lux/bootstrap.min.css'
      />
    </Head>
    <Header />
    {children}
  </div>
);

export default Layout;

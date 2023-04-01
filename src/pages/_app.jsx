import React from 'react';
import '../styles/globals.css';
import '../styles/destyle.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {Toaster} from 'react-hot-toast';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * Appコンポーネント
 * @return {Component}
 */
function MyApp({Component, pageProps}) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;

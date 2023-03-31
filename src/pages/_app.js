import React from 'react';
import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * Appコンポーネント
 * @return {Component}
 */
function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}

export default MyApp;

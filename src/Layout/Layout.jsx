import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styles from './Layout.module.scss';

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Header />
      { children }
      <Footer />
    </div>
  );
};

export default Layout;

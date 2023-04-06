import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './Header.module.scss';

/**
 * Headerコンポーネント
 * @return {Component}
 */
export default function Header() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>
        <Link href='/'>
          <h1>Gourmet Search</h1>
        </Link>
      </header>
    </>
  );
}

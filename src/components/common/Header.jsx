import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

/**
 * Headerコンポーネント
 * @return {Component}
 */
export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link href='/'>
          <h1>Gourmet Search</h1>
        </Link>
      </header>
    </>
  );
}

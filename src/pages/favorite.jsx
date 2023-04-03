import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/common/Header';
import ListItem from '../components/common/ListItem';
import styles from '../styles/List.module.scss';

/**
 * Favoriteコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    const myStorage = localStorage;
    setFavoriteList(JSON.parse(myStorage.getItem('favorite-gourmet')));
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Gourmet Search | お気に入り</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className={styles.main}>
        <Container maxWidth='md'>
          <div className={styles.title_box}>
            <Link href='/'>
              <ArrowBackIosIcon fontSize='large' style={{color: '#333333'}}/>
            </Link>
            <h2>お気に入りのお店</h2>
          </div>

          <div className={styles.card_container}>
            {favoriteList.map((val, i) => {
              return (
                <ListItem key={i} val={val} />
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}

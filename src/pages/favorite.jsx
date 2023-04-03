import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// components
import ListItem from '../components/common/ListItem';
// Layout
import Layout from '../Layout/Layout';
// css
import commonStyles from '../styles/Common.module.scss';
import styles from '../styles/List.module.scss';

/**
 * Favoriteコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Favorite() {
  const [favoriteList, setFavoriteList] = useState([]);

  // localStorageからお気に入りリストを取得
  useEffect(() => {
    const myStorage = localStorage;
    setFavoriteList(JSON.parse(myStorage.getItem('favorite-gourmet')));
  }, []);


  return (
    <Layout>
      <Head>
        <title>Gourmet Search | お気に入り</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth='md'>
          <div className={commonStyles.title_box}>
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
    </Layout>
  );
}

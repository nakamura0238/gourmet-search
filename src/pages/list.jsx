import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import {parseCookies} from 'nookies';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Header from '../components/common/Header';
import PagingButton from '../components/list/PagingButton';
import ListItem from '../components/common/ListItem';
import {buildListRequest} from '../functions/buildRequest';
import styles from '../styles/List.module.scss';

/**
 * Listコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function List(props) {
  const query = props.params;
  const gourmetList = props.shop;
  const paging = props.paging;

  return (
    <div className={styles.container}>
      <Head>
        <title>Gourmet Search | 周辺のお店</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      <main className={styles.main}>
        <Container maxWidth="md">
          <div className={styles.title_box}>
            <Link href='/'>
              <ArrowBackIosIcon fontSize='large' style={{color: '#333333'}}/>
            </Link>
            <h2>周辺のお店</h2>
          </div>

          <PagingButton start={query.start} paging={paging} />

          <div className={styles.card_container}>
            {gourmetList.map((val, i) => {
              return (
                <ListItem key={i} val={val} />
              );
            })}
          </div>

          <PagingButton start={query.start} paging={paging} />

        </Container>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    // Cookie取得
    const cookie = parseCookies(context);
    const params = JSON.parse(cookie.gourmetInfo);

    const start = parseInt(context.query.start);
    const url = buildListRequest(params, start);

    // ページネーション用フラグ
    let canPrev = false;
    let canNext = false;

    // お店取得
    const gourmet = await axios.get(url);
    const shop = gourmet.data.results.shop;
    const shopCount = gourmet.data.results.results_available;

    // ページネーション判定
    if ((start - parseInt(params.count)) > 0) {
      canPrev = true;
    }
    if ((start + parseInt(params.count) - 1) < shopCount) {
      canNext = true;
    }

    return {
      props: {
        params: context.query,
        shop,
        paging: {
          canPrev,
          canNext,
          available: shopCount,
          start: parseInt(start),
          end: shopCount < (start + 9) ? shopCount : (start + 9),
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};

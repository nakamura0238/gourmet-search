import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import {parseCookies} from 'nookies';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// components
import PagingButton from '../components/list/PagingButton';
import ListItem from '../components/common/ListItem';
// Layout
import Layout from '../Layout/Layout';
// css
import commonStyles from '../styles/Common.module.scss';
import styles from '../styles/List.module.scss';
// functions
import {buildListRequest} from '../functions/buildRequest';

/**
 * Listコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function List(props) {
  const gourmetList = props.shop;
  const paging = props.paging;

  return (
    <Layout>
      <Head>
        <title>Gourmet Search | 周辺のお店</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="md">
          <div className={commonStyles.title_box}>
            <Link href='/'>
              <ArrowBackIosIcon fontSize='large' style={{color: '#333333'}}/>
            </Link>
            <h2>周辺のお店</h2>
          </div>
          <PagingButton start={paging.start} paging={paging} />
          <div className={styles.card_container}>
            {gourmetList.map((val, i) => {
              return (
                <ListItem key={i} val={val} />
              );
            })}
          </div>
          <PagingButton start={paging.start} paging={paging} />
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  try {
    // Cookie取得
    const cookie = parseCookies(context);
    const params = JSON.parse(cookie.gourmetInfo);

    const start = parseInt(context.query.start);

    // お店取得
    const url = buildListRequest(params, start);
    const gourmet = await axios.get(url);
    const shopCount = gourmet.data.results.results_available;

    // ページネーション判定
    let canPrev = false;
    let canNext = false;
    if ((start - parseInt(params.count)) > 0) {
      canPrev = true;
    }
    if ((start + parseInt(params.count) - 1) < shopCount) {
      canNext = true;
    }

    return {
      props: {
        shop: gourmet.data.results.shop,
        paging: {
          canPrev,
          canNext,
          available: shopCount,
          start: start,
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

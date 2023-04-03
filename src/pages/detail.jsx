import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import styles from '../styles/Detail.module.scss';
import axios from 'axios';
import {buildDetailRequest} from '../functions/buildRequest';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Header from '../components/common/Header';

import ShopOverview from '../components/detail/ShopOverView';
import LinkButton from '../components/detail/LinkButton';
import ShopDataTable from '../components/detail/ShopDataTable';


/**
 * Detailコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Detail(props) {
  const shopDetail = props.shop;
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Gourmet Search | お店詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main className={styles.main}>
        <Container maxWidth='md'>

          <div className={styles.title_box}>
            <button onClick={() => router.back() }>
              <ArrowBackIosIcon fontSize='large' style={{color: '#333333'}}/>
            </button>
            <h2>お店の詳細情報</h2>
          </div>

          <div>
            <ShopOverview shopDetail={shopDetail} />

            <LinkButton shopDetail={shopDetail} />

            <p className={styles.shop_data}>店舗情報</p>
            <ShopDataTable shopDetail={shopDetail} />

          </div>
        </Container>
      </main>
    </div>
  );
}


export const getServerSideProps = async (context) => {
  try {
    const url = buildDetailRequest(context.query.id);

    const gourmet = await axios.get(url);
    const shop = gourmet.data.results.shop;

    return {
      props: {
        shop: shop[0],
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

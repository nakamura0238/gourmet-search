import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import {Container} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// components
import Header from '../components/common/Header';
import ShopOverview from '../components/detail/ShopOverView';
import LinkButton from '../components/detail/LinkButton';
import ShopDataTable from '../components/detail/ShopDataTable';
// css
import commonStyles from '../styles/Common.module.scss';
import styles from '../styles/Detail.module.scss';
// functions
import {buildDetailRequest} from '../functions/buildRequest';

/**
 * Detailコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Detail(props) {
  const shopDetail = props.shop;
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Gourmet Search | お店詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Container maxWidth='md'>
          <div className={commonStyles.title_box}>
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
    // お店詳細取得
    const url = buildDetailRequest(context.query.id);
    const gourmet = await axios.get(url);

    return {
      props: {
        shop: gourmet.data.results.shop[0],
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

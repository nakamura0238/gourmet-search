import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Detail.module.scss';
import axios from 'axios';
import {buildDetailRequest} from '../functions/buildRequest';
import {Container, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TrainIcon from '@mui/icons-material/Train';
import MapIcon from '@mui/icons-material/Map';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import Header from '../components/common/Header';

import FavoriteButton from '../components/detail/FavoriteButton';

/**
 * Detailコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Detail(props) {
  const shopDetail = props.shop;
  const router = useRouter();

  const shopData = [
    {label: '店名', content: shopDetail.name},
    {label: 'アクセス', content: shopDetail.access},
    {label: '住所', content: shopDetail.address},
    {label: '営業時間', content: shopDetail.open},
    {label: '定休日', content: shopDetail.close},
    {label: 'コース', content: shopDetail.course},
    {label: '飲み放題', content: shopDetail.free_drink},
    {label: '食べ放題', content: shopDetail.free_food},
    {label: '個室', content: shopDetail.private_room},
    {label: '禁煙席', content: shopDetail.non_smoking},
    {label: 'カード決済', content: shopDetail.card},
  ];

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
            <div className={styles.shop_overview_container}>
              <div className={styles.shop_top}>
                <Image
                  src={shopDetail.photo.pc.l}
                  width={200}
                  height={200}
                  alt={shopDetail.name}
                  priority={true}
                  style={{border: '1px solid #CCCCCC'}}
                />
                <div className={styles.shop_top_inner}>
                  <p>{shopDetail.genre.name}</p>
                  <h2>{shopDetail.name}</h2>
                  <FavoriteButton shopDetail={shopDetail} />
                </div>
              </div>
              <div className={styles.access}>
                <TrainIcon />
                <p>{shopDetail.access}</p>
              </div>
              <div className={styles.address}>
                <MapIcon />
                <p>{shopDetail.address}</p>
              </div>
              <div className={styles.budget}>
                <CurrencyYenIcon />
                <p>{shopDetail.budget.average}</p>
              </div>
            </div>
            <div className={styles.link_btn_box}>
              <Button
                variant='outlined'
                href={shopDetail.urls.pc}
                target='_blank'
                startIcon={<EventAvailableIcon></EventAvailableIcon>}>
                  予約サイトへ
              </Button>
              <Button
                variant='outlined'
                target='_blank'
                href={`https://www.google.com/maps/search/?api=1&query=${shopDetail.lat},${shopDetail.lng}`}
                startIcon={<MapIcon></MapIcon>}>
                  マップを開く
              </Button>
            </div>

            <p className={styles.shop_data}>店舗情報</p>
            <table className={styles.data_table}>
              <tbody>
                {shopData.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td className={styles.label}>{val.label}</td>
                      <td className={styles.content}>{val.content}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

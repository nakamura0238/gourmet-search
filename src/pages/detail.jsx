import React from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Detail.module.scss';
import axios from 'axios';
import {buildDetailRequest} from '../functions/buildRequest';
import {Container, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import TrainIcon from '@mui/icons-material/Train';
import MapIcon from '@mui/icons-material/Map';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {toast} from 'react-hot-toast';
import {getIndex} from '../functions/getIndex';
import Header from '../components/common/header';

/**
 * Detailコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Detail(props) {
  console.log(props.shop);
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

  // お気に入り登録
  const setFavorite = () => {
    const myStorage = localStorage;
    const gourmetObject = {
      id: shopDetail.id,
      name: shopDetail.name,
      genre: shopDetail.genre.name,
      budget: shopDetail.budget.name,
      access: shopDetail.access,
      address: shopDetail.address,
      photo: shopDetail.photo.pc.l,
    };
    if (myStorage.getItem('favorite-gourmet')) {
      // お気に入りリスト取得 (localStorage)
      const gourmetList = JSON.parse(myStorage.getItem('favorite-gourmet'));

      // 店が登録されているか確認 (添字検索)
      const found = getIndex(shopDetail.id, gourmetList, 'id');

      if (found == -1) { // 未登録の場合
        gourmetList.push(gourmetObject);
        toast.success('お気に入り登録しました');
      } else { // 登録済みの場合
        gourmetList.splice(found, 1);
        toast.error('お気に入り解除しました');
      }
      // localStorageに保存
      myStorage.setItem('favorite-gourmet', JSON.stringify(gourmetList));
    } else {
      // localStorageに保存
      myStorage.setItem('favorite-gourmet', JSON.stringify([gourmetObject]));
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main className={styles.main}>
        <Container maxWidth='md'>

          <div className={styles.title_box}>
            {/* <Link href='/'>
              <ArrowBackIosIcon fontSize='large' style={{color: '#333333'}}/>
            </Link> */}
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
                  <Button
                    variant='outlined'
                    startIcon={<FavoriteIcon></FavoriteIcon>}
                    onClick={setFavorite} >お気に入り</Button>
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
    const url = buildDetailRequest(context.query);

    const gourmet = await axios.get(url);
    const shop = gourmet.data.results.shop;

    return {
      props: {
        params: context.query,
        shop: shop[0],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
};
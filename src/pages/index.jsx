import React, {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import axios from 'axios';
import {setCookie} from 'nookies';
import {Container, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
// components
import SelectRange from '../components/index/SelectRange';
import SelectGenre from '../components/index/SelectGenre';
// Layout
import Layout from '../Layout/Layout';
// css
import styles from '../styles/Home.module.scss';
// hooks
import usePresentPosition from '../hooks/usePresentPosition';

/**
 * Homeコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Home(props) {
  const router = useRouter();
  const [range, setRange] = useState(3); // 検索範囲
  const [genre, setGenre] = useState(''); // お店ジャンル

  // ジャンル情報
  const genreList = props.genre;

  // 位置情報機能の確認と現在位置の取得
  const {coords, presentPosition} = usePresentPosition();

  /**
   * 一覧ページへ遷移
   */
  const listPage = () => {
    const params = {
      lat: coords.lat, // 緯度
      lng: coords.lng, // 経度
      range, // 半径
      genre, // お店ジャンル
      count: 10, // 最大取得数
      format: 'json', // レスポンス形式
    };
    setCookie(null, 'gourmetInfo', JSON.stringify(params), {
      maxAge: 60 * 60 * 24 * 30, // 30日間
    });
    router.push({
      pathname: '/list',
      query: {start: 1},
    });
  };

  return (
    <Layout>
      <Head>
        <title>Gourmet Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container maxWidth="md">
          <p>近くのレストランを検索できます</p>
          <p>周辺のお店を探す</p>
          <p>現在位置：{presentPosition}</p>
          <div className={styles.input_layout}>
            <SelectRange
              range={range}
              setRange={setRange} />
            <SelectGenre
              genreList={genreList}
              genre={genre}
              setGenre={setGenre} />
            <Button
              disabled={coords === undefined}
              variant='contained'
              onClick={listPage}
              startIcon={<SearchIcon></SearchIcon>}>検索</Button>
            <Link href='/favorite'>
              <Button
                variant='outlined'
                startIcon={<FavoriteIcon></FavoriteIcon>}>お気に入り</Button>
            </Link>
          </div>
        </Container>
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  // お店ジャンル取得
  const url = `http://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${process.env.NEXT_PUBLIC_HOT_PEPPER_KEY}&format=json`;
  const genre = await axios.get(url);

  return {
    props: {
      genre: genre.data.results.genre, // お店ジャンル
    },
  };
};

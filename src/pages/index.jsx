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
  const {coords, presentPosition, updateGeolocation} = usePresentPosition();

  // 一覧ページへ遷移
  const listPage = () => {
    const searchGenre = genreList.filter((element) =>
      element.code == genre,
    );
    const params = {
      lat: coords.lat, // 緯度
      lng: coords.lng, // 経度
      rage: range, // 半径
      genre: genre, // お店ジャンル
      count: 10, // 最大取得数
      format: 'json', // レスポンス形式
      searchData: {
        presentPosition: presentPosition,
        range: range,
        genre: searchGenre.length > 0 ? searchGenre[0].name : '未選択',
      },
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
          <div className={styles.app_info}>
            <p className={styles.app_description}>近くのレストランを検索</p>
            <p className={styles.app_sub_description}>
              検索範囲とジャンルを選んで<wbr />検索しましょう
            </p>
            <div className={styles.update_position}>
              <div className={styles.presentPosition}>
                <p className={styles.label}>現在位置</p><p>{presentPosition}</p>
              </div>
              <Button
                variant='outlined'
                size='small'
                onClick={updateGeolocation}>現在位置を更新</Button>
            </div>
          </div>

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

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
import AppInfo from '../components/index/AppInfo';
import SelectRange from '../components/index/SelectRange';
import SelectGenre from '../components/index/SelectGenre';
// Layout
import Layout from '../Layout/Layout';
// css
import styles from '../styles/Home.module.scss';
// context
import {
  useCoordsContext,
  usePositionContext} from '../contexts/PositionContext';

/**
 * Homeコンポーネント (検索画面)
 * @param {*} props
 * @return {Component}
 */
export default function Home(props) {
  const router = useRouter();
  const [range, setRange] = useState(3); // 検索範囲
  const [genre, setGenre] = useState(''); // お店ジャンル

  const [coords] = useCoordsContext();
  const [presentPosition] = usePositionContext();

  // ジャンル情報
  const genreList = props.genre;

  // 一覧ページへ遷移
  const listPage = () => {
    const searchGenre = genreList.filter((element) =>
      element.code == genre,
    );
    const params = {
      lat: coords.lat, // 緯度
      lng: coords.lng, // 経度
      range: range, // 半径
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
          <AppInfo />
          <div className={styles.input_layout}>
            <p>検索範囲とジャンルを選んで検索しましょう</p>
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

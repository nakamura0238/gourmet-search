import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import {useRouter} from 'next/router';
import axios from 'axios';
import {
  Container,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {setCookie} from 'nookies';
import Header from '../components/common/header';

/**
 * Homeコンポーネント
 * @param {*} props
 * @return {Component}
 */
export default function Home(props) {
  const router = useRouter();

  const [range, setRange] = useState(3);
  const [genre, setGenre] = useState('');
  const [coords, setCoords] = useState(undefined);
  const [presentPosition, setPresentPosition] = useState('位置情報を取得中です');

  const genreList = props.genre;

  useEffect(() => {
    ;(async () => {
      if (navigator.geolocation) { // navigatorの使用可能チェック
        navigator.geolocation.getCurrentPosition(async (position) => {
          setCoords(
              {
                // 実際はこちらを使用
                // lat: position.coords.latitude, // 緯度
                // lng: position.coords.longitude // 経度

                // 東京都 千代田区 神田花岡町
                lat: 35.698619, // 緯度
                lng: 139.772908, // 経度
              });
          const address = await axios.get('/api/ReverseGeocode');
          const addressElement = address.data.Property.AddressElement;
          setPresentPosition(
              addressElement[0].Name + ' ' +
              addressElement[1].Name + ' ' +
              addressElement[2].Name);
        });
      } else { // navigator使用不可
        setPresentPosition('位置情報が使用できません');
      }
    })();
  }, []);

  /**
   * 一覧ページへ遷移
   */
  const listPage = () => {
    const start = {
      start: 1,
    };
    const params = {
      lat: coords.lat, // 緯度
      lng: coords.lng, // 経度
      range, // 半径
      genre, // お店ジャンル
      start: 1, // 取得位置
      count: 10, // 最大取得数
      format: 'json', // レスポンス形式
    };
    setCookie(null, 'gourmetInfo', JSON.stringify(params), {
      maxAge: 60 * 60 * 24 * 30,
    });
    router.push({
      pathname: '/list',
      query: start,
    });
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

        <Container maxWidth="md">
          <p>近くのレストランを検索できます</p>
          <p>周辺のお店を探す</p>
          <p>現在位置：{presentPosition}</p>
          <div className={styles.input_layout}>
            <FormControl fullWidth>
              <InputLabel id="search-range-label">検索範囲</InputLabel>
              <Select
                labelId="search-range-label"
                id="search-range"
                defaultValue={3}
                value={range}
                label="Range"
                onChange={(val) => setRange(val.target.value)}
              >
                <MenuItem value={1}>300m</MenuItem>
                <MenuItem value={2}>500m</MenuItem>
                <MenuItem value={3} selected>1000m</MenuItem>
                <MenuItem value={4}>2000m</MenuItem>
                <MenuItem value={5}>3000m</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="search-genre-label">ジャンル</InputLabel>
              <Select
                labelId="search-genre-label"
                id="search-genre"
                defaultValue=''
                value={genre}
                label="Genre"
                onChange={(val) => setGenre(val.target.value)}
              >
                <MenuItem value=''>指定なし</MenuItem>
                {genreList.map((val, i) => {
                  return (
                    <MenuItem key={i} value={val.code}>{val.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              disabled={coords === undefined}
              variant='contained'
              onClick={listPage}
              startIcon={<SearchIcon></SearchIcon>}>検索</Button>


            <nav>
              <Link href='/favorite'>
                <Button
                  variant='outlined'
                  startIcon={<FavoriteIcon></FavoriteIcon>}>お気に入り</Button>
              </Link>
            </nav>
          </div>

        </Container>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const url =
    `http://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${process.env.NEXT_PUBLIC_HOT_PEPPER_KEY}&format=json`;

  const genre = await axios.get(url);
  // console.log(genre.data.results.genre);

  return {
    props: {
      genre: genre.data.results.genre,
    },
  };
};
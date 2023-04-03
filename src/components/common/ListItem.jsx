import React from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import TrainIcon from '@mui/icons-material/Train';
import MapIcon from '@mui/icons-material/Map';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import styles from './ListItem.module.scss';

/**
 * お店情報カード (一覧、お気に入り共通)
 * @param {*} props gourmetListの要素
 * @property {Object} val
 * @return {Component}
 */
const ListItem = (props) => {
  const router = useRouter();
  const val = props.val;

  const detailPage = (shopId) => {
    router.push({
      pathname: '/detail',
      query: {
        id: shopId, // 店ID
      },
    });
  };

  return (
    <div
      className={styles.shop_card}
      onClick={() => detailPage(val.id)}>
      <div>
        <Image
          src={val.photo.pc.l}
          width={200}
          height={200}
          alt={val.name}
          style={{border: '1px solid #CCCCCC'}}
        />
        <p style={{
          paddingTop: '5px',
          fontSize: '0.7rem'}}>
            【画像提供：ホットペッパー グルメ】
        </p>
      </div>
      <div className={styles.shop_card_inner}>
        <p className={styles.genre}>{val.genre.name}</p>
        <p className={styles.name}>{val.name}</p>
        <div className={styles.access}>
          <TrainIcon />
          <p>{val.access}</p>
        </div>
        <div className={styles.address}>
          <MapIcon />
          <p>{val.address}</p>
        </div>
        <div className={styles.budget}>
          <CurrencyYenIcon />
          <p>{val.budget.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;

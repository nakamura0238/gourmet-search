import React from 'react';
import Image from 'next/image';
import TrainIcon from '@mui/icons-material/Train';
import MapIcon from '@mui/icons-material/Map';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import FavoriteButton from './FavoriteButton';
import styles from './ShopOverView.module.scss';

/**
 * お店概要表示
 * @param {*} props
 * @property {Object} shopDetail
 * @return {Component}
 */
const ShopOverview = (props) => {
  const shopDetail = props.shopDetail;

  return (
    <div className={styles.shop_overview_container}>
      <div className={styles.shop_top}>
        <div>
          <Image
            src={shopDetail.photo.pc.l}
            width={200}
            height={200}
            alt={shopDetail.name}
            priority={true}
            style={{border: '1px solid #CCCCCC'}}
          />
          <p style={{
            paddingTop: '5px',
            fontSize: '0.7rem'}}>
            【画像提供：ホットペッパー グルメ】
          </p>
        </div>
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
        <p>{shopDetail.budget.name}</p>
      </div>
    </div>
  );
};

export default ShopOverview;

import React from 'react';
import {Button} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MapIcon from '@mui/icons-material/Map';
import styles from './LinkButton.module.scss';

/**
 * 外部リンクボタン
 * @param {*} props
 * @property {Object} shopDetail
 * @return {Component}
 */
const LinkButton = (props) => {
  const shopDetail = props.shopDetail;

  return (
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
  );
};

export default LinkButton;

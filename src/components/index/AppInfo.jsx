import React from 'react';
import {Button} from '@mui/material';
import usePresentPosition from '../../hooks/usePresentPosition';
import styles from './AppInfo.module.scss';

/**
 * 現在地の表示と更新
 * @return {Component}
 */
const AppInfo = () => {
  const {presentPosition, updateGeolocation} = usePresentPosition();

  return (
    <div className={styles.app_info}>
      <p className={styles.app_description}>近くのレストランを検索</p>
      <div className={styles.update_position}>
        <p className={styles.label}>現在地</p>
        <p className={styles.presentPosition}>{presentPosition}</p>
        <Button
          variant='outlined'
          size='small'
          onClick={updateGeolocation}>現在位置を更新</Button>
      </div>
    </div>
  );
};

export default AppInfo;

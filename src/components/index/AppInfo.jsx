import React from 'react';
import {Button} from '@mui/material';
import usePresentPosition from '../../hooks/usePresentPosition';
import styles from './AppInfo.module.scss';

const AppInfo = () => {
  const {presentPosition, updateGeolocation} = usePresentPosition();

  return (
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
  );
};

export default AppInfo;

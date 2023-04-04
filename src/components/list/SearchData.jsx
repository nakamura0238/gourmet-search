import React from 'react';
import styles from './SearchData.module.scss';

const SearchData = (props) => {
  const searchData = props.searchData;
  const searchRange = {
    1: '300m',
    2: '500m',
    3: '1000m',
    4: '2000m',
    5: '3000m',
  };

  return (
    <table className={styles.search_data_box}>
      <tbody>
        <tr>
          <td className={styles.label}>現在位置</td>
          <td>{searchData.presentPosition}</td>
        </tr>
        <tr>
          <td className={styles.label}>検索範囲</td>
          <td>{searchRange[searchData.range]}</td>
        </tr>
        <tr>
          <td className={styles.label}>ジャンル</td>
          <td>{searchData.genre}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SearchData;

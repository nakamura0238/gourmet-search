import React from 'react';
import {useRouter} from 'next/router';
import {Button} from '@mui/material';
import styles from './PagingButton.module.scss';

/**
 * ページング用ボタン
 * @param {*} props
 * @property {number} start
 * @property {Object} paging
 * @return {Component}
 */
const PagingButton = (props) => {
  const router = useRouter();
  const start = parseInt(props.start);
  const pagingInfo = props.paging;

  const nextPage = () => {
    router.push({
      pathname: '/list',
      query: {
        start: start + 10,
      },
    });
  };

  const prevPage = () => {
    router.push({
      pathname: '/list',
      query: {
        start: start - 10,
      },
    });
  };

  return (
    <div className={styles.paging_box}>
      <Button
        disabled={!pagingInfo.canPrev}
        variant="outlined"
        onClick={prevPage}>prev</Button>
      <span>
        {pagingInfo.available}件 {pagingInfo.start}〜{pagingInfo.end}件を表示
      </span>
      <Button
        disabled={!pagingInfo.canNext}
        variant="outlined"
        onClick={nextPage}>next</Button>
    </div>
  );
};

export default PagingButton;

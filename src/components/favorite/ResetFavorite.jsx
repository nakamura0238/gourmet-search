import React, {useState} from 'react';
import {Button} from '@mui/material';
import {toast} from 'react-hot-toast';
import styles from './ResetFavorite.module.scss';

const ResetFavorite = (props) => {
  const [modal, setModal] = useState(undefined);

  const openModal = () => {
    setModal(<ResetModal />);
  };

  const closeModal = () => {
    setModal(undefined);
  };

  const resetAction = () =>{
    const myStorage = localStorage;
    myStorage.removeItem('favorite-gourmet');
    props.setFavoriteList([]);
    toast.success('お気に入りをリセットしました');
  };

  // モーダル
  const ResetModal = () => {
    return (
      <div className={styles.overlay} onClick={closeModal}>
        <div className={styles.modal}>
          <div className={styles.modal_inner}>
            <p>お気に入りをリセットします</p>
            <div className={styles.button_box}>
              <Button
                variant='outlined'
                onClick={closeModal}>キャンセル</Button>
              <Button
                variant='contained'
                color='error'
                onClick={resetAction}>リセット</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Button variant='outlined' color='error' onClick={openModal}>リセット</Button>
      {modal}
    </>
  );
};


export default ResetFavorite;

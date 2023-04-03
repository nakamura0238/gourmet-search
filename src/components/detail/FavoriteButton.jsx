import React from 'react';
import {Button} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {toast} from 'react-hot-toast';
import {getIndex} from '../../functions/getIndex';

const FavoriteButton = (props) => {
  const shopDetail = props.shopDetail;
  // お気に入り登録
  const setFavorite = () => {
    const myStorage = localStorage;
    const gourmetObject = {
      id: shopDetail.id,
      name: shopDetail.name,
      genre: {name: shopDetail.genre.name},
      budget: {name: shopDetail.budget.name},
      access: shopDetail.access,
      address: shopDetail.address,
      photo: {
        pc: {
          l: shopDetail.photo.pc.l,
        },
      }
      ,
    };
    if (myStorage.getItem('favorite-gourmet')) {
      // お気に入りリスト取得 (localStorage)
      const gourmetList = JSON.parse(myStorage.getItem('favorite-gourmet'));

      // 店が登録されているか確認 (添字検索)
      const found = getIndex(shopDetail.id, gourmetList, 'id');

      if (found == -1) { // 未登録の場合
        gourmetList.push(gourmetObject);
        toast.success('お気に入り登録しました');
      } else { // 登録済みの場合
        gourmetList.splice(found, 1);
        toast.error('お気に入り解除しました');
      }
      // localStorageに保存
      myStorage.setItem('favorite-gourmet', JSON.stringify(gourmetList));
    } else {
      // localStorageに保存
      myStorage.setItem('favorite-gourmet', JSON.stringify([gourmetObject]));
    }
  };

  return (
    <Button
      variant='outlined'
      startIcon={<FavoriteIcon></FavoriteIcon>}
      onClick={setFavorite} >お気に入り</Button>
  );
};

export default FavoriteButton;

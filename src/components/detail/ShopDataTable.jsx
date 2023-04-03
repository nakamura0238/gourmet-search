import React from 'react';
import styles from './ShopDataTable.module.scss';

/**
 * お店情報表示テーブル
 * @param {*} props
 * @property {Object} shopDetail
 * @return {Component}
 */
const ShopDataTable = (props) => {
  const shopDetail = props.shopDetail;
  // テーブル表示するデータ
  const shopData = [
    {label: '店名', content: shopDetail.name},
    {label: 'アクセス', content: shopDetail.access},
    {label: '住所', content: shopDetail.address},
    {label: '営業時間', content: shopDetail.open},
    {label: '定休日', content: shopDetail.close},
    {label: 'コース', content: shopDetail.course},
    {label: '飲み放題', content: shopDetail.free_drink},
    {label: '食べ放題', content: shopDetail.free_food},
    {label: '個室', content: shopDetail.private_room},
    {label: '禁煙席', content: shopDetail.non_smoking},
    {label: 'カード決済', content: shopDetail.card},
  ];

  return (
    <table className={styles.data_table}>
      <tbody>
        {shopData.map((val, i) => {
          return (
            <tr key={i}>
              <td className={styles.label}>{val.label}</td>
              <td className={styles.content}>{val.content}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ShopDataTable;

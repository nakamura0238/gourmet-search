const API_KEY = process.env.NEXT_PUBLIC_HOT_PEPPER_KEY;

export const buildListRequest = (hoge) => {
  let url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}`;
  console.log(url);
  const params = [
    'lat', // 緯度
    'lng', // 経度
    'range', // 半径
    'genre', // お店ジャンル
    'start', // 取得位置
    'count', // 最大取得数
    'format', // レスポンス形式
  ];

  params.forEach((val, i) => {
    if (hoge[val]) {
      url += `&${val}=${hoge[val]}`;
    }
  });

  return url;
};

export const buildDetailRequest = (hoge) => {
  let url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}`;
  const params = [
    'id', // 店舗ID
    'format', // レスポンス形式
  ];

  params.forEach((val, i) => {
    url += `&${val}=${hoge[val]}`;
  });

  return url;
};

const API_KEY = process.env.NEXT_PUBLIC_HOT_PEPPER_KEY;

// お店一覧取得URL
export const buildListRequest = (params, start) => {
  let url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}`;

  const paramLabels = [
    'lat', // 緯度
    'lng', // 経度
    'range', // 半径
    'genre', // お店ジャンル
    'count', // 最大取得数
    'format', // レスポンス形式
  ];
  url += `&start=${start}`;
  paramLabels.forEach((val, i) => {
    if (params[val]) {
      url += `&${val}=${params[val]}`;
    }
  });

  return url;
};

// お店詳細取得URL
export const buildDetailRequest = (id) => {
  const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}&id=${id}&format=json`;

  return url;
};

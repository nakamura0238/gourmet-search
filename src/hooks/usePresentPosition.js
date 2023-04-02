import {useState, useEffect} from 'react';
import axios from 'axios';

const usePresentPosition = () => {
  const [coords, setCoords] = useState(undefined);
  const [presentPosition, setPresentPosition] = useState('位置情報を取得中です');

  useEffect(() => {
    ;(async () => {
      if (navigator.geolocation) { // navigatorの使用可能チェック
        navigator.geolocation.getCurrentPosition(async (position) => {
          setCoords(
              {
              // 実際はこちらを使用
              // lat: position.coords.latitude, // 緯度
              // lng: position.coords.longitude, // 経度

                // ダミーデータ
                // 東京都 千代田区 神田花岡町
                lat: 35.698619, // 緯度
                lng: 139.772908, // 経度
              });
          const address = await axios.get('/api/ReverseGeocoding');
          // const address = await axios.get('/api/ReverseGeocoding', {
          //   params: {
          //     lat: position.coords.latitude,
          //     lon: position.coords.longitude,
          //   },
          // });
          const addressElement = address.data.Property.AddressElement;
          setPresentPosition(
              addressElement[0].Name + ' ' +
            addressElement[1].Name + ' ' +
            addressElement[2].Name);
        });
      } else { // navigator使用不可
        setPresentPosition('位置情報が使用できません');
      }
    })();
  }, []);

  return {coords, presentPosition};
};

export default usePresentPosition;

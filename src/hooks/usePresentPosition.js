import {useEffect} from 'react';
import axios from 'axios';
import {
  useCoordsContext,
  usePositionContext} from '../contexts/PositionContext';

/**
 * 位置情報取得
 * @return {Object} 緯度経度
 * @return {String} 現在地
 * @return {function} 現在地更新関数
 */
const usePresentPosition = () => {
  const [coords, setCoords] = useCoordsContext();
  const [presentPosition, setPresentPosition] = usePositionContext();

  // 位置情報の取得に成功
  const successGetPosition = async (position) => {
    setCoords(
        {
          lat: position.coords.latitude, // 緯度
          lng: position.coords.longitude, // 経度
        });
    const address = await axios.get('/api/ReverseGeocoding', {
      params: {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      },
    });
    const addressElement = address.data.Property.AddressElement;
    setPresentPosition(
        addressElement[0].Name + ' ' +
      addressElement[1].Name + ' ' +
      addressElement[2].Name);
  };

  // 位置情報の取得に失敗
  const errorGetPosition =() => {
    setPresentPosition('位置情報が取得できませんでした');
  };

  const options = {
    timeout: 5000,
    maximumAge: 0,
  };

  const updateGeolocation = async () => {
    setCoords(undefined);
    setPresentPosition('現在地を取得中です');
    if (navigator.geolocation) { // navigatorの使用可能チェック
      navigator.geolocation.getCurrentPosition(
          (position) => successGetPosition(position),
          errorGetPosition,
          options);
    } else { // navigator使用不可
      setPresentPosition('位置情報が取得できませんでした');
    }
  };


  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      updateGeolocation();
    };
    return () => ignore = true;
  }, []);

  return {coords, presentPosition, updateGeolocation};
};

export default usePresentPosition;

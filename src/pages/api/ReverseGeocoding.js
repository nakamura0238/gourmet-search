// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

/**
 * Reverse Geocode
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  try {
    // リバースジオコーディング
    // const query = req.query;
    // const address = await axios.get(`https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=${query.lat}&lon=${query.lon}&output=json&appid=${process.env.NEXT_PUBLIC_YAHOO_KEY}`);

    // こちらは使わない
    const address = await axios.get(`https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=35.698619&lon=139.772908&output=json&appid=${process.env.NEXT_PUBLIC_YAHOO_KEY}`);

    res.status(200).json(address.data.Feature[0]);
  } catch (error) {
    console.info(error);
  }
}

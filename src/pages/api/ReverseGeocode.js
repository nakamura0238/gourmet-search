// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

/**
 * Reverse Geocode
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  try {
    const address = await axios.get(`https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=35.698619&lon=139.772908&output=json&appid=${process.env.NEXT_PUBLIC_YAHOO_KEY}`);
    res.status(200).json(address.data.Feature[0]);
  } catch (error) {
    console.info(error);
  }
}

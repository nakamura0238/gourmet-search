// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Reverse Geocode
 * @param {*} req
 * @param {*} res
 */
export default async function handler(req, res) {
  try {
    const hoge = req;
    console.log(hoge);
    res.status(200).json('ok');
  } catch (error) {
    console.info(error);
  }
}

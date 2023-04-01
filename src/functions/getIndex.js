/**
 * オブジェクトを扱う配列から添字を取得
 * @param {*} value 検索したい値
 * @param {*} arr 配列
 * @param {*} prop オブジェクトのキー
 * @return {number|-1}
 */
export function getIndex(value, arr, prop) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1; // 値が存在しなかったとき
};

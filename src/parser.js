const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');
const webhook = require('./webhook');
require('dotenv').config();

const { RENT_INFO_URL, COOKIE_INFO } = process.env;

const get591JSON = async () => {
  const result = await axios.get(RENT_INFO_URL, {
    headers: {
      Cookie: COOKIE_INFO,
    },
  });
  return result;
};

module.exports = {
  start: async () => {
    const { data: { data: { data: objectList } } } = await get591JSON();

    // 讀取已送過的 post id list資料 from id.json file
    let { idList } = JSON.parse(fs.readFileSync('src/id.json'));

    await objectList.map(async (object) => {
      const { post_id: postId } = object;

      // 確認是否已送過
      if (_.includes(idList, postId)) {
        return;
      }

      // eslint-disable-next-line
      await webhook.sendWebhook({
        value1: object.address,
        value2: object.price,
        value3: `https://rent.591.com.tw/rent-detail-${postId}.html`,
      });
    });

    // 將 post id list 資料寫回 id.json file
    idList = objectList.map(object => object.post_id);
    fs.writeFileSync('src/id.json', JSON.stringify({ idList }));
  },
};

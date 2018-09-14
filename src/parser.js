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
    const result = await get591JSON();

    const { data: { data: { data: objectList } } } = result;

    const { idList } = JSON.parse(fs.readFileSync('src/id.json'));

    objectList.map(async (object) => {
      const { post_id: postId } = object;

      if (_.includes(idList, postId)) {
        return;
      }

      const sendData = {
        value1: object.address,
        value2: object.price,
        value3: `https://rent.591.com.tw/rent-detail-${postId}.html`,
      };

      // eslint-disable-next-line
      await webhook.sendWebhook(sendData);
    });

    const writeData = objectList.map(object => object.post_id);
    fs.writeFileSync('src/id.json', JSON.stringify({ idList: writeData }));
  },
};

const axios = require('axios');
const webhook = require('./webhook');

const url = 'https://rent.591.com.tw/home/search/rsList?is_new_list=1&type=1&kind=1&searchtype=1&region=1&section=5,10,8,3,2&rentprice=3&pattern=0&area=0,0&not_cover=1';

const get591JSON = async () => {
  const result = await axios.get(url, {
    headers: {
      Cookie: 'urlJumpIp=1;urlJumpIpByTxt=%E5%8F%B0%E5%8C%97%E5%B8%82;',
    },
  });
  return result;
};

module.exports = {
  start: async () => {
    const result = await get591JSON();

    const { data: { data: { data: objectList } } } = result;

    objectList.map(async (object) => {
      const sendData = {
        value1: object.address,
        value2: object.price,
        value3: `https://rent.591.com.tw/rent-detail-${object.post_id}.html`,
      };

      // eslint-disable-next-line
      await webhook.sendWebhook(sendData);
    });
  },
};

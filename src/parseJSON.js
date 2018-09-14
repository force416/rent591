const axios = require('axios');

const get591JSON = async (url) => {
  const result = await axios.get(url, {
    headers: {
      Cookie: 'urlJumpIp=1;urlJumpIpByTxt=%E5%8F%B0%E5%8C%97%E5%B8%82;',
    },
  });
  return result;
};

module.exports = {
  getObjectUrl: async (url) => {
    const result = await get591JSON(url);
    // const objectList = JSON.parse(result);
    const { data: { data: { data: objectList } } } = result;
    // console.log(objectList);
    objectList.forEach((object) => {
      console.log(object.id);
    });
  },
};

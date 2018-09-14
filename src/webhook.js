const axios = require('axios');

module.exports = {
  sendWebhook: async () => {
    await axios.post('https://maker.ifttt.com/trigger/591/with/key/CkWt5SLK8Updi48485YE0', {
      value1: 'we',
      value2: 'are',
      value3: 'test',
    });
  },
};

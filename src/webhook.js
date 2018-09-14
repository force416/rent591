const axios = require('axios');
require('dotenv').config();

const { WEBHOOK_EVENT, WEBHOOK_ID } = process.env;

module.exports = {
  sendWebhook: async (contentJSON) => {
    await axios.post(`https://maker.ifttt.com/trigger/${WEBHOOK_EVENT}/with/key/${WEBHOOK_ID}`, contentJSON);
  },
};

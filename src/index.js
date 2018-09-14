// const webhook = require('./webhook');
const parseHTML = require('./parseJSON');

const url = 'https://rent.591.com.tw/home/search/rsList?is_new_list=1&type=1&kind=1&searchtype=1&region=1&section=5,10,8,3,2&rentprice=3&pattern=0&area=0,0&not_cover=1&firstRow=30&totalRows=75';

(async () => {
  parseHTML.getObjectUrl(url);
})();

// webhook.sendWebhook();

/*
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname=*.tapbots.net
*/

let obj = JSON.parse($response.body);

// 添加伪造的交易记录
obj["transactions"] = [
  {
    "transaction_id": "test123",
    "purchase_date": "2025-04-06T00:00:00Z",
    "expires_date": "2030-01-01T00:00:00Z",
    "product_id": "ivory_premium"
  }
];

$done({body: JSON.stringify(obj)});

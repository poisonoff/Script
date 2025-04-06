/*
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname = subscription.tapbots.net, *.tapbots.net
*/

let obj = JSON.parse($response.body);

// 修改订阅状态
obj["expires_at"]= 3476097520,
obj["can_trial"]= true,
obj["subscription_status"] = active; // 强制激活订阅

$done({body: JSON.stringify(obj)});

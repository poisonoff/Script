/*
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname=*.tapbots.net, *.tapbots.com
*/

let obj = JSON.parse($response.body);

obj["expires_at"] = 3476097520;  // 设置一个远期日期 (约2080年)
obj["active"] = true;
obj["can_trial"] = true;
obj["is_active"] = true;  // 可能存在的字段
obj["is_premium"] = true;  // 可能存在的字段
obj["subscription_active"] = true;  // 可能存在的字段
obj["status"] = "active";  // 可能存在的字段

$done({body: JSON.stringify(obj)});

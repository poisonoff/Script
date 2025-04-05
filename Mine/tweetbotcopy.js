/*
Quantumult X Script for Ivory Subscription Bypass
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname = subscription.tapbots.net
*/

let obj = JSON.parse($response.body);

// 修改订阅状态
obj["expires_at"] = "3476097520"; // 设置为未来时间戳（2084年）
obj["can_trial"] = true;         // 启用试用功能
obj["subscription_status"] = "active"; // 强制激活订阅

$done({ body: JSON.stringify(obj) });

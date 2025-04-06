/*
Quantumult X Script for Ivory Subscription Bypass
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname=subscription.tapbots.net
*/

try {
    let obj = JSON.parse($response.body);

    // 修改订阅状态字段
    obj.client_expires_at = 3471292800; // 永不过期时间（Unix 时间戳）
    obj.can_trial = true;                // 启用试用功能
    obj.subscription_status = active;  // 激活订阅状态

$done({body: JSON.stringify(obj)});

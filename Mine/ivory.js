/*
Quantumult X Script to unlock Ivory subscription
URL: https://subscription.tapbots.net/subscription/2/verify
Hostname: *.tapbots.net
*/

let obj = JSON.parse($response.body);

// 保留原始字段（可选，保持响应结构完整）
obj["uuid"] = obj["uuid"] || "2EDEFF32-4B35-4345-8681-BBFEF87CFADB"; // 使用日志中的UUID
obj["transactions"] = obj["transactions"] || []; // 保留空交易数组

// 添加破解字段，模拟Tweetbot解锁逻辑
obj["expires_at"] = 3476097520; // 设置到期时间为2030-01-01 (Unix时间戳)
obj["can_trial"] = true;        // 启用试用资格

// 返回修改后的响应体
$done({body: JSON.stringify(obj)});

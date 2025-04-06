/*
Quantumult X Script for Ivory Subscription Bypass
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname=subscription.tapbots.net
*/

try {
  let obj = JSON.parse($response.body);

  // 核心字段修改（基于你的日志推测）
  obj["expires_at"] = "2084-01-01T00:00:00Z"; // 强制永不过期
  obj["can_trial"] = true;                   // 启用试用
  obj["subscription_status"] = "active";     // 激活订阅状态

  // 调试日志（确认脚本执行）
  console.log("原始响应:", $response.body);
  console.log("修改后:", JSON.stringify(obj));

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  console.log("脚本错误:", e);
  $done({});
}

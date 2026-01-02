/*
Ivory for Mastodon 订阅重写脚本 (测试用)
应用于: https://subscription.tapbots.net/subscription/2/verify
*/

// 解析响应体
let obj = JSON.parse($response.body);

// 定义远期时间戳 (例如 2099 年: 4070880000)
const expiryTime = 4070880000;

// 1. 逻辑整合：仿照旧脚本开启试用能力
obj["can_trial"] = true;

// 2. 逻辑整合：修改或构造交易信息
if (obj.transactions && obj.transactions.length > 0) {
    // 如果已有交易记录，循环修改所有记录
    obj.transactions.forEach(item => {
        item["expires_at"] = expiryTime;
        item["valid_until"] = expiryTime;
        item["product_id"] = "com.tapbots.Ivory.yearly1"; // 提升至年度会员 ID
        item["auto_renew_status"] = true;
    });
} else {
    // 如果没有交易记录，则手动注入一条
    obj["transactions"] = [
        {
            "product_id": "com.tapbots.Ivory.yearly1",
            "expires_at": expiryTime,
            "valid_until": expiryTime,
            "auto_renew_status": true
        }
    ];
}

// 保持原有的 uuid 不变，避免触发服务端校验异常
// $done 返回修改后的结果
$done({body: JSON.stringify(obj)});

/**
 * Ivory for Mastodon 订阅验证测试脚本 (V2)
 * 适配域名: https://subscription.tapbots.net/subscription/2/verify
 */

let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 1. 继承原 Tweetbot 逻辑：开启试用权限
        obj["can_trial"] = true;

        // 2. 远期过期时间戳 (2099-01-01)
        const expiryTime = 4070880000;

        // 3. 核心逻辑：修改或注入订阅数据
        if (obj.transactions && obj.transactions.length > 0) {
            obj.transactions.forEach(item => {
                item["expires_at"] = expiryTime;
                item["valid_until"] = expiryTime;
                item["product_id"] = "com.tapbots.Ivory.yearly1";
                item["auto_renew_status"] = true;
            });
        } else {
            // 如果原本没有交易记录，手动构造一条
            obj["transactions"] = [
                {
                    "product_id": "com.tapbots.Ivory.yearly1",
                    "expires_at": expiryTime,
                    "valid_until": expiryTime,
                    "auto_renew_status": true
                }
            ];
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("Ivory 脚本解析失败: " + e);
        $done({});
    }
} else {
    $done({});
}

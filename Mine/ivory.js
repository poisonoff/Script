/*
Ivory for Mastodon Subscription Rewrite
Target: https://subscription.tapbots.net/subscription/2/verify
*/

let body = $response.body;
let obj = JSON.parse(body);

// 定义一个未来的时间戳 (2099-01-01)
const futureTime = 4070880000; 

if (obj.transactions && obj.transactions.length > 0) {
    obj.transactions.forEach(item => {
        item.expires_at = futureTime;
        item.valid_until = futureTime;
        // 建议改为年度订阅 ID，通常权限更稳
        item.product_id = "com.tapbots.Ivory.yearly1"; 
        item.auto_renew_status = true;
    });
} else {
    // 如果原本 transactions 为空，手动构造一个
    obj.transactions = [
        {
            "product_id": "com.tapbots.Ivory.yearly1",
            "expires_at": futureTime,
            "valid_until": futureTime,
            "auto_renew_status": true
        }
    ];
}

$done({ body: JSON.stringify(obj) });

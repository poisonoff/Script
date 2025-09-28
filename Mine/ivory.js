// pocketcasts-subscription.js - 示例脚本，仅用于开发复现
// 警告：仅在测试环境中使用

let body = $response.body;  // 获取原始响应体（字符串）

// 检查是否为 JSON 响应
if (body && $response.headers['Content-Type'] && $response.headers['Content-Type'].includes('application/json')) {
    try {
        let jsonBody = JSON.parse(body);  // 解析 JSON
        
        // 修改订阅状态：假设结构为 { "subscription": { "status": "none", "expiry": "..." } }
        // 将 status 改为 "active"，并设置过期日期为未来（例如 2099 年）
        if (jsonBody.subscription) {
            jsonBody.subscription.status = "active";
            jsonBody.subscription.expiry = "2099-12-31T23:59:59Z";  // 示例远期过期
            // 可选：添加其他字段，如 "plan": "plus" 或 "features": ["ad-free", "downloads"]
        }
        
        body = JSON.stringify(jsonBody);  // 序列化回字符串
    } catch (e) {
        // 如果解析失败，保持原样（可选：console.log(e) 调试）
        $done({ body: body });
        return;
    }
}

// 返回修改后的响应
$done({
    status: $response.status,
    headers: $response.headers,
    body: body
});

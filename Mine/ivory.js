// pocketcasts-subscription.js - 用于复现 Pocket Casts 订阅状态修改
// 保存到 Quantumult X 的 Scripts 文件夹

let body = $response.body;
let headers = $response.headers;

// 检查 Content-Type 是否为 JSON 或 octet-stream
if (headers['Content-Type'] && 
    (headers['Content-Type'].includes('application/json') || headers['Content-Type'].includes('application/octet-stream'))) {
    try {
        let jsonBody = JSON.parse(body); // 尝试解析响应体为 JSON
        if (jsonBody.subscription) {
            // 修改订阅状态为活跃
            jsonBody.subscription.status = "active";
            jsonBody.subscription.expiry = "2099-12-31T23:59:59Z";
            // 可选：添加其他字段，如 plan: "plus"（根据实际响应结构调整）
            jsonBody.subscription.plan = jsonBody.subscription.plan || "plus";
        } else {
            // 如果没有 subscription 字段，创建默认结构
            jsonBody.subscription = {
                status: "active",
                expiry: "2099-12-31T23:59:59Z",
                plan: "plus"
            };
        }
        body = JSON.stringify(jsonBody);
        // 调试通知：确认脚本运行
        $notify("Pocket Casts Rewrite", "Modified Response", JSON.stringify(jsonBody));
    } catch (e) {
        // 解析失败，保留原始 body 并通知错误
        $notify("Pocket Casts Rewrite Error", "Parse Failed", e.message);
        $done({ body: body });
        return;
    }
} else {
    // 非 JSON/octet-stream 响应，保留原样
    $notify("Pocket Casts Rewrite", "Skipped", "Non-JSON response: " + headers['Content-Type']);
}

// 返回修改后的响应
$done({
    status: $response.status,
    headers: headers,
    body: body
});

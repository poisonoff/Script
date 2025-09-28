[general]
excluded_routes=192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 127.0.0.0/8, 100.64.0.0/10
dns_exclusion_list=*.local

[rewrite_local]
# 拦截 Pocket Casts 订阅状态 API
^https://api\.pocketcasts\.com/subscription/status.* url script-response-body PocketCastsSubscription

[mitm]
# 启用 MITM 解密
hostname = api.pocketcasts.com

[script_local]
# 内嵌脚本，修改响应体，增加调试
PocketCastsSubscription = type=http-response, pattern=^https://api\.pocketcasts\.com/subscription/status.*, script-path=inline://let body = $response.body; let headers = $response.headers; $notify("Pocket Casts Debug", "Request URL", $request.url); $notify("Pocket Casts Debug", "Original Body", body); if (headers['Content-Type'] && (headers['Content-Type'].includes('application/json') || headers['Content-Type'].includes('application/octet-stream'))) { try { let jsonBody = JSON.parse(body); if (jsonBody.subscription) { jsonBody.subscription.status = "active"; jsonBody.subscription.expiry = "2099-12-31T23:59:59Z"; jsonBody.subscription.plan = jsonBody.subscription.plan || "plus"; } else { jsonBody.subscription = { status: "active", expiry: "2099-12-31T23:59:59Z", plan: "plus" }; } body = JSON.stringify(jsonBody); $notify("Pocket Casts Rewrite", "Modified Body", body); } catch (e) { $notify("Pocket Casts Rewrite Error", "Parse Failed", e.message); $done({ body: body }); return; } } else { $notify("Pocket Casts Rewrite", "Skipped", "Non-JSON Content-Type: " + headers['Content-Type']); } $done({ status: $response.status, headers: headers, body: body });

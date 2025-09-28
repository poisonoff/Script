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
# 内嵌脚本，增强调试，输出原始和修改后的响应体
PocketCastsSubscription = type=http-response, pattern=^https://api\.pocketcasts\.com/subscription/status.*, script-path=inline://let body = $response.body; let headers = $response.headers; $notify("Pocket Casts Debug", "Request URL", $request.url); $notify("Pocket Casts Debug", "Content-Type", headers['Content-Type'] || "undefined"); $notify("Pocket Casts Debug", "Original Body", body); if (headers['Content-Type'] && (headers['Content-Type'].includes('application/json') || headers['Content-Type'].includes('application/octet-stream'))) { try { let jsonBody = JSON.parse(body); let modified = false; if (jsonBody.is_plus_user != null || jsonBody.account_tier || jsonBody.valid_until) { jsonBody.is_plus_user = true; jsonBody.account_tier = "plus"; jsonBody.valid_until = "2099-12-31T23:59:59Z"; modified = true; } else if (jsonBody.subscription) { jsonBody.subscription.status = "active"; jsonBody.subscription.expiry = "2099-12-31T23:59:59Z"; jsonBody.subscription.plan = jsonBody.subscription.plan || "plus"; modified = true; } else { jsonBody.is_plus_user = true; jsonBody.account_tier = "plus"; jsonBody.valid_until = "2099-12-31T23:59:59Z"; modified = true; } body = JSON.stringify(jsonBody); $notify("Pocket Casts Rewrite", modified ? "Modified Body" : "No Modification", body); } catch (e) { $notify("Pocket Casts Rewrite Error", "Parse Failed", e.message + "\nBody: " + body); $done({ body: body }); return; } } else { $notify("Pocket Casts Rewrite", "Skipped", "Non-JSON Content-Type: " + headers['Content-Type']); } $done({ status: $response.status, headers: headers, body: body });

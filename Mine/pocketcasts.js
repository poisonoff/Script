/**
 * 尝试使用更精简的 Plus 标志位进行绕过
 */
const method = $request.method;

// 这是一段尝试只保留核心 Plus 授权的精简二进制
// 注意：如果这也不行，说明 App 强制要求校验 Token 身份
const genericPlusHex = "10011a06088ee0a3c906400282010608f5fe99d805"; 

function toUint8(hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
}

if (method === "GET") {
    $done({
        body: toUint8(genericPlusHex).buffer,
        headers: { "Content-Type": "application/octet-stream" }
    });
} else {
    $done({});
}

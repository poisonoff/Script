/**
 * Pocket Casts Plus Unlock (Protobuf 注入)
 * 适配接口: https://api.pocketcasts.com/subscription/status
 */

const rawHex = "10011a06088ee0a3c90640024a2008f8fb2110d8da32181e2a0a08f8fb2110d8da32181e320808a4cd3210a3cd32523b0801100118022a06088ee0a3c9065224636f6d2e706f636b657463617374732e706c75732e796561726c792e726566657272616c9a0104506c757358017204506c75737a040801100182010608f5fe99d805";

function toUint8Array(hex) {
    return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)));
}

// 替换响应体
$done({
    body: toUint8Array(rawHex).buffer,
    headers: {
        "Content-Type": "application/octet-stream",
        "X-Modified-By": "Gemini-Thought-Partner"
    }
});

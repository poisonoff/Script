/*
https://push.tapbots.com/ivory/verify_subscription url script-response-body ivory.js
hostname=*.tapbots.com
*/

let obj = JSON.parse($response.body);
obj["expires_at"] = 3476097520;  // 2084-01-01
obj["can_trial"] = true;
$done({ body: JSON.stringify(obj) });

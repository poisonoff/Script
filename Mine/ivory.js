/*
https://subscription.tapbots.net/subscription/2/verify url script-response-body ivory.js

hostname=*.tapbots.net, *.tapbots.com
*/

let obj = JSON.parse($response.body);

obj["expires_at"] = 3476097520;
obj["can_trial"] = true;

$done({body: JSON.stringify(obj)});


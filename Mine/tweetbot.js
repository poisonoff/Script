[general]
# These general settings are fine.
excluded_routes = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12, 127.0.0.0/8, 100.64.0.0/10
dns_exclusion_list = *.local

[mitm]
# Your hostname for MITM is correct.
hostname = api.pocketcasts.com

[rewrite_local]
# This rule tells Quantumult X to run the script with the tag "PocketCastsSubscription"
# when a response from the specified URL is received.
^https://api\.pocketcasts\.com/subscription/status.* url script-response-body PocketCastsSubscription

[script]
# The script is defined here with its tag and properties.
# Using an inline script is okay for short scripts, but for anything complex,
# using a separate .js file is highly recommended for readability and maintenance.
PocketCastsSubscription = type=http-response, pattern=^https://api\.pocketcasts\.com/subscription/status.*, script-content=
# --- Start of Inline Script Content ---
let body = $response.body;
let headers = $response.headers;
let responseModified = false;

// Check if the response is likely JSON before trying to parse it.
if (headers['Content-Type'] && headers['Content-Type'].includes('application/json')) {
    try {
        let jsonBody = JSON.parse(body);

        // Your logic to modify the JSON body
        if (jsonBody.subscription) {
            jsonBody.subscription.status = "active";
            jsonBody.subscription.expiry = "2099-12-31T23:59:59Z";
            jsonBody.subscription.plan = jsonBody.subscription.plan || "plus";
        } else {
            // If there's no subscription object, create one.
            jsonBody.subscription = {
                status: "active",
                expiry: "2099-12-31T23:59:59Z",
                plan: "plus"
            };
        }

        body = JSON.stringify(jsonBody);
        responseModified = true;
        $notify("✅ Pocket Casts Rewrite", "Subscription status modified successfully.", "");

    } catch (e) {
        // Log an error if JSON parsing fails.
        $notify("❌ Pocket Casts Rewrite Error", "Failed to parse JSON response.", `Error: ${e.message}`);
    }
}

// The $done() function should be called only once at the end.
// If the response was modified, return the new body. Otherwise, return the original response.
if (responseModified) {
    $done({ body: body });
} else {
    $done({}); // Passing an empty object means no changes are made to the original response.
}
# --- End of Inline Script Content ---

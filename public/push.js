var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BPBcVvrpZx-3q3sMwBA-sz_pSpMdFDlakbw7ImaAVBYeya2Nsl2KZsDSuhAK-Tz0pVcxqkPwMKBiLAl5StXjjlw",
    "privateKey": "AfI9bQ2vTBQdupR3XS1JR_cdv9dTA3Uy2XJSVlYVkso"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSub = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fZrfK5HAjU4:APA91bELNqjNUJvhFyRT7SAsItqbBiNzhjCUDMfJwjg4dKj8guPkqvCirWPN8iE-jlyoIkzCPbtsEw5haWtGmkzgSjjeE4XfhkEzVer9G2ybr4JPSLvUfefclVGzn9RXW0X2h_xlnp6l",
    "keys": {
        "p256dh": "BA4ZwoPTv4Bpcj0NH85FYQwnlSs1P2L4saxwwVHIpskZGgtqvpqLWWmC3Egdo6PG7Pq64J5FFo52cqwbmrJn7h0=",
        "auth": "Ssr5EnwRqb7suEo+eMYFMQ=="
    }
};
var payLoad = 'Hore_Sub2_DONE!!!';
var options = {
    gcmAPIKey: '520500752910',
    TTL: 60
};

webPush.sendNotification(
    pushSub,
    payLoad,
    options
);
/* "publicKey":"BPBcVvrpZx-3q3sMwBA-sz_pSpMdFDlakbw7ImaAVBYeya2Nsl2KZsDSuhAK-Tz0pVcxqkPwMKBiLAl5StXjjlw"
"privateKey":"AfI9bQ2vTBQdupR3XS1JR_cdv9dTA3Uy2XJSVlYVkso" */
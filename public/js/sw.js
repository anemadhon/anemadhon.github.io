if (!('serviceWorker' in navigator)) {
    console.log("SW tidak di dukung");
} else {
    registerServiceWorker();
    requestPermission();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {  
            console.log("Registrasi Sukses!");
            return registration;
        })
        .catch(function(err) {
            console.error("Registrasi Gagal!", err);
        });
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("Fitur tidak di jalankan!");
                return;
            } else if (result === "default") {
                console.error("Pengguna Menutup kotak dialog permintaan izin");
                return;
            }
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BPBcVvrpZx-3q3sMwBA-sz_pSpMdFDlakbw7ImaAVBYeya2Nsl2KZsDSuhAK-Tz0pVcxqkPwMKBiLAl5StXjjlw")
                    }).then(function(sub) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('auth')))));
                        reg.showNotification('Notifikasi diijinkan!');
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//--Algoritma Geofence-----------------------------------------------------------------------------------------------------------------------
// Tentukan fungsi untuk memeriksa lokasi pengguna
function checkLocation() {
    map.locate({setView: true});
}

// Tentukan fungsi untuk menangani lokasi yang ditemukan
function onLocationFound(e) {
    var userLocation = e.latlng;

    // Periksa apakah lokasi pengguna berada dalam batas-batas fitur apa pun dalam lapisan GeoJSON
    var userWithinArea = false;
    bufferuji.eachLayer(function(layer) {
        if (layer.getBounds().contains(userLocation)) {
            userWithinArea = true;
        }
    });

    // Periksa apakah browser mendukung notifikasi
    if (!("Notification" in window)) {
        console.error("Browser ini tidak mendukung notifikasi desktop");
    } else {
        // Jika pengguna berada dalam fitur apa pun dalam lapisan GeoJSON, tampilkan notifikasi dan pop-up
        if (userWithinArea && Notification.permission === "granted") {
            showNotification("Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
            showPopup("Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
        } else if (userWithinArea && Notification.permission !== "denied") {
            Notification.requestPermission().then(function(permission) {
                if (permission === "granted") {
                    showNotification("Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
                    showPopup("Saat ini anda sedang berada dalam Area Rawan Kecelakaan");
                }
            });
        }
    }
}

// Fungsi untuk menampilkan pop-up
function showPopup(message) {
    // Buat elemen pop-up
    var popup = document.createElement('div');
    popup.className = 'popup-notification';
    popup.innerText = message;
    
    // Gaya dasar untuk pop-up
    popup.style.position = 'fixed';
    popup.style.bottom = '25px';
    popup.style.right = '10px';
    popup.style.padding = '5px';
    popup.style.backgroundColor = '#101820';
    popup.style.color = 'white';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';
    
    // Tambahkan elemen pop-up ke dalam body
    document.body.appendChild(popup);

    // Hapus pop-up setelah 5 detik
    setTimeout(function() {
        document.body.removeChild(popup);
    }, 15000);
}

// Dengarkan acara lokasi ditemukan
map.on('locationfound', onLocationFound);

// Daftarkan Service Worker
if ('service_worker' in navigator) {
    navigator.serviceWorker.register('asset/js/service_worker.js')
    .then(function(registration) {
        console.log('Service Worker registered successfully:', registration);
    })
    .catch(function(error) {
        console.error('Service Worker registration failed:', error);
    });
}

// Panggil fungsi checkLocation sekali untuk memulai
checkLocation();

// Panggil fungsi checkLocation setiap 15 detik
setInterval(checkLocation, 15000);

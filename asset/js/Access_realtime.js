// Check if the browser supports geolocation
if (!navigator.geolocation) {
    console.log("Your browser doesn't support geolocation feature!");
} else {
    // Set interval to repeatedly get the current position
    setInterval(() => {
        navigator.geolocation.getCurrentPosition(getPosition, error);
    }, 500);
}

var marker, circle;

// Function to handle successful retrieval of the position
function getPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    // Remove existing marker and circle from the map
    if (marker) {
        map.removeLayer(marker);
    }
    if (circle) {
        map.removeLayer(circle);
    }

    // Define icon options
    var iconOptions = {
        iconUrl: "asset/img/user-icon.png",
        iconSize: [50, 50], // Adjust icon size
        iconAnchor: [25, 45], // Adjust icon anchor
    };

    // Create custom icon
    var customIcon = L.icon(iconOptions);

    // Create marker with custom icon
    marker = L.marker([lat, long], { icon: customIcon });

    // Create circle around the marker
    circle = L.circle([lat, long], { radius: 10 });

    // Add marker and circle to a feature group and add to the map
    var featureGroup = L.featureGroup([marker, circle]).addTo(map);

    // Center the map on the user's location
    map.setView([lat, long], 23);

    console.log("Your Location is: Lat: " + lat + " Long: " + long );
}

// Function to handle errors in accessing geolocation
function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
        // Runs if user refuses access
    } else {
        alert("Cannot get current location");
        // Runs if there was a technical problem.
    }
}

// Ensure that the map is initialized somewhere in your code
// Example:
var map = L.map('map').setView([lat, long], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

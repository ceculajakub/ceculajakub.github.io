window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

function vibrate() {
  if ("vibrate" in navigator) {
    // 3 krótkie, 3 długie, 3 krótkie (SOS)
    const pattern = [200, 100, 200, 100, 200, 300, 600, 300, 600, 300, 200, 100, 200, 100, 200];
    navigator.vibrate(pattern);
  } else {
    alert("Twoje urządzenie nie obsługuje wibracji.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mapBtn = document.getElementById("map-btn");

  if (mapBtn) {
    mapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showMap();
    });
  } else {
    console.warn("Nie znaleziono przycisku mapy.");
  }
});

function showMap() {
  console.log("Wywołano funkcję showMap()");
  if (!navigator.geolocation) {
    alert("Geolokalizacja nie jest wspierana przez twoją przeglądarkę.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      let oldMapDiv = document.getElementById("map");
      if (oldMapDiv) {
        oldMapDiv.remove();
      }

      const mapContainer = document.createElement("div");
      mapContainer.id = "map";
      mapContainer.style = "height: 400px; margin-top: 20px;";
      document.body.appendChild(mapContainer);

      if (!window.leafletLoaded) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";
        script.onload = () => {
          window.leafletLoaded = true;
          renderMap(latitude, longitude);
        };
        document.head.appendChild(script);

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
        document.head.appendChild(link);
      } else {
        renderMap(latitude, longitude);
      }
    },
    (error) => {
      alert("Błąd pobierania lokalizacji: " + error.message);
    }
  );
}

function renderMap(lat, lon) {
  if (window.myMap) {
    window.myMap.remove();
  }

  window.myMap = L.map('map').setView([lat, lon], 17);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(window.myMap);

  L.marker([lat, lon]).addTo(window.myMap)
    .bindPopup("Twoja lokalizacja")
    .openPopup();
}

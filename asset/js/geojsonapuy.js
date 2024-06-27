        // Membuat layer GeoJSON
        //Contour --------------------------------
        var Kontur = L.geoJSON(Contour2, {
            style: function (feature) {
                var ket = feature.properties.Ket;
                var warna;
  
                switch (ket) {
                    case 'Kontur Minor':
                        warna = '#FF9130';
                        break;
                    case 'Kontur Mayor':
                        warna = '#FF5B22';
                        break;
                    default:
                        warna = 'gray';
                }
  
                return {
                    color: warna,
                    weight: 1,
                    opacity: 1
                };
            },
          
          });
  
          // Function to show or hide the legend container based on the active layers
          function updateLegendVisibility() {
            var legendContainer = document.getElementById("legend-container-contour");
  
            // Check if the Contour layer is active
            var isContourActive = map.hasLayer(Kontur);
  
            // Show or hide the legend container accordingly
            legendContainer.style.display = isContourActive ? "block" : "none";
          }
  
          // Event listener for layer control change
          map.on('overlayadd overlayremove', function () {
            updateLegendVisibility();
          });
  
          // Initial call to set the legend visibility based on the initial layers
          updateLegendVisibility();
  
  
          // POI Pendakian ---------------------------------------------------------------------------------
          function createPOILayer(POI_data, map) {
            return L.geoJSON(POI_data, {
              pointToLayer: function (feature, latlng) {
                var properties = feature.properties;
                var iconUrl = getIconUrl(properties);
  
                var icon = L.icon({
                  iconUrl: iconUrl,
                  iconSize: [15, 15],
                });
  
                return L.marker(latlng, { icon: icon });
              },
              onEachFeature: function (feature, layer) {
                layer.bindTooltip(feature.properties["Nama_Lokasi"], {
                  permanent: false,
                  direction: "top",
                  opacity: 1,
                  interactive: true,
  
                  className: "custom-tooltip",
                  offset: [0, -5],           
                  minWidth: 50,             
                  maxWidth: 100,    
                         
                });
  
                map.on('zoomend', function () {
                  if (map.getZoom() >= 14) {
                    layer.openTooltip();
                  } else {
                    layer.closeTooltip();
                  }
                });
              }
            }).addTo(map);
          }
  
          function createPopupContent(properties) {
            return "<img src='" + properties["Gambar"] + "' width='150px'>" + "<br>" +
              "<strong>" + properties["Nama_Lokasi"] + "</strong><br>" +
              "Bujur : " + properties["Bujur"] + "<br>" +
              "Lintang : " + properties["Lintang"] + "<br>" +
              "Elevasi (Mdpl): " + properties["Ketinggian (MDPL)"];
          }
  
          function getIconUrl(properties) {
            var jenisLokasi = properties["Simbologi"];
            if (jenisLokasi === 'Sumber Air') {
              return 'asset/legend/Sumberair.svg';
            } else if (jenisLokasi === 'Waypoint') {
              return 'asset/legend/Waypoint.svg';
            } else if (jenisLokasi === 'Pos') {
              return 'asset/legend/Poscamp.svg';
            } else if (jenisLokasi === 'Puncak') {
              return 'asset/legend/puncak.svg';
            } else {
              return 'asset/legend/iconawal.svg';
            }
          }
          
          var POI_Apuy = createPOILayer(POI_Jalur_Apuy, map);
          POI_Apuy.eachLayer(function (layer) {
            var properties = layer.feature.properties;
            var popupContent = createPopupContent(properties);
            layer.bindPopup(popupContent);
          });
  
        
          //Jalur Pendakian ------------------------------------------------------------------------------------------------------
          // Jalur Pendakian Apuy ------------------------------------------------------------------------------------------------------
          function createApuyLayer(geoJSONData, color) {
            return L.geoJSON(geoJSONData, {
              style: function (feature) {
                return {
                  color: color,
                  weight: 3,
                };
              },
              onEachFeature: function (feature, layer) {
                var properties = feature.properties;
                var popupContent = '<div style="text-align: center;">' +
                  "<strong>" + properties["Jalur"] + "</strong><br>" +
                  "Jarak Tempuh: " + properties["Jarak Tempuh"] + "<br>" +
                  "Beda Tinggi (m): " + properties["Beda Tinggi"] + "<br>" +
                  "Relief Kelerengan: " + properties["Kelerengan"] + "<br>";
                  
                layer.bindPopup(popupContent);
              }
            }).addTo(map);
          }
          var Apuy = createApuyLayer(Jalur_Apuy, '#38ff46');
  
          // buffer apuy
          function createBufferApuyLayer(geoJSONData, color) {
            return L.geoJSON(geoJSONData, {
              style: function (feature) {
                return {
                  color: color,
                  weight: 3,
                };
              },
              onEachFeature: function (feature, layer) {
                var properties = feature.properties;
                var popupContent = '<div style="text-align: center;">' +
                  "<strong>" + properties["Jalur"] + "</strong><br>" +
                  "Jarak Tempuh: " + properties["Jarak Tempuh"] + "<br>" +
                  "Beda Tinggi (m): " + properties["Beda Tinggi"] + "<br>" +
                  "Relief Kelerengan: " + properties["Kelerengan"] + "<br>";
                  
                layer.bindPopup(popupContent);
              }
            }).addTo(map);
          }
          var BufferApuy = createBufferApuyLayer(area_jalur_apuy, '#38ff46');
  
                  // buffer uji
                  function createBufferUjiLayer(geoJSONData, color) {
            return L.geoJSON(geoJSONData, {
              style: function (feature) {
                return {
                  color: color,
                  weight: 3,
                };
              },
              onEachFeature: function (feature, layer) {
                var properties = feature.properties;
                var popupContent = '<div style="text-align: center;">' +
                  "<strong>" + properties["Jalur"] + "</strong><br>" +
                  "Jarak Tempuh: " + properties["Jarak Tempuh"] + "<br>" +
                  "Beda Tinggi (m): " + properties["Beda Tinggi"] + "<br>" +
                  "Relief Kelerengan: " + properties["Kelerengan"] + "<br>";
                  
                layer.bindPopup(popupContent);
              }
            }).addTo(map);
          }
          var BufferUji = createBufferApuyLayer(bufferuji, '#f9172b');
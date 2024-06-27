        // Layer Control
        var baseMaps = {
          "Citra Satelit": World_Imagery,
          "Topografi" : topographicContour,
        };

        var JalurApuy = L.layerGroup([POI_Apuy, Apuy, BufferApuy, BufferUji]).addTo(map);
        var overlays = {
          "Jalur Apuy": JalurApuy,
          "Garis Kontur": Kontur,
        };

        var layerControl = L.control.layers(baseMaps, overlays).addTo(map);
        layerControl.setPosition('topright');

        //Posisi Peta
        var map = L.map('map').setView([-6.920099, 108.400517], 12.5);

        //ResetView
        L.control.resetView({
          position: "topright",
          title: "Reset view",
          latlng: L.latLng([-6.920099, 108.400517]),
          zoom: 12.5,
        }).addTo(map);

        //fullscreen
        map.on('enterFullscreen', function(){
          if(window.console) window.console.log('enterFullscreen');
        });
        map.on('exitFullscreen', function(){
          if(window.console) window.console.log('exitFullscreen');
        });

        // Lokasi
        L.control.locate().addTo(map);

        //Skala
        L.control.betterscale().addTo(map);
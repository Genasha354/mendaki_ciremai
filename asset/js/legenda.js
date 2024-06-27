        // LEGENDA PETA
        const legend = L.control.Legend({
          position: "topright",
          title: "Legenda",
          symbolWidth: 24,
          symbolHeight: 15,
          opacity: 1.0,
          column: 1,
          collapsed: true,
          legends: [  
          {
              label: "Puncak",
              type: "image",
              url: "asset/legend/puncak.svg",
          },{
              label: "Pos Pendakian",
              type: "image",
              url: "asset/legend/Poscamp.svg",
          },{
              label: "Sumber Air",
              type: "image",
              url: "asset/legend/Sumberair.svg",
          },{
              label: "Waypoint",
              type: "image",
              url: "asset/legend/Waypoint.svg",
          },{
            label: "Jalur Apuy",
            type: "polyline",
            color: "#38ff46",
            weight: 3,
            layers: Apuy
          }
        ]}).addTo(map);
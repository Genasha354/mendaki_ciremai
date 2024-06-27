//BaseMaps
     
var World_Imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>',
  subdomains: ['a','b','c']
}).addTo(map);

var topographicContour = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>',
  subdomains: ['a', 'b', 'c']
});
        // LEGENDA WAKTU TEMPUH
        function toggleLegenda(containerId, isActive) {
            var container = document.getElementById(containerId);
            container.classList.toggle('active', isActive);
          }
  
          function addLegendaItem(containerId, color, label) {
            var container = document.getElementById(containerId);
            var legendaItem = document.createElement('div');
            legendaItem.className = 'legenda-item';
  
            var legendaLine = document.createElement('div');
            legendaLine.className = 'legenda-line';
            legendaLine.style.backgroundColor = color;
  
            var legendaLabel = document.createElement('div');
            legendaLabel.className = 'legenda-label';
            legendaLabel.innerText = label;
  
            legendaItem.appendChild(legendaLine);
            legendaItem.appendChild(legendaLabel);
  
            container.appendChild(legendaItem);
          }
  
          function setupLegendaEvents(eventEmitter, containerId, addFunction, removeFunction) {
            eventEmitter.on('add', function () {
              toggleLegenda(containerId, true);
            });
  
            eventEmitter.on('remove', function () {
              toggleLegenda(containerId, false);
            });
          }
  
          // Legenda Waktu Tempuh Layer 1
          setupLegendaEvents(waktukawinda, 'waktu-tempuh-container', addLegendaItem, null);
  
          addLegendaItem('legenda-container', '#C2D9FF', '<= 15 Menit');
          addLegendaItem('legenda-container', '#8E8FFA', '15 - 30 Menit');
          addLegendaItem('legenda-container', '#7752FE', '30 - 45 Menit');
          addLegendaItem('legenda-container', '#1640D6', '45 - 60 Menit');
          addLegendaItem('legenda-container', '#001B79', '> 60 Menit');
  
          // Legenda Waktu Tempuh Layer 2
          setupLegendaEvents(waktudoroncanga, 'waktu-tempuh-container-layer2', addLegendaItem, null);
  
          addLegendaItem('legenda-container-layer2', '#F5CCA0', '<= 15 Menit');
          addLegendaItem('legenda-container-layer2', '#E48F45', '15 - 30 Menit');
          addLegendaItem('legenda-container-layer2', '#994D1C', '30 - 45 Menit');
          addLegendaItem('legenda-container-layer2', '#6B240C', '45 - 60 Menit');
          addLegendaItem('legenda-container-layer2', '#D80032', '> 60 Menit');
  
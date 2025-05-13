function loadEvolutionData() {
  fetch('data/evolution.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка завантаження даних');
      }
      return response.json();
    })
    .then(data => {
      evolutionData = data;
      renderEvolutionCards(evolutionData);
    })
    .catch(error => {
      console.error('Помилка завантаження еволюційних даних:', error);
    });
}

function renderEvolutionCards(data) {
  if (!evolutionList) return;
  
  evolutionList.innerHTML = '';
  
  if (data.length === 0) {
    evolutionList.innerHTML = '<div class="no-results">Нічого не знайдено</div>';
    return;
  }
  
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'evo-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-body">
        <h5>${item.title} (${item.year})</h5>
        <p>${item.description.substring(0, 100)}...</p>
        <div class="badge-container">
          <span class="evo-badge" style="background-color: ${getBadgeColor(item.platform)}">${item.platform}</span>
          <button class="view-details" data-id="${item.id}">Детальніше</button>
        </div>
      </div>
    `;
    evolutionList.appendChild(card);
  });
  
  document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      showEvolutionDetails(id);
    });
  });
}

function getBadgeColor(platform) {
  const colors = {
    'Мобільна': '#007bff',
    'Аркадна': '#ffc107',
    'Веб': '#28a745',
    'Консольна': '#dc3545',
    '3D': '#17a2b8',
    'VR': '#6c757d'
  };
  
  return colors[platform] || '#6c757d';
}

function showEvolutionDetails(id) {
  const item = evolutionData.find(item => item.id == id);
  if (!item) return;
  
  document.getElementById('modalTitle').textContent = `${item.title} (${item.year})`;
  document.getElementById('modalImage').src = item.image;
  document.getElementById('modalPlatform').textContent = item.platform;
  document.getElementById('modalPlatform').style.backgroundColor = getBadgeColor(item.platform);
  document.getElementById('modalYear').textContent = item.year;
  document.getElementById('modalDescription').textContent = item.description;
  
  const featuresList = document.getElementById('modalFeatures');
  featuresList.innerHTML = '';
  item.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });
  
  const modal = new bootstrap.Modal(document.getElementById('evolutionModal'));
  modal.show();
}
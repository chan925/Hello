const gallery = document.querySelector('.gallery');
const totalItems = 100;
const itemsPerPage = 20;
let currentPage = 0;

function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card';

  const img = document.createElement('img');
  img.loading = 'lazy';

  const name = document.createElement('div');
  name.className = 'name';

  if (i === 1 && localStorage.getItem('customImage1')) {
    img.src = localStorage.getItem('customImage1');
    name.textContent = localStorage.getItem('customName1') || `Person ${i}`;
  } else {
    img.src = `image/assets/${i}.jpg`;
    name.textContent = `Person ${i}`;
  }

  img.alt = name.textContent;

  card.appendChild(img);
  card.appendChild(name);
  return card;
}

function loadMore() {
  const start = currentPage * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems);
  for (let i = start; i <= end; i++) {
    gallery.appendChild(createCard(i));
  }
  currentPage++;
  if (currentPage * itemsPerPage >= totalItems) {
    document.getElementById('loadMoreBtn').style.display = 'none';
  }
}

function toggleTheme() {
  const root = document.documentElement;
  const isDark = getComputedStyle(root).getPropertyValue('--bg').trim() === '#ffffff';
  if (isDark) {
    root.style.setProperty('--bg', '#1b1b1b');
    root.style.setProperty('--text', '#ffffff');
    root.style.setProperty('--accent', '#33aaff');
    root.style.setProperty('--card-bg', '#2b2b2b');
  } else {
    root.style.setProperty('--bg', '#ffffff');
    root.style.setProperty('--text', '#000000');
    root.style.setProperty('--accent', '#0077ff');
    root.style.setProperty('--card-bg', '#f9f9f9');
  }
}

window.onload = loadMore;

const DEFAULT_NEWS = [
  {
    id: 'news-1',
    title: 'Nhật ký Đặng Thùy Trâm',
    summary: 'Cuốn nhật ký 35 năm lưu lạc.',
    time: '4 giờ trước',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    image: '../assets/main-2.png',
    link: '#'
  },
  {
    id: 'news-2',
    title: 'Địa đạo Củ Chi',
    summary: 'Vùng đất anh hùng',
    time: '03/3/2025',
    timestamp: new Date('2025-03-03').getTime(),
    image: '../assets/main-3.png',
    link: '#'
  },
  {
    id: 'news-3',
    title: 'Điệp viên hoàn hảo X9',
    summary: 'Phạm Xuân Ẩn',
    time: '19/1/2025',
    timestamp: new Date('2025-01-19').getTime(),
    image: '../assets/main-4.png',
    link: '#'
  },
  {
    id: 'news-4',
    title: 'Thành cổ Quảng Trị',
    summary: 'Khúc tráng ca bất tử',
    time: '03/3/2024',
    timestamp: new Date('2024-03-03').getTime(),
    image: '../assets/main-5.png',
    link: '#'
  }
];

const TEMP_IMAGE = '../assets/placeholder-image.png';

const STORAGE_KEY = 'vietnam-news-articles';

function loadNews() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading news:', error);
  }
  return DEFAULT_NEWS;
}

function saveNews(newsArray) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsArray));
    return true;
  } catch (error) {
    console.error('Error saving news:', error);
    return false;
  }
}

function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 7) {
    return `${days} ngày trước`;
  } else {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

function renderNews() {
  const newsContainer = document.querySelector('.news');
  if (!newsContainer) return;
  
  const newsItems = loadNews();
  
  const displayItems = newsItems.slice(0, 4);
  
  const existingNewsItems = newsContainer.querySelectorAll('.news-item');
  
  displayItems.forEach((item, index) => {
    let newsItemElement;
    
    if (index < existingNewsItems.length) {
      newsItemElement = existingNewsItems[index];
    } else {
      newsItemElement = document.createElement('div');
      newsItemElement.className = 'news-item';
      
      const mainItem = newsContainer.querySelector('.news-main-item');
      if (mainItem && index === 0) {
        mainItem.after(newsItemElement);
      } else if (existingNewsItems.length > 0) {
        existingNewsItems[existingNewsItems.length - 1].after(newsItemElement);
      } else {
        newsContainer.appendChild(newsItemElement);
      }
    }
    
    newsItemElement.setAttribute('data-id', item.id);
    newsItemElement.innerHTML = `
      <img src="${item.image || TEMP_IMAGE}" alt="${item.title}" onerror="this.src='${TEMP_IMAGE}'">
      <div class="news-item-content">
        <time>${formatTime(item.timestamp)}</time>
        <a href="${item.link}"><h2>${item.title}</h2></a>
        <p>${item.summary}</p>
      </div>
    `;
  });
  
  if (existingNewsItems.length > displayItems.length) {
    for (let i = displayItems.length; i < existingNewsItems.length; i++) {
      existingNewsItems[i].remove();
    }
  }
}

function addNewsArticle(title, summary, imageUrl = null, link = '#') {
  const newsArray = loadNews();
  
  const newArticle = {
    id: `news-${Date.now()}`,
    title: title,
    summary: summary,
    time: 'Vừa xong',
    timestamp: Date.now(),
    image: imageUrl || TEMP_IMAGE,
    link: link
  };
  
  newsArray.unshift(newArticle);
  
  if (saveNews(newsArray)) {
    renderNews();
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  renderNews();
});

window.newsSystem = {
  loadNews,
  saveNews,
  renderNews,
  addNewsArticle,
  formatTime
};
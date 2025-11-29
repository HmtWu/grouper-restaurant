const menuList = document.getElementById('menu-list');
const menuStatus = document.getElementById('menu-status');

async function loadMenu() {
  if (!menuList) return;
  menuStatus.textContent = '載入菜單中...';
  try {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('無法取得菜單資料');
    const data = await res.json();
    
    // 生成圖片卡片 HTML
    menuList.innerHTML = data.map(item => `
      <div class="card menu-card" style="margin-bottom: 24px;">
        <div class="menu-img-container" style="width: 100%; aspect-ratio: 16/9; overflow: hidden; border-radius: 8px; margin-bottom: 16px; background: #000;">
           <div style="width: 100%; height: 100%; background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <h3 style="margin: 0;">${item.name}</h3>
          <span style="color: #36c0ff; font-weight: bold; font-size: 1.2em;">${item.price || ''}</span>
        </div>
        <p class="muted" style="margin: 4px 0 12px; font-size: 0.9em;">${item.english}</p>
        <p style="color: #ccc; line-height: 1.6;">${item.description}</p>
      </div>
    `).join('');
    
    menuStatus.textContent = '';
  } catch (err) {
    menuStatus.textContent = err.message;
  }
}

if (menuList) loadMenu();
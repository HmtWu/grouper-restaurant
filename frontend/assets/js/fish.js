const fishGrid = document.getElementById('fish-grid');
const fishStatus = document.getElementById('fish-status');

async function loadFish() {
  fishStatus.textContent = '載入中...';
  try {
    const res = await fetch('/api/fish');
    if (!res.ok) throw new Error('無法取得魚種資料');
    const data = await res.json();
    
    // 修改處：background-size 改為 contain (完整顯示)，並加入 no-repeat (不重複)
    fishGrid.innerHTML = data.map(f => `
      <div class="fish-card" data-id="${f.id}">
        <div class="fish-img" style="background-image: url('${f.image}'); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
        <div class="fish-name">${f.name}</div>
        <div class="fish-meta">${f.taste}</div>
        <div class="fish-more">料理：${f.cooking.join(' / ')}<br>${f.description}</div>
      </div>
    `).join('');

    fishGrid.querySelectorAll('.fish-card').forEach(card => {
      card.addEventListener('click', () => card.classList.toggle('active'));
    });
    fishStatus.textContent = '';
  } catch (err) {
    fishStatus.textContent = err.message;
  }
}

if (fishGrid) loadFish();
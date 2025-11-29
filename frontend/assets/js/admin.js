const listBody = document.getElementById('admin-list');
const statusDiv = document.getElementById('admin-status');

// 載入訂位資料
async function loadReservations() {
  statusDiv.textContent = '載入中...';
  try {
    const res = await fetch('/api/reservations');
    if (!res.ok) throw new Error('無法取得資料');
    
    let data = await res.json();
    
    // 根據日期排序 (新的在上面)
    data.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));

    renderTable(data);
    statusDiv.textContent = `共 ${data.length} 筆訂位資料`;
  } catch (err) {
    statusDiv.textContent = err.message;
  }
}

// 渲染表格
function renderTable(data) {
  if (data.length === 0) {
    listBody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#999;">目前沒有訂位</td></tr>';
    return;
  }

  listBody.innerHTML = data.map(item => `
    <tr>
      <td>${item.date}</td>
      <td style="color: #36c0ff; font-weight:bold;">${item.time}</td>
      <td>${item.name}</td>
      <td>${item.people} 位</td>
      <td>${item.phone}</td>
      <td>
        <button class="btn-delete" onclick="deleteReservation(${item.id})">刪除</button>
      </td>
    </tr>
  `).join('');
}

// 刪除訂位功能
window.deleteReservation = async (id) => {
  if (!confirm('確定要刪除這筆訂位嗎？')) return;

  try {
    const res = await fetch(`/api/reservations/${id}`, { method: 'DELETE' });
    if (res.ok) {
      // 刪除成功後，重新載入列表
      loadReservations(); 
    } else {
      alert('刪除失敗');
    }
  } catch (err) {
    console.error(err);
    alert('發生錯誤');
  }
};

// 初始化
loadReservations();
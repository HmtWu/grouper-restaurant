const reserveForm = document.getElementById('reserve-form');
const reserveStatus = document.getElementById('reserve-status');
const phoneRegex = /^[0-9\-\+\(\)\s]{6,20}$/;

// 初始化表單選項與限制
function initForm() {
  // 1. 生成人數選項 (1~12人)
  const peopleSelect = document.getElementById('people-select');
  if (peopleSelect) {
    peopleSelect.innerHTML = '<option value="" disabled selected>請選擇人數</option>';
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = `${i} 位`;
      peopleSelect.appendChild(option);
    }
  }

  // 2. 生成時間選項 (11:30 ~ 20:00，每 30 分鐘一場)
  const timeSelect = document.getElementById('time-select');
  if (timeSelect) {
    timeSelect.innerHTML = '<option value="" disabled selected>請選擇時間</option>';
    const startHour = 11;
    const endHour = 20;
    
    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += 30) {
        // 跳過 11:30 之前的時間
        if (h === 11 && m < 30) continue;
        
        // 格式化時間字串 (例如 11:30)
        const timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        const option = document.createElement('option');
        option.value = timeStr;
        option.textContent = timeStr;
        timeSelect.appendChild(option);
      }
    }
  }

  // 3. 設定日期限制 (台灣時間，範圍：今天 ~ 往後 30 天)
  const dateInput = document.getElementById('date-input');
  if (dateInput) {
    // 取得台灣時間的現在時刻
    const taiwanDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
    
    // 計算最小值 (今天)
    const minStr = formatDate(taiwanDate);
    
    // 計算最大值 (往後 30 天)
    const maxDate = new Date(taiwanDate);
    maxDate.setDate(maxDate.getDate() + 30);
    const maxStr = formatDate(maxDate);

    dateInput.min = minStr;
    dateInput.max = maxStr;
  }
}

// 輔助函式：將 Date 物件轉為 YYYY-MM-DD 字串
function formatDate(dateObj) {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// 驗證日期是否為未來 (或今天)
function isFutureDate(str) {
  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  const inputDate = new Date(str);
  // 只比較日期部分，忽略時間
  today.setHours(0,0,0,0);
  inputDate.setHours(0,0,0,0);
  return inputDate >= today;
}

// 表單送出監聽
if (reserveForm) {
  // 頁面載入時初始化
  initForm();

  reserveForm.addEventListener('submit', async e => {
    e.preventDefault();
    reserveStatus.textContent = '處理中...';

    const formData = Object.fromEntries(new FormData(reserveForm).entries());
    
    // 基本驗證
    if (!formData.name) return reserveStatus.textContent = '請填寫姓名';
    if (!phoneRegex.test(formData.phone)) return reserveStatus.textContent = '電話格式不正確';
    if (!formData.people) return reserveStatus.textContent = '請選擇人數';
    if (!formData.time) return reserveStatus.textContent = '請選擇時間';
    if (!isFutureDate(formData.date)) return reserveStatus.textContent = '請選擇今天或未來的日期';

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || '送出失敗');
      
      reserveStatus.style.color = '#36c0ff';
      reserveStatus.textContent = '訂位成功！我們期待您的光臨。';
      reserveForm.reset();
      initForm();
      
      // 重置後要重新初始化選項 (雖然 select 不會跑掉，但保險起見)
      // date input 的 min/max 屬性會保留，不用擔心
    } catch (err) {
      reserveStatus.style.color = '#ff6b6b';
      reserveStatus.textContent = err.message;
    }
  });
}

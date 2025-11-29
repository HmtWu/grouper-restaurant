const JsonDb = require('../utils/jsonDb');
const db = new JsonDb('menu.json');

// 取得所有菜單
exports.getAll = (req, res) => {
  res.json(db.read());
};

// 取得單一菜單
exports.getOne = (req, res) => {
  const item = db.read().find(i => i.id == req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

// 新增菜單 (解決 Route.post 錯誤的關鍵)
exports.create = (req, res) => {
  const list = db.read();
  const item = { id: db.getNextId(list), ...req.body };
  list.push(item);
  db.write(list);
  res.json(item);
};

// 修改菜單
exports.update = (req, res) => {
  const list = db.read();
  const idx = list.findIndex(i => i.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  list[idx] = { ...list[idx], ...req.body };
  db.write(list);
  res.json(list[idx]);
};

// 刪除菜單
exports.remove = (req, res) => {
  const list = db.read().filter(i => i.id != req.params.id);
  db.write(list);
  res.json({ ok: true });
};
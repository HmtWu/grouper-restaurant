const JsonDb = require('../utils/jsonDb');
const db = new JsonDb('reservations.json');

const phoneRegex = /^[0-9\-\+\(\)\s]{6,20}$/;
const isFutureDate = str => {
  const today = new Date().toISOString().split('T')[0];
  return new Date(str) >= new Date(today);
};

exports.getAll = (req, res) => res.json(db.read());

exports.create = (req, res) => {
  const { name, phone, people, date, time, note } = req.body;
  if (!name || !phone || !phoneRegex.test(phone)) return res.status(400).json({ message: '姓名/電話格式錯誤' });
  if (!isFutureDate(date)) return res.status(400).json({ message: '日期需為未來' });
  const list = db.read();
  const item = { id: db.getNextId(list), name, phone, people: Number(people || 1), date, time, note };
  list.push(item);
  db.write(list);
  res.json({ message: '預約成功', item });
};

exports.remove = (req, res) => {
  const list = db.read().filter(i => i.id != req.params.id);
  db.write(list);
  res.json({ ok: true });
};

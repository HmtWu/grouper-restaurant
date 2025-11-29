const JsonDb = require('../utils/jsonDb');
const db = new JsonDb('fish.json');

exports.getAll = (req, res) => {
  res.json(db.read());
};

exports.getOne = (req, res) => {
  const list = db.read();
  const item = list.find(f => f.id == req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
};

exports.create = (req, res) => {
  const list = db.read();
  const item = { id: db.getNextId(list), ...req.body };
  list.push(item);
  db.write(list);
  res.json(item);
};

exports.update = (req, res) => {
  const list = db.read();
  const idx = list.findIndex(i => i.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  list[idx] = { ...list[idx], ...req.body };
  db.write(list);
  res.json(list[idx]);
};

exports.remove = (req, res) => {
  const list = db.read().filter(i => i.id != req.params.id);
  db.write(list);
  res.json({ ok: true });
};

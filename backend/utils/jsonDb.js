const fs = require('fs');
const path = require('path');

class JsonDb {
  constructor(filename) {
    this.filePath = path.join(__dirname, '..', 'data', filename);
  }

  read() {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.write([]);
        return [];
      }
      return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    } catch (error) {
      console.error(`Error reading ${this.filePath}:`, error);
      return [];
    }
  }

  write(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing to ${this.filePath}:`, error);
    }
  }

  getNextId(list) {
    if (!list || list.length === 0) return 1;
    return Math.max(...list.map(item => item.id || 0)) + 1;
  }
}

module.exports = JsonDb;

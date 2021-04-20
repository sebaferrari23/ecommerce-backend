const fs = require('fs');

const fsUtils = {
  readFile: async (file) => {
    try {
      return await fs.promises.readFile(file, 'utf-8');
    } catch (err) {
      throw err;
    }
  },
  writeFile: async (file, data) => {
    try {
      await fs.promises.writeFile(file, data);
    } catch (err) {
      throw err;
    }
  },
}

module.exports = fsUtils;
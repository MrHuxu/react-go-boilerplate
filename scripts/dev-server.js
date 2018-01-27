const { exec } = require('child_process');

const dashboard = require('./dashboard');

dashboard.key(['C-c'], function (ch, key) {
  dashboard.destroy();
  console.log('\x1Bc');
  return process.exit(0);
});

dashboard.render();

const PORT = 8283;
const URL = `http://localhost:${PORT}`;

switch (process.platform) {
case 'darwin':
  exec(`open ${URL}`);
  break;

case 'win32':
  exec(`start ${URL}`);
  break;

default:
  exec(`xdg-open ${URL}`);
}

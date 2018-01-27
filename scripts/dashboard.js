const { screen } = require('blessed');
const XTerm = require('blessed-xterm');

const { floor, max } = Math;

const dashboard = screen({
  smartCSR : true,
  title    : 'React & Go Boilerplate Dashboard'
});

const commands = [{
  label   : 'Webpack Dev Server',
  command : ['npm', ['run', 'webpack-dev-server']],
  style   : {
    width  : floor(dashboard.width / 2),
    height : floor(dashboard.height / 2)
  }
}, {
  label   : 'ESLint',
  command : ['npm', ['run', 'lint-watch']],
  style   : {
    top    : floor(dashboard.height / 2),
    width  : floor(dashboard.width / 2),
    height : floor(dashboard.height / 2)
  }
}, {
  label   : 'Go Server',
  command : ['npm', ['run', 'dev-server']],
  style   : {
    left   : floor(dashboard.width / 2),
    width  : floor(dashboard.width / 2),
    height : floor(dashboard.height / 2) * 2
  }
}];

const XTermOpts = {
  cursorType : 'block',
  border     : 'line',
  scrollable : true,
  scrollback : 100000,
  style      : {
    fg        : 'default',
    bg        : 'default',
    border    : { fg: '#EA4C89' },
    hover     : { border: { fg: 'green' } },
    focus     : { border: { fg: 'blue' } },
    scrolling : { border: { fg: 'blue' } }
  }
};

for (const command of commands) {
  const panel = new XTerm({ ...XTermOpts, label: command.label, ...command.style });
  panel.spawn(...command.command);

  panel.on('mouse', function (data) {
    if ('wheelup' === data.action) {
      panel.scroll(-max(1, floor(panel.height * 0.10)));
    } else if ('wheeldown' === data.action) {
      panel.scroll(max(1, floor(panel.height * 0.10)));
    }
  });
  dashboard.append(panel);
}

dashboard.key(['C-c'], function (ch, key) {
  dashboard.destroy();
  console.log('\x1Bc');
  return process.exit(0);
});

dashboard.render();

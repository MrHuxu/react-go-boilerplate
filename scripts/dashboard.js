const { screen } = require('blessed');
const XTerm = require('blessed-xterm');

const { floor } = Math;

const app = screen({
  smartCSR : true,
  title    : 'Popola Dashboard'
});

const commands = [{
  label   : 'Webpack Dev Server',
  command : ['npm', ['run', 'webpack-dev-server']],
  style   : {
    width  : floor(app.width / 2),
    height : floor(app.height / 2)
  }
}, {
  label   : 'ESLint',
  command : ['npm', ['run', 'lint-watch']],
  style   : {
    top    : floor(app.height / 2),
    width  : floor(app.width / 2),
    height : floor(app.height / 2)
  }
}, {
  label   : 'Go Server',
  command : ['npm', ['run', 'dev-server']],
  style   : {
    left   : floor(app.width / 2),
    width  : floor(app.width / 2),
    height : floor(app.height / 2) * 2
  }
}];

const XTermOpts = {
  cursorType : 'block',
  border     : 'line',
  scrollable : true,
  scrollback : 1000,
  style      : {
    fg        : 'default',
    bg        : 'default',
    border    : { fg: 'default' },
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
      let n = Math.max(1, Math.floor(panel.height * 0.10));
      panel.scroll(-n);
    } else if ('wheeldown' === data.action) {
      let n = Math.max(1, Math.floor(panel.height * 0.10));
      panel.scroll(+n);
    }
  });
  app.append(panel);
}

app.key(['C-c'], function (ch, key) {
  app.destroy();
  console.log('\x1Bc');
  return process.exit(0);
});

app.render();

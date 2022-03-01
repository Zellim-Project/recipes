var _path = _intereopRequireDefault(require('path'));

function _intereopRequireDefault(obj) { return obj && obj._esModule ? obj : { default: obj }; }

module.exports = Ferdi => {
  const getMessages = () => {
    const unread = document.querySelector("[data-service-notification-count=chat]")?.textContent?.trim() || '0';
    Ferdi.setBadge(Ferdi.safeParseInt(unread));
  };

  Ferdi.loop(getMessages);
  Ferdi.injectJSUnsafe(_path.default.join(__dirname, 'zellim-bridge.js'));
};

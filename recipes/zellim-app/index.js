module.exports = Ferdi =>
  class ZellimApp extends Ferdi {
    overrideUserAgent() {
      return window.navigator.userAgent
        .replace(/(Ferdi|Electron)\/\S+ \([^)]+\)/g, '')
        .trim();
    }

    modifyRequestHeaders() {
      return [
        {
          headers: {
            'user-agent': window.navigator.userAgent
              .replace(/(Ferdi|Electron)\/\S+ \([^)]+\)/g, '')
              .trim(),
          },
          requestFilters: {
            urls: ['*://*/*'],
          },
        },
      ];
    }
  };

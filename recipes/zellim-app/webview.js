module.exports = Ferdi => {
  const getMessages = () => {
    const unread = document.querySelector("[data-service-notification-count=general]")?.textContent?.trim() || '0';
    Ferdi.setBadge(Ferdi.safeParseInt(unread));
  };

  Ferdi.loop(getMessages);
};
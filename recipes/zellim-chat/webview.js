module.exports = Ferdi => {
  const getMessages = () => {
    const unread = document.querySelector(".chat-header [data-testid='recents-tab'] > div")?.textContent?.trim() || '0';
    Ferdi.setBadge(Ferdi.safeParseInt(unread));
  };

  Ferdi.loop(getMessages);
};

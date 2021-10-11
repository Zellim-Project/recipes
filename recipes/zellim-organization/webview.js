module.exports = Ferdi => {
  const getMessages = () => {
    const unread = document.querySelector(".notifications-list > [group='general'] > .badge,.badge-pill")?.textContent?.trim() || '0';
    Ferdi.setBadge(Ferdi.safeParseInt(unread));
  };

  Ferdi.loop(getMessages);
};

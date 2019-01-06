export default (loggedInUsername, questionAuthor) => {
  const isOwner = loggedInUsername === questionAuthor ? 'owner' : 'not owner';
  return isOwner;
};

const LOCAL_STORAGE_KEY = "loggedUser.data";

function storeLoggedUser(user) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
}

function getLoggedUser() {
  const userDataJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (userDataJSON) {
    return JSON.parse(userDataJSON);
  } else {
    return null;
  }
}

function removeLoggedUser() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export { storeLoggedUser, getLoggedUser, removeLoggedUser };

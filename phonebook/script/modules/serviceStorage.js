const getStorage = (key) =>
  (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);

const setStorage = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

const removeStorage = (index, phone) => {
  const data = getStorage('persons');
  if (data[index].phone === phone) {
    data.splice(index, 1);
  }
  setStorage('persons', data);
};

const addContactData = (contact) => {
  const data = getStorage('persons');
  data.push(contact);
  setStorage('persons', data);
};

// localStorage.clear();
export default {
  getStorage,
  removeStorage,
  addContactData,
};

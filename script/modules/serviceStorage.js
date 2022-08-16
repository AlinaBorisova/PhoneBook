export const getStorage = function(keyItem) {
  if (localStorage.getItem('data')) {
    return JSON.parse(localStorage.getItem(keyItem));
  } else return [];
};

const setStorage = function(person, obj) {
  getStorage('data');
  obj.push(person);
  localStorage.setItem('data', JSON.stringify(obj));
};

export const removeStorage = function(phone) {
  let items = JSON.parse(localStorage.getItem('data'));
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === Number(phone.id)) items.splice(i, 1);
    };
  localStorage.setItem('data', JSON.stringify(items));
};

export default setStorage;

import {getStorage} from './modules/serviceStorage.js';

import {renderPhoneBook as renderContactPhoneBook} from './modules/render.js';

import renderContacts from './modules/render.js';

import {
  modalControl,
  deleteControl,
  formControl,
} from './modules/control.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    let data = getStorage('data');

    const {
      list, 
      btnAdd, 
      formOverlay,
      form, 
      btnDel,
    } = renderContactPhoneBook(app, title);

    renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

  };

  window.phoneBookInit = init;
}

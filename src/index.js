
import {getStorage} from './script/serviceStorage';

import {renderPhoneBook as renderContactPhoneBook} from './script/render';

import renderContacts from './script/render';

import {
  modalControl,
  deleteControl,
  formControl,
} from './script/control';

import './scss/index.scss';

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

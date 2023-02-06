import {removeStorage} from './serviceStorage';

import {createRow} from './createElements';

export const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };
    
  btnAdd.addEventListener('click', openModal);

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay ||
        target.closest('.close')) {
      closeModal();
    };
  });
    
  const btnClose = document.querySelector('.close');
    btnClose.addEventListener('click', closeModal);

  return {
    closeModal,
  }; 
};

export const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    let phone = e.target.closest('tr').querySelector('td:nth-child(4)');
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        removeStorage(phone);
      };
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

export const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);

    form.reset();
    closeModal();
    })
};

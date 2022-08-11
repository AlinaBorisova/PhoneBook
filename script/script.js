'use strict';

let data = [];
{
  const getStorage = function(keyItem) {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem(keyItem));
    } else return [];
  };
  const setStorage = function(person, obj) {
    getStorage('data');
    obj.push(person);
    localStorage.setItem('data', JSON.stringify(obj));
  };

  const removeStorage = function(phone) {
    let items = JSON.parse(localStorage.getItem('data'));
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === Number(phone.id)) items.splice(i, 1);
       }
  localStorage.setItem('data', JSON.stringify(items));
}

  // const addContactData = contact => {
  //   data.push(contact);
  // }
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();

    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonGroup = params => {
    const btnWtapper = document.createElement('div');
    btnWtapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });
    btnWtapper.append(...btns);

    return {
      btnWtapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="firstName">Имя</th>
        <th class="surName">Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" 
          id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" 
          id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" 
          id="phone" type="number" required>
      </div>
    `)
    
    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);

    overlay.append(form);

    return {
      overlay,
      form,
    }
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWtapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay,
      form,
    }
  };

  const createRow = ({name: firstName, surname, phone}) => {

    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.setAttribute('id', (data.length + 1));
    tdPhone.append(phoneLink);


    const tdEdit = document.createElement('td');
    const buttotEdit = document.createElement('button')
    buttotEdit.classList.add('edit-icon');
    tdEdit.append(buttotEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    
    setStorage({
      id: data.length + 1,
      name: firstName,
      surname: surname,
      phone: phone,
    }, data);
  
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);

    return allRow;
  };

  const createFooter = title => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.textContent = `Все права защищены ${title}`

    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;

    return footer;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      })
    })
  };

  const modalControl = (btnAdd, formOverlay) => {
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

  const deleteControl = (btnDel, list) => {
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

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      //addContactData(newContact);

      form.reset();
      closeModal();
    })
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    let data = getStorage('data');

    const {
      list, 
      logo, 
      btnAdd, 
      formOverlay,
      form, 
      btnDel,
    } = renderPhoneBook(app, title);

    //Здесь будет Функционал для следующих уроков
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

  };

  window.phoneBookInit = init;
}
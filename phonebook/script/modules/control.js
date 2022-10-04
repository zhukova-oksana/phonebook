import create from './createElements.js';
import * as render from './render.js';
import storage from './serviceStorage.js';

const {
  createRow,
} = create;

const {
  getStorage,
  removeStorage,
  addContactData,
} = storage;

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

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
    if (target.closest('.del-icon')) {
      const phone = target.closest('.contact').childNodes[3].textContent;
      const ind = target.closest('.contact').getAttribute('data-id');
      removeStorage(ind, phone);
      list.textContent = '';
      const data = getStorage('persons');
      render.renderContacts(list, data);
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.add('is-visible');
      });
    }
  });
};

const addContactPage = (contact, list, index) => {
  list.append(createRow(contact, index));
};

const formControl = (form, list, closeModal, index) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);

    index = Number(list.childNodes.length);
    addContactPage(newContact, list, index);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  formControl,
};

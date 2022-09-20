'use strict';

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
  }
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
      const index = target.closest('.contact').getAttribute('data-id');
      removeStorage(index, phone);
      target.closest('.contact').remove();
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
}

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    const key = 'persons';

    addContactPage(newContact, list);
    addContactData(newContact);

    form.reset();
    closeModal();
  });
}

module.exports {
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};

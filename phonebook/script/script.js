import control from './modules/control.js';
import {renderPhoneBook, renderContacts} from './modules/render.js';
import storage from './modules/serviceStorage.js';
import * as visual from './modules/visual.js';

const {
  modalControl,
  deleteControl,
  formControl,
} = control;

const {
  getStorage,
} = storage;

{

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = renderPhoneBook(app, title);

    // Функционал
    const {closeModal} = modalControl(btnAdd, formOverlay);
    const data = getStorage('persons');
    const index = data.length;

    const allRow = renderContacts(list, data);

    visual.hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    visual.sortTh(list);


    formControl(form, list, closeModal, index);
  };

  window.phoneBookInit = init;
}

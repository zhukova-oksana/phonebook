export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;

  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export const sortTh = (list) => {
  const thead = document.querySelector('.table thead');
  const sortTable = (colNum, type) => {
    const rowsArray = Array.from(list.rows);
    let compare;

    if (type === 'name') {
      compare = (rowA, rowB) =>
        (rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1);
    }

    rowsArray.sort(compare);
    list.append(...rowsArray);
  };

  thead.addEventListener('click', e => {
    if (e.target.tagName !== 'TH') return;

    const th = e.target;
    sortTable(th.cellIndex, th.dataset.type);
  });
};

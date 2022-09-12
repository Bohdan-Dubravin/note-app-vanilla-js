const sum = document.querySelector('.summary');

const initNotes = (notes, HTMLelement) => {
  if (!notes) return;
  HTMLelement.innerHTML = '';
  for (const note of notes) {
    HTMLelement.insertAdjacentHTML(
      'beforeend',
      `
        <li data-id="${note.id}" class="notes-item grid-table">
            <p class="note-content">${note.name}</p>
            <p class="note-content">${note.creationDate}</p>
            <p class="note-content">${note.category}</p>
            <p class="note-content">${note.content}</p>
            <p class="note-content">${note.dates}</p>
            <div class="note-content">
              <button 
               
              id=${note.id} 
              class="edit-note"
              >
                Edit
              </button>
              <button  class="delete-note">
                Delete
            </button>
            <button  class="${
              !note.archive ? 'archive-note' : 'unarchive-note'
            }">
                ${!note.archive ? 'Archive' : 'Unarchive'}
            </button>
            </div>
          </li>`
    );
  }
};

const updateSummary = (arr) => {
  const summary = arr.reduce((acc, note) => {
    if (!acc[note.category]) {
      return {
        ...acc,
        [note.category]: {
          archived: note.archive ? 1 : 0,
          active: !note.archive ? 1 : 0,
        },
      };
    } else {
      const isActive = note.archive ? 'archived' : 'active';
      return {
        ...acc,
        [note.category]: {
          ...acc[note.category],
          [isActive]: acc[note.category][isActive] + 1,
        },
      };
    }
  }, {});

  sum.innerHTML = '';
  for (const category in summary) {
    sum.insertAdjacentHTML(
      'beforeend',
      `
        <div>${category} Active${summary[category].active}  Archived${summary[category].archived}</div>`
    );
  }
};

export { initNotes, updateSummary };

import { summary } from './utils.js';

const sum = document.querySelector('.summary-table');

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
              <div 
              class="img-container"
              id=${note.id} 
              >
              <img class="edit-note image-icon" src="./assets/edit-icon.svg" alt="edit-icon">
              </div>
              <div class="img-container">
              <img class="delete-note image-icon" src="./assets/delete-icon.svg" alt="delete-icon">
            </div>
            <div class="img-container">
               <img 
                src="./assets/archive-icon.svg" 
                class="image-icon ${
                  !note.archive ? 'archive-note' : 'unarchive-note '
                }" 
                alt="archive-icon"
               >
            </div>
            </div>
          </li>`
    );
  }
};

const updateSummary = (arr) => {
  const summaryTasks = summary(arr);

  sum.innerHTML = '';
  for (const category in summaryTasks) {
    sum.insertAdjacentHTML(
      'beforeend',
      `
        <tr>
        <td>${category}</td>
        <td>${summaryTasks[category].active}</td>
        <td>${summaryTasks[category].archived}</td>
        </tr>`
    );
  }
};

export { initNotes, updateSummary };

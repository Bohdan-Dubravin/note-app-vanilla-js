const root = document.querySelector('.container');
const notesList = root.querySelector('.notes-list');
const addButton = root.querySelector('.create-List-btn');
const form = root.querySelector('.add-note-container');
const closeBtn = root.querySelector('.close-btn');
const nameInput = root.querySelector('.input-name');
const contentInput = root.querySelector('.input-content');
const createNoteBtn = root.querySelector('.create-button');
const editNoteBtn = root.querySelector('.edit-note');
const deleteNoteBtn = root.querySelector('.delete-note');

const listOfNotes = [];

const renderNotes = () => {
  for (const note of listOfNotes) {
    notesList.insertAdjacentHTML(
      'beforeend',
      `
      <li class="grid-table">
          <p class="note-content">${note.name}</p>
          <p class="note-content">${note.creationDate}</p>
          <p class="note-content">category</p>
          <p class="note-content">${note.content}</p>
          <p class="note-content">${note.dates}</p>
          <div class="note-content">
            <button id=${note.id} class="edit-note">
              Edit
            </button>
            <button id=${note.id}  class="delete-note">
            Delete
          </button>
          </div>
        </li>`
    );
  }
};

const toggleForm = () => {
  form.classList.toggle('display-none');
};

const getFullDate = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' }),
    day = today.getDate(),
    year = today.getFullYear();

  return `${month} ${day}, ${year}`;
};

const findDates = (str) => {
  const dates = str.match(
    /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/g
  );
  console.log(dates);
  return dates;
};

const deleteNote = (id) => {
  listOfNotes.filter((note) => note.id !== id);
  renderNotes();
};

const editNote = (id) => {
  const note = listOfNotes.find((note) => note.id === id);
  nameInput.value = note.title;
  contentInput.value = note.content;
  toggleForm();
};

deleteNoteBtn.addEventListener('click', (e) => deleteNote(e.target.id));

const addNewNote = () => {
  const title = nameInput.value;
  const text = contentInput.value;
  const date = getFullDate();
  const datesInText = findDates(text);
  const id = Math.random();
  const noteTemplate = {
    id: id,
    name: title,
    creationDate: date,
    category: '',
    content: text,
    dates: datesInText || '',
  };

  listOfNotes.push(noteTemplate);
  renderNotes();
  toggleForm();
  nameInput.value = '';
  contentInput.value = '';
};

addButton.addEventListener('click', toggleForm);
closeBtn.addEventListener('click', toggleForm);
createNoteBtn.addEventListener('click', addNewNote);

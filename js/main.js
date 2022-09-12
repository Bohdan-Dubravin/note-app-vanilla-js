import { initNotes, updateSummary } from './render.js';
import { notes, archiveNotes } from './data.js';
const root = document.querySelector('.container');

const addNoteBtn = root.querySelector('.add-note-btn'),
  popupBox = document.querySelector('.popup-box'),
  categoryInput = popupBox.querySelector('.select-option'),
  closeBtn = popupBox.querySelector('.close-btn'),
  titleInput = popupBox.querySelector('.input-name'),
  contentInput = popupBox.querySelector('.input-content'),
  createBtn = popupBox.querySelector('.create-button'),
  archiveBtn = root.querySelector('.archive-note'),
  showArchiveBtn = root.querySelector('.archive-button'),
  archiveList = root.querySelector('.archive-list'),
  notesList = root.querySelector('.notes-list');

let notesArr = [...notes];
let archiveNotesArr = [...archiveNotes];

let isUpdate = false,
  updateId;

updateSummary([...notesArr, ...archiveNotesArr]);

addNoteBtn.addEventListener('click', () => {
  popupBox.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  isUpdate = false;
  popupBox.classList.toggle('show');
});

showArchiveBtn.addEventListener('click', () => {
  archiveList.classList.toggle('display');
  initNotes(archiveNotesArr, archiveList);
});

const unarchiveNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const unarchiveNote = archiveNotesArr.find((note) => note.id === noteId);
  unarchiveNote.archive = false;
  archiveNotesArr = archiveNotesArr.filter((note) => note.id !== noteId);
  notesArr.push(unarchiveNote);
  initNotes(notesArr, notesList);
  initNotes(archiveNotesArr, archiveList);
  updateSummary([...notesArr, ...archiveNotesArr]);
};

const archiveNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const noteToArchive = notesArr.find((note) => note.id === noteId);
  noteToArchive.archive = true;
  notesArr = notesArr.filter((note) => note.id !== noteId);
  archiveNotesArr.push(noteToArchive);
  initNotes(notesArr, notesList);
  initNotes(archiveNotesArr, archiveList);
  updateSummary([...notesArr, ...archiveNotesArr]);
};

initNotes(notesArr, notesList);

notesList.addEventListener('click', (e) => noteOperations(e));
archiveList.addEventListener('click', (e) => noteOperations(e));

const noteOperations = (e) => {
  if (e.target.matches('.delete-note')) {
    deleteNote(e);
  } else if (e.target.matches('.edit-note')) {
    updateNote(e);
  } else if (e.target.matches('.archive-note')) {
    archiveNote(e);
  } else if (e.target.matches('.unarchive-note')) {
    unarchiveNote(e);
  }
};

const deleteNote = (e) => {
  const item = e.target.closest('.notes-item');
  notesArr = notesArr.filter((note) => +item.dataset.id !== note.id);

  initNotes(notesArr, notesList);
  updateSummary([...notesArr, ...archiveNotesArr]);
};

const updateNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const note = notesArr.find((note) => note.id === noteId);
  updateId = noteId;
  isUpdate = true;
  titleInput.value = note.name;
  contentInput.value = note.content;
  categoryInput.value = note.category;
  createBtn.innerText = 'Update Note';
  addNoteBtn.click();
  // initNotes(notesArr, notesList);
};
const openForm = () => {
  const title = titleInput.value.trim(),
    description = contentInput.value.trim(),
    category = categoryInput.value;
  if (title && description && category) {
    const noteInfo = {
      name: title,
      category: category,
      content: description,
    };

    createNote(noteInfo);
    initNotes(notesArr, notesList);
    closeBtn.click();
  }
};

createBtn.addEventListener('click', openForm);

const createNote = (userInput) => {
  const id = +new Date();
  const creationDate = getFullDate();
  const dates = findDates(userInput.content) || '';
  const archive = false;
  const newNote = { ...userInput, dates, creationDate, id, archive };

  if (!isUpdate) {
    notesArr.push(newNote);
  } else {
    isUpdate = false;
    notesArr = notesArr.map((note) => {
      if (note.id === updateId) {
        return {
          ...newNote,
        };
      } else {
        return note;
      }
    });
  }
  updateSummary([...notesArr, ...archiveNotesArr]);
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
  return dates;
};

import { initNotes, updateSummary } from './render.js';
import { data } from './data.js';
import { getActive, getArchived, getFullDate, findDates } from './utils.js';
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
  notesList = root.querySelector('.notes-list'),
  errorText = root.querySelector('.error');

let allNotes = [...data];
let activeNotesArr = getActive(allNotes);
let archiveNotesArr = getArchived(allNotes);
let isUpdate = false,
  updateId;

updateSummary([...activeNotesArr, ...archiveNotesArr]);
initNotes(activeNotesArr, notesList);

notesList.addEventListener('click', (e) => noteOperations(e));
archiveList.addEventListener('click', (e) => noteOperations(e));

addNoteBtn.addEventListener('click', () => {
  popupBox.classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  isUpdate = false;
  popupBox.classList.toggle('show');
  errorText.innerHTML = '';
});

showArchiveBtn.addEventListener('click', () => {
  archiveList.classList.toggle('display');
  initNotes(archiveNotesArr, archiveList);
});

const updateInfo = () => {
  activeNotesArr = getActive(allNotes);
  archiveNotesArr = getArchived(allNotes);
  initNotes(activeNotesArr, notesList);
  initNotes(archiveNotesArr, archiveList);
  updateSummary([...activeNotesArr, ...archiveNotesArr]);
};

const unarchiveNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const unarchiveNote = archiveNotesArr.find((note) => note.id === noteId);
  unarchiveNote.archive = false;
  archiveNotesArr = archiveNotesArr.filter((note) => note.id !== noteId);
  activeNotesArr.push(unarchiveNote);

  updateInfo();
};

const archiveNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const noteToArchive = activeNotesArr.find((note) => note.id === noteId);
  noteToArchive.archive = true;
  activeNotesArr = activeNotesArr.filter((note) => note.id !== noteId);
  archiveNotesArr.push(noteToArchive);
  updateInfo();
};

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
  allNotes = allNotes.filter((note) => +item.dataset.id !== note.id);
  updateInfo();
};

const updateNote = (e) => {
  const noteId = +e.target.closest('.notes-item').dataset.id;
  const note = allNotes.find((note) => note.id === noteId);
  updateId = noteId;
  isUpdate = true;
  titleInput.value = note.name;
  contentInput.value = note.content;
  categoryInput.value = note.category;
  createBtn.innerText = 'Update Note';
  addNoteBtn.click();
};

const sendForm = () => {
  const title = titleInput.value.trim(),
    description = contentInput.value.trim(),
    category = categoryInput.value;

  try {
    if (!title || !description || !category) {
      throw Error('FILL IN ALL THE FIELDS');
    }
    const noteInfo = {
      name: title,
      category: category,
      content: description,
    };

    createNote(noteInfo);
    closeBtn.click();
    errorText.innerHTML = '';
    titleInput.value = '';
    contentInput.value = '';
    categoryInput.value = '';
  } catch (error) {
    errorText.innerHTML = error;
  }
};

createBtn.addEventListener('click', sendForm);

const createNote = (userInput) => {
  const id = +new Date();
  const creationDate = getFullDate();
  const dates = findDates(userInput.content) || '';
  const archive = false;
  if (isUpdate) {
  }
  const newNote = { ...userInput, dates, creationDate, id, archive };

  if (!isUpdate) {
    allNotes.push(newNote);
  } else {
    isUpdate = false;
    allNotes = allNotes.map((note) => {
      if (note.id === updateId) {
        const { name, category, content, dates } = newNote;
        return {
          ...note,
          name,
          category,
          content,
          dates,
        };
      } else {
        return note;
      }
    });
  }
  updateInfo();
};

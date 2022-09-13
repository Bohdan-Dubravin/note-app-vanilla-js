export const getActive = (arr) => {
  return arr.filter((note) => note.archive === false);
};

export const getArchived = (arr) => {
  return arr.filter((note) => note.archive === true);
};

export const getFullDate = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' }),
    day = today.getDate(),
    year = today.getFullYear();

  return `${month} ${day}, ${year}`;
};

export const findDates = (str) => {
  const dates = str.match(
    /(0\d{1}|1[0-2])\/([0-2]\d{1}|3[0-1])\/(19|20)\d{2}/g
  );
  return dates;
};

export const summary = (arr) => {
  return arr.reduce((acc, note) => {
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
};

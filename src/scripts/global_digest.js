const R = require('ramda');
const path = require('path');
const fs = require('fs');

const sanitize = R.curry((defaultValue, givenValue) => (givenValue == null ? defaultValue : givenValue));
const safeBlank = sanitize('');
const safeZeroString = sanitize('0');
const safeZeroInt = sanitize(0);
const safeArray = sanitize([]);
const safeFalse = sanitize(false);
const safeObject = sanitize({});

const entryType = (type) => {
  switch (type) {
    case 'table': return 'table';
    case 'item':
    case 'entries': return 'text';
    case 'list': return 'list';
    default: return 'irrelevant';
  }
};

const entrySanitizer = (text) => {
  const directives = R.match(/{@(.*?)\s(.*?)}/g, String(safeBlank(text)));
  const replaceables = R.reduce((acc, con) => {
    const textFinder = R.pipe(R.split(' '), R.tail, R.map(R.replace(/}/g, '')), R.join(' '), R.split('|'), R.head);
    return R.append({
      match: con,
      text: textFinder(con),
    }, acc);
  }, [], directives);
  return R.reduce((acc, con) => R.replace(con.match, con.text, acc), text, replaceables);
};

const colLabelFormatter = (colLabels) => {
  const safeColLabels = safeBlank(colLabels);
  const sanitizedColLabels = R.map(entrySanitizer, safeColLabels);
  if (R.isEmpty(sanitizedColLabels)) {
    return sanitizedColLabels;
  }
  return [sanitizedColLabels];
};

const rowFormatter = rows => R.map(row => R.map((cell) => {
  if (typeof cell === 'object') {
    if (safeBlank(cell.entry) !== '') return entrySanitizer(safeBlank(cell.entry));
    return `${safeZeroInt(safeObject(cell.roll).min)} \u2014 ${safeZeroInt(safeObject(cell.roll).max)}`;
  }
  return entrySanitizer(safeBlank(cell));
}, row), rows);
const safeRowFormatter = rows => rowFormatter(safeArray(rows));

const removeBadItems = (entries) => {
  if (typeof entries === 'string') return entries;
  const fixedItems = R.filter(entry => safeBlank(entry.type) !== 'irrelevant', entries);
  if (typeof R.head(safeArray(fixedItems.entry)) === 'string') return fixedItems;
  return R.map(item => (typeof R.head(safeArray(item.entry)) === 'string' ? item : R.assoc('entry', removeBadItems(safeArray(item.entry)), item)), fixedItems);
};

const entrySmoother = (entry) => {
  if (typeof entry === 'object') {
    return {
      type: entryType(safeBlank(entry.type)),
      header: safeBlank(entry.name),
      entry: R.map(entrySmoother, safeArray(entry.entries)),
      rows: R.concat(colLabelFormatter(entry.colLabels), safeRowFormatter(entry.rows)),
      items: R.map(entrySmoother, safeArray(entry.items)),
    };
  }
  return {
    type: 'text',
    header: '',
    entry: [entrySanitizer(entry)],
    rows: [],
    items: [],
  };
};

const fileWriter = R.curry((directory, item) => {
  const fileName = `${R.replace(/[\/'\s]+/g, '_', String(item.name)).toLowerCase()}.json`;
  const filePath = path.join(directory, fileName);
  fs.writeFileSync(filePath, JSON.stringify(item));
});

export {
  entrySmoother,
  removeBadItems,
  fileWriter,
  safeArray,
  safeBlank,
  safeFalse,
  safeObject,
  safeZeroInt,
  safeZeroString,
};

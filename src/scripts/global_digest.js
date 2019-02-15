const R = require('ramda');


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
  const directives = R.match(/{@(.*?)\s(.*?)}/g, text);
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
  const safeColLabels = safeArray(colLabels);
  const sanitizedColLabels = R.map(entrySanitizer, safeColLabels);
  if (R.isEmpty(sanitizedColLabels)) {
    return sanitizedColLabels;
  }
  return [sanitizedColLabels];
};

const rowFormatter = rows => R.map(row => R.map((cell) => {
  if (typeof cell === 'object') {
    return entrySanitizer(safeBlank(cell.entry));
  }
  return safeBlank(cell);
}, row), rows);
const safeRowFormatter = rows => rowFormatter(safeArray(rows));

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

export {
  entrySmoother,
  safeArray,
  safeBlank,
  safeFalse,
  safeObject,
  safeZeroInt,
  safeZeroString,
};

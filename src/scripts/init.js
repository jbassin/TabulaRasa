const fs = require('fs');
const path = require('path');
const os = require('os');
const R = require('ramda');

module.exports = (DEBUG) => {
  const HOME_DIR = os.homedir();
  const MAIN_DIR = path.join(HOME_DIR, '.tabularasa');
  const DATA_DIR = path.join(MAIN_DIR, 'data');
  const dataFile = newDir => path.join(DATA_DIR, newDir);

  const print = R.curry((debug, item) => {
    if (debug) {
      console.log(item);
    }
    return item;
  })(DEBUG);

  const exists = filePath => fs.existsSync(filePath);
  const notExists = filePath => R.not(exists(filePath));

  print(MAIN_DIR);
  if (notExists(MAIN_DIR)) {
    print('Can\'t find local folder, creating one!');
    fs.mkdirSync(MAIN_DIR);
  }

  print(DATA_DIR);
  if (notExists(DATA_DIR)) {
    print('Can\'t find the data folder, creating one!');
    fs.mkdirSync(DATA_DIR);
  }

  const readAllFiles = R.curry((f, acc, con) => {
    const file = fs.readFileSync(f(con), 'utf-8');
    const classJson = JSON.parse(file);
    return R.append(classJson, acc);
  });

  const readAllJSON = (dirName) => {
    const filePathFactory = filePath => path.join(dataFile(dirName), filePath);
    const filePathFinder = fs.readdirSync(dataFile(dirName));
    const readFiles = readAllFiles(filePathFactory);
    const items = R.reduce(readFiles, [], filePathFinder);
    return print(items);
  };

  const classes = readAllJSON('classes');
  const subclasses = readAllJSON('subclasses');
  const items = readAllJSON('items');
  const spells = readAllJSON('spells');

  return {
    classes,
    subclasses,
    items,
    spells,
  };
};

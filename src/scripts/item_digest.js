const fs = require('fs');
const path = require('path');
const os = require('os');
const R = require('ramda');

const HOME_DIR = os.homedir();
const MAIN_DIR = path.join(HOME_DIR, '.tabularasa');
const DATA_DIR = path.join(MAIN_DIR, 'data');
const ITEM_DIR = path.join(DATA_DIR, 'items');

const file = fs.readFileSync(path.join(DATA_DIR, 'items.json'), 'utf-8');

const sanitize = R.curry((givenValue, defaultValue) => (givenValue === null ? defaultValue : givenValue));
const blankS = sanitize(R.__, '');
const zeroS = sanitize(R.__, '0');
const arrayS = sanitize(R.__, []);

const weaponType = (type) => {
  const typesafeType = type.toUpperCase();
  switch (typesafeType) {
    case 'S': return 'Slashing';
    case 'P': return 'Piercing';
    case 'B': return 'Bludgeoning';
    case 'R': return 'Ranged';
    default: return 'Unknown';
  }
};
const safeWeaponType = type => blankS(weaponType(type));

const properties = propertyArray => R.reduce((acc, con) => {
  const typesafeProperty = con.toUpperCase();
  switch (typesafeProperty) {
    case '2H': return R.append('Two-Handed', acc);
    case 'A': return R.append('Ammunition', acc);
    case 'AF': return R.append('Ammunition (Firearm)', acc);
    case 'BF': return R.append('Burst Fire', acc);
    case 'F': return R.append('Finesse', acc);
    case 'H': return R.append('Heavy', acc);
    case 'L': return R.append('Light', acc);
    case 'LD': return R.append('Loading', acc);
    case 'R': return R.append('Reach', acc);
    case 'RLD': return R.append('Reload', acc);
    case 'S': return R.append('Special', acc);
    case 'T': return R.append('Thrown', acc);
    case 'V': return R.append('Versatile', acc);
    default: return R.append('Unknown', acc);
  }
}, [], propertyArray);
const safeWeaponProperties = props => arrayS(properties(props));

const weaponFormat = item => ({
  isWeapon: blankS(item.dmg1) !== '',
  damageType: safeWeaponType(item.dmgType),
  baseDamage: blankS(item.dmg1),
  twoHandedDamage: blankS(item.dmg2),
  properties: safeWeaponProperties(item.properties),
  technology: blankS(item.technology),
});

const itemFormat = item => ({
  name: blankS(item.name),
  rarity: blankS(item.rarity),
  type: blankS(item.type),
  weight: zeroS(item.weight),
  value: zeroS(item.value),
  weapon: weaponFormat(item),
});

import {
  entrySmoother,
  removeBadItems,
  fileWriter,
  safeArray,
  safeBlank,
  safeFalse,
  safeObject,
  safeZeroInt,
  safeZeroString,
} from './global_digest';

const fs = require('fs');
const path = require('path');
const os = require('os');
const R = require('ramda');

const HOME_DIR = os.homedir();
const MAIN_DIR = path.join(HOME_DIR, '.tabularasa');
const DATA_DIR = path.join(MAIN_DIR, 'data');
const ITEM_DIR = path.join(DATA_DIR, 'items');

const itemFile = fs.readFileSync(path.join(DATA_DIR, 'items.json'), 'utf-8');
const basicItemFile = fs.readFileSync(path.join(DATA_DIR, 'other_items.json'), 'utf-8');
const importedItems = JSON.parse(itemFile);
const importedBasicItems = JSON.parse(basicItemFile);
const items = R.concat(importedBasicItems.basicitem, importedItems.item);

const armorType = (type) => {
  switch (type) {
    case 'LA': return 'Light Armor';
    case 'MA': return 'Medium Armor';
    case 'HA': return 'Heavy Armor';
    default: return 'Armor';
  }
};
const safeArmorType = type => armorType(safeBlank(type).toUpperCase());

const armorFormat = item => ({
  isArmor: safeFalse(item.armor),
  type: safeArmorType(item.type),
  ac: safeBlank(item.ac),
  stealthDisadvantage: safeFalse(item.stealth),
});

const weaponType = (type) => {
  switch (type) {
    case 'S': return 'Slashing';
    case 'P': return 'Piercing';
    case 'B': return 'Bludgeoning';
    case 'R': return 'Ranged';
    default: return 'Unknown';
  }
};
const safeWeaponType = type => weaponType(safeBlank(type).toUpperCase());

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
const safeWeaponProperties = props => properties(safeArray(props));

const weaponFormat = item => ({
  isWeapon: safeFalse(item.weapon),
  category: safeBlank(item.weaponCategory),
  damageType: safeWeaponType(item.dmgType),
  baseDamage: safeBlank(item.dmg1),
  twoHandedDamage: safeBlank(item.dmg2),
  properties: safeWeaponProperties(item.property),
  range: safeBlank(item.range),
});

const magicFormat = item => ({
  isMagic: safeBlank(item.tier) !== '',
  needsAttunement: safeFalse(item.reqAttune) !== false,
  isWondrous: safeFalse(item.wondrous),
  charges: safeZeroInt(item.charges),
});

const typeFormat = (item) => {
  const type = safeBlank(item.type).toUpperCase();
  switch (type) {
    case 'RG': return 'Ring';
    case 'G': return 'Adventuring Gear';
    case 'M': return 'Melee Weapon';
    case 'AT': return 'Artisan Tool';
    case '': return 'Wondrous Item';
    case 'SCF': return 'Spellcasting Focus';
    case 'S': return 'Shield';
    case 'HA': return 'Heavy Armor';
    case 'MA': return 'Medium Armor';
    case 'LA': return 'Light Armor';
    case 'A': return 'Ammunition';
    case 'EXP': return 'Explosive';
    case 'AF': return 'Ammunition (Firearm)';
    case 'R': return 'Ranged';
    case 'GS': return 'Gaming Set';
    case 'INS': return 'Instrument';
    case 'MNT': return 'Mount';
    case 'OTH': return '';
    case 'P': return 'Potion';
    case 'RD': return 'Rod';
    case 'SC': return 'Scroll';
    case 'TAH': return 'Tack and Harness';
    case 'T': return 'Tool';
    case 'TG': return 'Trade Good';
    case 'VEH': return 'Vehicle';
    case 'WD': return 'Wand';
    default: {
      if (safeFalse(item.technology) !== false) return 'Staff';
      return '$';
    }
  }
};

const itemFormat = item => ({
  name: safeBlank(item.name),
  rarity: safeBlank(item.rarity),
  type: typeFormat(item),
  weight: safeZeroString(item.weight),
  value: safeZeroString(item.value),
  weapon: weaponFormat(item),
  armor: armorFormat(item),
  magic: magicFormat(item),
  age: safeBlank(item.age),
  modifier: safeBlank(safeObject(item.modifier).__text),
  source: safeBlank(item.source),
  entry: removeBadItems(R.concat(R.map(entrySmoother, safeArray(item.entries)), R.map(entrySmoother, safeArray(item.additionalEntries)))),
});

const generatedItems = R.map(item => itemFormat(item), items);
const filteredItems = R.filter(item => item.age === '' && item.type !== '$', generatedItems);
const cleanedItems = R.map(R.dissoc('age'), filteredItems);
const sortFunc = (first, second) => {
  if (first.name > second.name) {
    return 1;
  }
  if (first.name < second.name) {
    return -1;
  }
  return 0;
};
const sortedItems = R.sort(sortFunc, cleanedItems);

const itemWriter = fileWriter(ITEM_DIR);
R.map(itemWriter, sortedItems);

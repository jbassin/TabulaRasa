import {
  entrySmoother,
  removeBadItems,
  safeArray,
  safeBlank,
  safeFalse,
  safeObject,
  safeZeroInt,
} from './global_digest';

const R = require('ramda');

const rangeFormat = (spell) => {
  const safeRange = safeObject(spell.range);
  const safeDistance = safeObject(safeRange.distance);
  return {
    shape: safeBlank(safeRange.type),
    distance: safeZeroInt(safeDistance.amount),
    unit: safeBlank(safeDistance.type),
  };
};

const schoolFormat = (school) => {
  switch (school) {
    case 'A': return 'Abjuration';
    case 'C': return 'Conjuration';
    case 'D': return 'Divination';
    case 'E': return 'Enchantment';
    case 'V': return 'Evocation';
    case 'I': return 'Illusion';
    case 'N': return 'Necromancy';
    case 'T': return 'Transmutation';
    default: return 'Unknown';
  }
};
const safeSchoolFormat = school => schoolFormat(safeBlank(school).toUpperCase());

const componentFormat = component => ({
  somatic: safeFalse(component.s),
  verbal: safeFalse(component.v),
  material: safeFalse(component.m) !== false,
  components: safeBlank(component.m),
});
const safeComponentFormat = component => componentFormat(safeObject(component));

const singleDurationFormat = (duration) => {
  const safeDuration = safeObject(duration.duration);
  return {
    type: safeBlank(duration.type).toLowerCase(),
    time: safeZeroInt(safeDuration.amount),
    unit: safeBlank(safeDuration.type),
  };
};
const safeSingleDurationFormat = duration => singleDurationFormat(safeObject(duration));
const durationFormat = spell => R.map(safeSingleDurationFormat, safeArray(spell.duration));

const singleTimeFormat = time => ({
  time: safeZeroInt(time.number),
  unit: safeBlank(time.unit),
});
const safeSingleTimeFormat = time => singleTimeFormat(safeObject(time));
const timeFormat = spell => R.map(safeSingleTimeFormat, safeArray(spell.time));

const safeEntryFormat = entries => removeBadItems(R.map(entrySmoother, safeArray(entries)));

const classFormat = (classes) => {
  const oldClassFormat = safeArray(classes.fromClassList);
  const oldSubclassFormat = safeArray(classes.fromSubclass);
  const newClassFormat = R.reduce((acc, con) => {
    const className = safeBlank(con.name);
    if (className === '') return acc;
    return R.append(className, acc);
  }, [], oldClassFormat);
  const newSubclassFormat = R.reduce((acc, con) => {
    const subclassName = safeBlank(safeObject(con.subclass).name);
    const subclassParent = safeBlank(safeObject(con.class).name);
    const subsubclassName = safeBlank(safeObject(con.subclass).subSubclass);
    return R.append({
      name: subclassName,
      parent: subclassParent,
      child: subsubclassName,
    }, acc);
  }, [], oldSubclassFormat);
  const rogueSubclass = R.includes('Wizard', newClassFormat) ? {
    name: 'Arcane Trickster',
    parent: 'Rogue',
    child: '',
  } : {};
  const fighterSubclass = R.includes('Wizard', newClassFormat) ? {
    name: 'Eldritch Knight',
    parent: 'Fighter',
    child: '',
  } : {};
  const sorcererSubclass = R.includes('Cleric', newClassFormat) ? {
    name: 'Divine Soul',
    parent: 'Sorcerer',
    child: '',
  } : {};
  const cleanedSubclassFormat = R.filter(subclass => safeBlank(subclass.name) !== '', R.concat(newSubclassFormat, rogueSubclass, fighterSubclass, sorcererSubclass));
  return [newClassFormat, cleanedSubclassFormat];
};

const spellFormat = spell => ({
  name: safeBlank(spell.name),
  source: safeBlank(spell.source),
  level: safeZeroInt(spell.level),
  range: rangeFormat(spell),
  school: safeSchoolFormat(spell.school),
  components: safeComponentFormat(spell.components),
  durations: durationFormat(spell),
  time: timeFormat(spell),
  entry: R.concat(safeEntryFormat(spell.entries), safeEntryFormat(spell.entriesHigherLevel)),
  classes: classFormat(safeObject(spell.classes))[0],
  subclasses: classFormat(safeObject(spell.classes))[1],
  ritual: safeFalse(safeObject(spell.meta).ritual),
});

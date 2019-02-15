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
});

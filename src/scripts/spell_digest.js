const rangeFormat = (spell) => {
    const safeRange = safeObject(spell.range);
    const safeDistance = safeObject(safeRange.distance);
    return {
        shape: safeBlank(safeRange.type),
        distance: safeZero(safeDistance.amount),
        unit: safeBlank(safeDistance.type),
    }
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
const safeSchoolFormat = school => schoolFormat(safeBlank(spell.school).toUpperCase());

const componentFormat = component => ({
    somatic: safeFalse(component.s),
    verbal: safeFalse(component.v),
    material: safeFalse(component.m) !== false,
    components: safeBlank(component.m),
});
const safeComponentFormat = component => componentFormat(safeObject(component));

const spellFormat = spell => {
    name: safeBlank(spell.name),
    source: safeBlank(spell.source),
    level: safeZeroInt(spell.level),
    range: rangeFormat(spell),
    school: safeSchoolFormat(spell.school),
    components: safeComponentFormat(spell.components),
};

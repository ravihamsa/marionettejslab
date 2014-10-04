var stringIndex = {
    'no.options':'No Options',
    'no.selection':'Select a option',
    'all.selected':'All Selected',
    'selected': 'Selected'
}

Marionette.stringLookup = function(key) {
    return stringIndex[key] || key;
};

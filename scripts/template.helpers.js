var templateIndex = {
    selectableItem:_.template('<a href="#select" data-id="<%=id%>" class="js-action">' +
        '<% if (showIcon){ %><em class="icon"></em><% } %> <%=name%></a>')
}

Marionette.templateLookup = function(key) {
    return templateIndex[key];
};

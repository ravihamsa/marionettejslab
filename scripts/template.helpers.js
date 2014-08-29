var templateIndex = {
    'selectable.item':'<a href="#select" data-id="<%=id%>" class="js-action">' +
        '<% if (showIcon){ %><em class="icon"></em><% } %> <%=name%></a>',
    'single.select.summary': '<%=summary%>',
    'multi.select.summary': '<% if(selectedCount > 2) { %> <%=selectedCount%> <%}%><%=summary%>'
}
_.each(templateIndex, function(template, templateName){
    templateIndex[templateName] = _.template(template);
});

Marionette.templateLookup = function(key) {
    return templateIndex[key];
};

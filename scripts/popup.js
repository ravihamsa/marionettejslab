var popupCh = Backbone.Wreqr.radio.channel('popup')

popupCh.commands.setHandler('toggle:popup', function(bodyEl){
    console.log('toggle popup called', arguments);
    bodyEl.toggle();
})
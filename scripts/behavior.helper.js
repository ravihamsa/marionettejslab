var Behaviors = {
    AnchorActions:Marionette.Behavior.extend({
        ui:{
            'action':'a.js-action'
        },
        events: {
            'click @ui.action': 'triggerActionEvents'
        },
        triggerActionEvents: function(e){
            e.preventDefault();
            if(this.ui.action.index(e.target) > -1){
                var target = $(e.target);
                var action = target.attr('href').substr(1);
                this.view.triggerMethod('action',action);
                this.view.triggerMethod('action:'+action);
            }
        }
    }),
    TriggerModelEvents:Marionette.Behavior.extend({
        modelEvents: {
            'change': '_triggerChangeEvents'
        },
        _triggerChangeEvents: function(changedAttributes){
            var _this = this;
            _.each(changedAttributes, function(value, attributeName){
                _this.view.triggerMethod(attributeName+':change', value);
            });
            _this.view.triggerMethod('change', changedAttributes);
        },
        triggerChangeEvents: function(model){
            var changedAttributes = model.changedAttributes();
            this._triggerChangeEvents(changedAttributes);
        }
    }),
    TriggerCollectionEvents:Marionette.Behavior.extend({
        collectionEvents: {
            'all': 'triggerCollectionEvents'
        },
        triggerCollectionEvents: function(eventName){

            var args = Array.prototype.slice.call(arguments);
            args.unshift('collectionEvent:'+eventName);
            this.view.triggerMethod.apply(this.view, args);
            args.shift();
            args.unshift('collectionEvent');
            this.view.triggerMethod.apply(this.view, args);
        }
    }),
    Toggle: Marionette.Behavior.extend({
        ui:{
            'toggleButton':'.js-toggle-but',
            'toggleBody':'.js-toggle-body'
        },
        events:{
            'click @ui.toggleButton':'toggleBody'
        },
        toggleBody: function(){
            popupCh.commands.execute('toggle:popup', this.ui.toggleBody);
        }
    })
};




Marionette.Behaviors.behaviorsLookup = function() {
    return Behaviors;
};

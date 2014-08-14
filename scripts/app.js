var app = new Backbone.Marionette.Application();


app.addRegions({
    help:'.help-container',
    header:'.header-container',
    content:'.content-container',
    footer:'.footer-container'

})


var HelpView = Marionette.View.extend({
    template:'help view',
    render:function(){
        this.$el.html('ravi');
        return this;
    }
});



var topNavOptions = [{
    id:'home',
    selected:true,
    name:'Home'
},{
    id:'about',
    name:'About Us'
},{
    id:'profile',
    name:'Profile'
},{
    id:'customers',
    name:'Customers'
}];


var HeaderItemView = Marionette.ItemView.extend({
    tagName:'li',
    template: _.template('<a href="#<%=id%>" class="action"> <%= name %></a>'),
    className:function(){
        if(this.model.get('selected')){
            return 'active'
        }
        return '';
    },
    onChangeSelected: function(){
        this.$el.toggleClass('active', this.model.get('selected'));
    },
    behaviors:{
        TriggerModelEvents:{},
        AnchorActions:{}
    },
    onAction: function(action){
        alert('child '+action);
    }
})

var HeaderView = Marionette.CompositeView.extend({

    childView:HeaderItemView,
    childViewContainer:'ul',
    clickHandler: function(e){
        e.preventDefault();
        console.log(arguments);
    },
    behaviors:{
        AnchorActions:{},
        TriggerCollectionEvents:{}
    },
    template: _.template('<div> </div> <a href="#testLink" class="action test-link">test link</span>  <ul></ul>  '),
    onAction: function(action){
        alert(action);
    }
})




var MyRouter = Marionette.AppRouter.extend({
    routes:{
        '':'index',
        ':pageId':'index'
    },
    index: function(){
        console.log(arguments);
        var helpView = new HelpView();
        app.help.show(helpView);
        var collection = new Backbone.Collection();

        var headerView = new HeaderView({
            collection:collection
        });

        headerView.on('all', function(){
            console.log(arguments);
        });
        collection.reset(topNavOptions);
        app.header.show(headerView);


        var optionView = headerView.children.findByIndex(1);
        optionView.on('all', function(){
            console.log(arguments);
        });
        optionView.model.set('name', 'Ravi')

    }
})


var router = new MyRouter();

Backbone.history.start();

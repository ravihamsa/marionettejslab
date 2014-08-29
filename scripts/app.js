var app = new Marionette.Application();




Marionette.Collection = Backbone.Collection.extend({
    Model:Marionette.Model
})


var Selectable = Marionette.Selectable;

app.addRegions({
    help: '.help-container',
    header: '.header-container',
    content: '.content-container',
    footer: '.footer-container'
})


var HelpView = Marionette.View.extend({
    template: 'help view',
    render: function () {
        this.$el.html('ravi');
        return this;
    }
});


var topNavOptions = [
    {
        id: 'home',
        selected: true,
        name: 'Home'
    },
    {
        id: 'about',
        name: 'About Us'
    },
    {
        id: 'profile',
        name: 'Profile'
    },
    {
        id: 'customers',
        name: 'Customers'
    }
];


var HeaderItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: _.template('<a href="#<%=id%>" class="js-action"> <%= name %></a>'),
    className: function () {
        if (this.model.get('selected')) {
            return 'active'
        }
        return '';
    },
    onChangeSelected: function () {
        this.$el.toggleClass('active', this.model.get('selected'));
    },
    behaviors: {
        TriggerModelEvents: {},
        AnchorActions: {}
    },
    onAction: function (action) {
        alert('child ' + action);
    }
})

var HeaderView = Marionette.CompositeView.extend({

    childView: HeaderItemView,
    childViewContainer: 'ul',
    clickHandler: function (e) {
        e.preventDefault();
        console.log(arguments);
    },
    behaviors: {
        AnchorActions: {},
        TriggerCollectionEvents: {}
    },
    template: _.template('<div> </div> <a href="#testLink" class="js-action test-link">test link</span>  <ul></ul>  '),
    onAction: function (action) {
        alert(action);
    }
})

var ToggleView = Marionette.ItemView.extend({
    template: _.template('<div class="js-toggle-but">But</div> <div class="js-toggle-body">Body</div> '),
    behaviors:{
        Toggle:{}
    }
});





var SingleSelectDropDownView = Selectable.SingleSelectView.extend({
    template: _.template('<div class="js-toggle-but drop-down-but"><div class="js-summary-container"> </div> </div> <div class="js-toggle-body drop-down-body"> <div class="js-list-container"> </div></div>'),
    behaviors:{
        Toggle:{}
    },
    showSummary:true,
    className:'drop-down'
})


var MultiSelectDropDownView = Selectable.MultiSelectView.extend({
    template: _.template('<div class="js-toggle-but drop-down-but"><div class="js-summary-container"> </div> </div> <div class="js-toggle-body drop-down-body"> <div class="js-list-container"> </div></div>'),
    behaviors:{
        Toggle:{}
    },
    showSummary:true,
    className:'drop-down'
})







var ContentView = Marionette.LayoutView.extend({
    template: _.template('content view <br> <div class="toggle"></div><div class="single-select"></div> <div class="multi-select"></div> '),
    regions:{
        toggle:'.toggle',
        singleSelect:'.single-select',
        multiSelect:'.multi-select'
    },
    onShow: function(){
        this.toggle.show(new ToggleView);

        var singleSelectModel = new Selectable.SingleSelectModel({
            items:new Selectable.SingleSelectCollection([{id:1, name:'ravi'}, {id:2, name:'kavi', selected:true}, {id:3, name:'bhavi'}])
        })

        this.singleSelect.show(new SingleSelectDropDownView({
            model:singleSelectModel
        }))


        var multiSelectModel = new Selectable.MultiSelectModel({
            items:new Selectable.MultiSelectCollection([{id:1, name:'ravi'}, {id:2, name:'kavi', selected:true}, {id:3, name:'bhavi'}])
        })

        this.multiSelect.show(new MultiSelectDropDownView({
            model:multiSelectModel
        }))
    }
});




var MyRouter = Marionette.AppRouter.extend({
    routes: {
        '': 'index',
        ':pageId': 'index'
    },
    index: function () {
        console.log(arguments);
        var helpView = new HelpView();
        app.help.show(helpView);
        var collection = new Backbone.Collection();

        var headerView = new HeaderView({
            collection: collection
        });

        headerView.on('all', function () {
            console.log(arguments);
        });
        collection.reset(topNavOptions);
        app.header.show(headerView);


        var optionView = headerView.children.findByIndex(1);
        optionView.on('all', function () {
            console.log(arguments);
        });
        optionView.model.set('name', 'Ravi')



        var contentView = new ContentView();
        app.content.show(contentView);



    }
})


var router = new MyRouter();

Backbone.history.start();

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
}]


var HeaderItemView = Marionette.ItemView.extend({
    tagName:'li',
    modelEvents:{
        'change:selected':'selectedChangeHandler'
    },
    template: _.template('<a href="#<%=id%>"> <%= name %></a>'),
    className:function(){
        if(this.model.get('selected')){
            return 'active'
        }
        return '';
    },
    selectedChangeHandler: function(){
        this.$el.toggleClass('active', this.model.get('selected'));
    }
})

var HeaderView = Marionette.CompositeView.extend({

    childView:HeaderItemView,
    childViewContainer:'ul',
    ui:{
        'node':'.test-link'
    },
    events:{
        'click @ui.node':'clickHandler'
    },
    clickHandler: function(e){
        e.preventDefault();
        console.log(arguments);
    },
    template: _.template('<div> </div> <span class="test-link">test link</span>  <ul></ul>')
})

var MyRouter = Marionette.AppRouter.extend({
    routes:{
        '':'index'
    },
    index: function(){
        console.log(arguments);
        var helpView = new HelpView();
        app.help.show(helpView);

        app.header.show(new HeaderView({
            collection:new Backbone.Collection(topNavOptions)
        }));
    }
})


var router = new MyRouter();

Backbone.history.start();

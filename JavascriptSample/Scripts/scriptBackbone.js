var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BbButton = (function (_super) {
    __extends(BbButton, _super);
    function BbButton(_name, _id) {
        if (_name === void 0) { _name = "-"; }
        if (_id === void 0) { _id = 0; }
        _super.call(this);
        this.name = _name;
        this.id = _id;
        this.cname = "btn-default";
    }
    BbButton.prototype.getClassName = function () {
        switch (this.name) {
            case "A":
                return "btn-success";
            case "B":
                return "btn-primary";
            case "-":
                return "btn-default";
        }
    };
    return BbButton;
}(Backbone.Model));
;
//-----------------------------
// コレクション
//-----------------------------
var BbButtonList = (function (_super) {
    __extends(BbButtonList, _super);
    function BbButtonList() {
        _super.apply(this, arguments);
        this.model = BbButton;
    }
    return BbButtonList;
}(Backbone.Collection));
;
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView() {
        _super.apply(this, arguments);
        // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
        this.template = _.template($('#button-template').html());
    }
    //tagName = 'li'; // name of tag to be created        
    // `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.
    ItemView.prototype.events = function () {
        return {
            'click a.toA': this.toA,
            'click a.toB': this.remove,
            'click a.toN': this.remove,
        };
    };
    // `initialize()` now binds model change/removal to the corresponding handlers below.
    ItemView.prototype.initialize = function () {
        _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here
        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
    };
    ItemView.prototype.render = function () {
        //console.log($(this.el).html());
        //console.log(this.template());
        this.model.cname = this.model.getClassName();
        $(this.el).append(this.template(this.model));
        //$(this.el).html('<span style="color:black;">' + this.model.id + ' ' + this.model.name + '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
        return this; // for chainable calls, like .render().el
    };
    ItemView.prototype.toA = function () {
        taskApp.counter++;
    };
    // `unrender()`: Makes Model remove itself from the DOM.
    ItemView.prototype.unrender = function () {
        $(this.el).remove();
    };
    // `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
    ItemView.prototype.swap = function () {
        var swapped = {
            id: this.model.id + 1,
            name: this.model.name + "!"
        };
        this.model.set(swapped);
    };
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    ItemView.prototype.remove = function () {
        this.model.destroy();
    };
    return ItemView;
}(Backbone.View));
// ビュー（リストアイテム部分）
var TaskView = (function (_super) {
    __extends(TaskView, _super);
    function TaskView() {
        _super.apply(this, arguments);
        this.template = _.template($('#button-template').html());
    }
    TaskView.prototype.events = function () {
        return {
            'click .toA': this.toggleTask,
            'click button#add': 'addItem'
        };
    };
    TaskView.prototype.initialize = function () {
        _.bindAll(this, 'render', 'addItem', 'appendItem');
        for (var i = 0; i < 10; i++) {
            this.collection.add(new BbButton("-", i));
        }
        this.collection.bind('add', this.appendItem);
        this.counter = 0;
        this.render();
    };
    TaskView.prototype.render = function () {
        var self = this;
        //$(this.el).append("<button id='add'>Add list item</button>");
        //$(this.el).append("<ul></ul>");
        //$(this.el).append("<div></div>");
        _(this.collection.models).each(function (item) {
            self.appendItem(item);
        }, this);
        return this;
    };
    TaskView.prototype.toggleTask = function (e) {
        e.preventDefault();
        console.log(this);
    };
    TaskView.prototype.addItem = function () {
        this.counter++;
        var item = new BbButton();
        console.log(item);
        item.set({
            name: item.get('name') + this.counter,
            className: "x"
        });
        console.log(item);
        this.collection.add(item); // add item to collection; view is updated via event 'add'
    };
    TaskView.prototype.appendItem = function (item) {
        //item.id = this.counter;
        //item.cname = "x";
        var itemView = new ItemView({
            model: item,
            el: "div#buttons"
        });
        console.log(item);
        $(this.el).append(itemView.render().el);
        //$('ul', this.el).append("<li>" + item.name + " " + this.counter + "</li>");
    };
    return TaskView;
}(Backbone.View));
;
// ビュー（画面全体）
var TaskApp = (function (_super) {
    __extends(TaskApp, _super);
    function TaskApp() {
        _super.apply(this, arguments);
    }
    TaskApp.prototype.initialize = function () {
        var taskView = new TaskView({
            el: $('#buttons'),
            collection: new BbButtonList()
        });
        this.$el.append(taskView.render().el);
        //this.collection.fetch();
    };
    TaskApp.prototype.events = function () {
        return {
            'click .item': this.getTask
        };
    };
    TaskApp.prototype.getTask = function (e) {
        e.preventDefault();
        console.log(this.collection.length);
    };
    return TaskApp;
}(Backbone.View));
;
var taskApp = new TaskView({
    el: $('#content'),
    collection: new BbButtonList()
});
//# sourceMappingURL=scriptBackbone.js.map
class BbButton extends Backbone.Model {
    public name: string;
    public id: number;
    public cname: string;
    constructor(_name: string = "-", _id: number = 0) {
        super();
        this.name = _name;
        this.id = _id;
        this.cname = "btn-default";
    }

    getClassName(): string {
        switch (this.name) {
            case "A":
                return "btn-success";
            case "B":
                return "btn-primary";
            case "-":
                return "btn-default";
        }
    }
};
//-----------------------------
// コレクション
//-----------------------------
class BbButtonList extends Backbone.Collection<BbButton> {
    model = BbButton;
};

class ItemView extends Backbone.View<BbButton>{
    //tagName = 'li'; // name of tag to be created        
    // `ItemView`s now respond to two clickable actions for each `Item`: swap and delete.
    events(): Backbone.EventsHash {
        return {
            'click a.toA': this.toA,
            'click a.toB': this.remove,
            'click a.toN': this.remove,
        }
    }
    // `initialize()` now binds model change/removal to the corresponding handlers below.
    initialize(): void {
        _.bindAll(this, 'render', 'unrender', 'swap', 'remove'); // every function that uses 'this' as the current object should be in here

        this.model.bind('change', this.render);
        this.model.bind('remove', this.unrender);
    }
    // `render()` now includes two extra `span`s corresponding to the actions swap and delete.
    template = _.template($('#button-template').html());
    render(): ItemView {

        //console.log($(this.el).html());
        //console.log(this.template());
        this.model.cname = this.model.getClassName();
        $(this.el).append(this.template(this.model));

        //$(this.el).html('<span style="color:black;">' + this.model.id + ' ' + this.model.name + '</span> &nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
        return this; // for chainable calls, like .render().el
    }
    toA(): void {
        taskApp.counter++;
    }


    // `unrender()`: Makes Model remove itself from the DOM.
    unrender(): void {
        $(this.el).remove();
    }
    // `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
    swap(): void {
        var swapped = {
            id: this.model.id + 1,
            name: this.model.name + "!"
        };
        this.model.set(swapped);
    }
    // `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
    remove(): any {
        this.model.destroy();
    }
}

// ビュー（リストアイテム部分）
class TaskView extends Backbone.View<BbButton> {
    counter: number;
    events(): Backbone.EventsHash {
        return {
            'click .toA': this.toggleTask,
            'click button#add': 'addItem'
        }
    }
    initialize(): void {
        _.bindAll(this, 'render', 'addItem', 'appendItem');

        for (let i = 0; i < 10; i++) {
            this.collection.add(new BbButton("-", i));
        }
        this.collection.bind('add', this.appendItem);

        this.counter = 0;
        this.render();      
    }
    template = _.template($('#button-template').html());
    render(): TaskView {
        let self = this;
        //$(this.el).append("<button id='add'>Add list item</button>");
        //$(this.el).append("<ul></ul>");
        //$(this.el).append("<div></div>");
        _(this.collection.models).each(function (item) { // in case collection is not empty
            self.appendItem(item);
        }, this);

        return this;
    }
    toggleTask(e: any): void {
        e.preventDefault();
        console.log(this);
    }

    addItem(): void {
        this.counter++;
        var item = new BbButton();
        console.log(item);
        item.set({
            name: item.get('name') + this.counter, // modify item defaults
            className: "x"
        });
        console.log(item);
        this.collection.add(item); // add item to collection; view is updated via event 'add'
    }

    appendItem(item: BbButton): void {
        //item.id = this.counter;
        //item.cname = "x";
        var itemView = new ItemView({
            model: item,
            el: "div#buttons"
        });
        console.log(item);
        $(this.el).append(itemView.render().el);
        //$('ul', this.el).append("<li>" + item.name + " " + this.counter + "</li>");
    }
};
// ビュー（画面全体）
class TaskApp extends Backbone.View<BbButton>{
    initialize(): void {
        var taskView = new TaskView({
            el: $('#buttons'),
            collection: new BbButtonList()
        });
        this.$el.append(taskView.render().el);
        //this.collection.fetch();
    }
    events(): Backbone.EventsHash {
        return {
            'click .item': this.getTask
        }
    }
    getTask(e: any): void {
        e.preventDefault();
        console.log(this.collection.length);
    }
};

var taskApp = new TaskView({
    el: $('#content'),
    collection: new BbButtonList()
});
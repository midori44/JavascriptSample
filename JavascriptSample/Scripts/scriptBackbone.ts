class Task extends Backbone.Model {
    defaults(): Backbone.ObjectHash {
        return {
            title: '',
            closed: false
        }
    }
    validate(attrs: any): any {
        if (_.isEmpty(attrs.title)) {
            return 'タスク名が指定されてません';
        }
    }
};
//-----------------------------
// コレクション
//-----------------------------
class Tasks extends Backbone.Collection<Task> {
    model = Task;
    //localStorage(): any {
    //    return new Store('backbone-local-storage-task')
    //}
};
// ビュー（リストアイテム部分）
class TaskView extends Backbone.View<Task> {
    tagName: string = 'li';
    events(): Backbone.EventsHash {
        return {
            'click .toggle': this.toggleTask,
            'click .del': this.delTask
        }
    }
    initialize(): void {
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.render, this); // (1)
    }
    template = _.template($('#temp-taskItem').html()); // (2)
    render(): TaskView {
        let html: string = this.template(this.model.toJSON());
        this.$el.html(html)[
            this.model.get('closed') ? 'addClass' : 'removeClass'
        ]('closed');
        return this;
    }
    toggleTask(): void {
        this.model.set('closed', !this.model.get('closed')).save();
    }
    delTask(e: any): void {
        e.preventDefault();
        this.model.destroy();
    }
};
// ビュー（画面全体）
class TaskApp extends Backbone.View<Task>{
    $title: JQuery;
    $list: JQuery;
    $error: JQuery;

    events(): Backbone.EventsHash {
        return {
            'click .item': this.getTask
        }
    }
    initialize(): void {
        this.$title = this.$el.find('input.title');
        this.$list = this.$el.find('ul.taskList');
        this.$error = this.$el.find('.error');

        let self: TaskApp = this;
        this.collection.on('add', function (task) {
            let taskView = new TaskView({ model: task });
            self.$list.prepend(taskView.render().el)
        })
        this.collection.fetch();
        this.collection.on("invalid", function (task, error) { // (3)
            self.$error.text(error);
        });
    }
    addTask(e: any): void {
        e.preventDefault();
        let sts = this.collection.create(
            { title: this.$title.val() },
            { validate: true }
        );
        if (sts) {
            this.$title.val('')
            this.$error.text('');
        }
    }
    getTask(e: any): void {
        e.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: "",
            url: "/home/api",
            cache: false,
            success: (data: any) => {
                console.log(data);
                let sts = this.collection.create(
                    { title: data.name },
                    { validate: true }
                );
            }
        });
    }
    clearTask(): void {
        let tasks = this.collection;
        tasks.each(function (task) {
            tasks.first().destroy();
        });
    }
};
var taskApp = new TaskApp({
    el: $('div.taskApp'),
    collection: new Tasks()
});
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Task = (function (_super) {
    __extends(Task, _super);
    function Task() {
        _super.apply(this, arguments);
    }
    Task.prototype.defaults = function () {
        return {
            title: '',
            closed: false
        };
    };
    Task.prototype.validate = function (attrs) {
        if (_.isEmpty(attrs.title)) {
            return 'タスク名が指定されてません';
        }
    };
    return Task;
}(Backbone.Model));
;
//-----------------------------
// コレクション
//-----------------------------
var Tasks = (function (_super) {
    __extends(Tasks, _super);
    function Tasks() {
        _super.apply(this, arguments);
        this.model = Task;
    }
    return Tasks;
}(Backbone.Collection));
;
// ビュー（リストアイテム部分）
var TaskView = (function (_super) {
    __extends(TaskView, _super);
    function TaskView() {
        _super.apply(this, arguments);
        this.tagName = 'li';
        this.template = _.template($('#temp-taskItem').html()); // (2)
    }
    TaskView.prototype.events = function () {
        return {
            'click .toggle': this.toggleTask,
            'click .del': this.delTask
        };
    };
    TaskView.prototype.initialize = function () {
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.render, this); // (1)
    };
    TaskView.prototype.render = function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html)[this.model.get('closed') ? 'addClass' : 'removeClass']('closed');
        return this;
    };
    TaskView.prototype.toggleTask = function () {
        this.model.set('closed', !this.model.get('closed')).save();
    };
    TaskView.prototype.delTask = function (e) {
        e.preventDefault();
        this.model.destroy();
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
    TaskApp.prototype.events = function () {
        return {
            'click .item': this.getTask
        };
    };
    TaskApp.prototype.initialize = function () {
        this.$title = this.$el.find('input.title');
        this.$list = this.$el.find('ul.taskList');
        this.$error = this.$el.find('.error');
        var self = this;
        this.collection.on('add', function (task) {
            var taskView = new TaskView({ model: task });
            self.$list.prepend(taskView.render().el);
        });
        this.collection.fetch();
        this.collection.on("invalid", function (task, error) {
            self.$error.text(error);
        });
    };
    TaskApp.prototype.addTask = function (e) {
        e.preventDefault();
        var sts = this.collection.create({ title: this.$title.val() }, { validate: true });
        if (sts) {
            this.$title.val('');
            this.$error.text('');
        }
    };
    TaskApp.prototype.getTask = function (e) {
        var _this = this;
        e.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: "",
            url: "/home/api",
            cache: false,
            success: function (data) {
                console.log(data);
                var sts = _this.collection.create({ title: data.name }, { validate: true });
            }
        });
    };
    TaskApp.prototype.clearTask = function () {
        var tasks = this.collection;
        tasks.each(function (task) {
            tasks.first().destroy();
        });
    };
    return TaskApp;
}(Backbone.View));
;
var taskApp = new TaskApp({
    el: $('div.taskApp'),
    collection: new Tasks()
});
//# sourceMappingURL=scriptBackbone.js.map
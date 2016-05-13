var Result = (function () {
    function Result() {
        this.countA = ko.observable(0);
        this.countB = ko.observable(0);
    }
    return Result;
}());
var result = new Result();
var Button = (function () {
    function Button(_name) {
        this.name = ko.observable();
        this.name(_name);
    }
    Button.prototype.ChangeTo = function (_name) {
        this.decrement();
        this.name(_name);
        this.increment();
    };
    Button.prototype.btnClass = function () {
        var name = this.name();
        switch (name) {
            case "A":
                return "btn-success";
            case "B":
                return "btn-primary";
            case "-":
                return "btn-default";
        }
    };
    Button.prototype.decrement = function () {
        var name = this.name();
        if (name == "A") {
            result.countA(result.countA() - 1);
        }
        if (name == "B") {
            result.countB(result.countB() - 1);
        }
    };
    Button.prototype.increment = function () {
        var name = this.name();
        if (name == "A") {
            result.countA(result.countA() + 1);
        }
        if (name == "B") {
            result.countB(result.countB() + 1);
        }
    };
    return Button;
}());
var AppViewModel = (function () {
    function AppViewModel() {
        this.result = result;
        this.buttons = ko.observableArray();
        for (var i = 0; i < 10; i++) {
            this.buttons.push(new Button("-"));
        }
        //let self = this;
        //$.ajax({
        //    url: "/Home/Api",
        //    type: "POST",
        //    data: "",
        //    dataType: "JSON",
        //    success: function (data: jsonResult[]) {
        //        //console.log(data);
        //        for (let i = 0; i < data.length; i++) {
        //            let param: jsonResult = data[i];
        //            if (param.state == true) {
        //                self.buttons.push(new Button("A"));
        //                result.countA(result.countA() + 1);
        //            }
        //            else if (param.state == false) {
        //                self.buttons.push(new Button("B"));
        //                result.countB(result.countB() + 1);
        //            }
        //            else {
        //                self.buttons.push(new Button("-"));
        //            }
        //        }
        //    }
        //});
    }
    return AppViewModel;
}());
window.onload = function () {
    var viewModel = new AppViewModel();
    ko.applyBindings(viewModel);
};
//# sourceMappingURL=scriptKnockout.js.map
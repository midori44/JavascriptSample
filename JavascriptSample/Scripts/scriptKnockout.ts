
class Result {
    countA: KnockoutObservable<number> = ko.observable<number>(0);
    countB: KnockoutObservable<number> = ko.observable<number>(0);
}
var result = new Result();

class Button {
    name: KnockoutObservable<string> = ko.observable<string>();
    constructor(_name: string) {
        this.name(_name);
    }

    public ChangeTo(_name: string): void {
        this.decrement();
        this.name(_name);
        this.increment();
    }

    public btnClass(): string {
        let name: string = this.name();
        switch (name) {
            case "A":
                return "btn-success";
            case "B":
                return "btn-primary";
            case "-":
                return "btn-default";
        }
    }

    private decrement(): void {
        let name: string = this.name();
        if (name == "A") {
            result.countA(result.countA() - 1);
        }
        if (name == "B") {
            result.countB(result.countB() - 1);
        }
    }
    private increment(): void {
        let name: string = this.name();
        if (name == "A") {
            result.countA(result.countA() + 1);
        }
        if (name == "B") {
            result.countB(result.countB() + 1);
        }
    }
}

class AppViewModel {
    buttons: KnockoutObservableArray<Button>;
    result: Result;

    constructor() {
        this.result = result;
        this.buttons = ko.observableArray<Button>();
        for (let i = 0; i < 10; i++) {
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
}
interface jsonResult {
    id: number;
    state: boolean;
}

window.onload = () => {
    let viewModel = new AppViewModel();
    ko.applyBindings(viewModel);
};
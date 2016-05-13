"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Redux = require('redux');
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Btn = (function () {
    function Btn(index, name) {
        if (name === void 0) { name = "-"; }
        this.index = index;
        this.name = name;
    }
    Btn.prototype.btnClass = function () {
        switch (this.name) {
            case "A":
                return "btn-success btn dropdown-toggle";
            case "B":
                return "btn-primary btn dropdown-toggle";
            case "-":
                return "btn-default btn dropdown-toggle";
        }
    };
    return Btn;
}());
var Count = (function () {
    function Count(A, B) {
        if (A === void 0) { A = 0; }
        if (B === void 0) { B = 0; }
        this.A = A;
        this.B = B;
    }
    return Count;
}());
var Counter = (function () {
    function Counter() {
        this.count = new Count();
        this.buttons = [];
        for (var i = 0; i < 10; i++) {
            this.buttons.push(new Btn(i));
        }
    }
    return Counter;
}());
// Action : アプリケーションからの情報をstoreへ送る為のオブジェクト
var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["ChangeTo"] = 0] = "ChangeTo";
})(ActionTypes || (ActionTypes = {}));
// ActionCreator : Actionを生成するメソッド
function changeTo(from, to) {
    return {
        type: ActionTypes.ChangeTo,
        index: from.index,
        from: from.name,
        to: to
    };
}
// Reducer : Actionを受けてStateを変更するの為のメソッド ((state, action) => newState となる関数)
function counter(state, action) {
    if (state === void 0) { state = new Counter(); }
    switch (action.type) {
        case ActionTypes.ChangeTo:
            if (action.from == "A") {
                state.count.A--;
            }
            if (action.from == "B") {
                state.count.B--;
            }
            if (action.to == "A") {
                state.count.A++;
            }
            if (action.to == "B") {
                state.count.B++;
            }
            state.buttons[action.index].name = action.to;
            return {
                count: state.count,
                buttons: state.buttons
            };
        default:
            return state;
    }
}
var counterApp = Redux.combineReducers({ counter: counter });
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        var _a = this.props, dispatch = _a.dispatch, counter = _a.counter;
        return (React.createElement("div", null, React.createElement("div", null, React.createElement("label", null, "A: "), React.createElement("span", null, counter.count.A, " "), React.createElement("label", null, "B: "), React.createElement("span", null, counter.count.B, " ")), React.createElement(ButtonList, {buttons: counter.buttons, dispatch: dispatch})));
    };
    return App;
}(React.Component));
var ButtonList = (function (_super) {
    __extends(ButtonList, _super);
    function ButtonList() {
        _super.apply(this, arguments);
    }
    ButtonList.prototype.render = function () {
        var _a = this.props, dispatch = _a.dispatch, buttons = _a.buttons;
        if (buttons) {
            var ButtonNodes = buttons.map(function (b) { return React.createElement(Button, {key: b.index, button: b, dispatch: dispatch}); });
        }
        return (React.createElement("div", null, ButtonNodes));
    };
    return ButtonList;
}(React.Component));
;
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.render = function () {
        var _a = this.props, dispatch = _a.dispatch, button = _a.button;
        return (React.createElement("span", null, React.createElement("div", {className: "btn-group btn-group-sm"}, React.createElement("button", {className: button.btnClass(), "data-toggle": "dropdown", style: { width: "40px" }}, React.createElement("span", null, button.name), " ", React.createElement("span", {className: "caret"})), React.createElement("ul", {className: "dropdown-menu", style: { minWidth: "inherit" }}, React.createElement("li", {className: button.name == "A" ? "hidden" : ""}, React.createElement("a", {onClick: function () { return dispatch(changeTo(button, "A")); }}, "A に変更")), React.createElement("li", {className: button.name == "B" ? "hidden" : ""}, React.createElement("a", {onClick: function () { return dispatch(changeTo(button, "B")); }}, "B に変更")), React.createElement("li", {className: button.name == "-" ? "hidden" : ""}, React.createElement("a", {onClick: function () { return dispatch(changeTo(button, "-")); }}, "- に変更")))), React.createElement("span", null, " ")));
    };
    return Button;
}(React.Component));
function select(state) {
    return {
        counter: state.counter
    };
}
var ReduxCounterApp = ReactRedux.connect(select)(App); // ReduxのstateとReactのpropsをマッピング
// Store : Stateを保持
var store = Redux.createStore(counterApp);
ReactDOM.render(React.createElement(ReactRedux.Provider, {store: store}, React.createElement(ReduxCounterApp, null)), document.getElementById('content'));
//# sourceMappingURL=scriptReact.js.map
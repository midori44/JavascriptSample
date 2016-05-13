import * as Redux from 'redux'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux';

class Btn {
    constructor(public index: number, public name: string = "-") {
    }

    public btnClass(): string {
        switch (this.name) {
            case "A":
                return "btn-success btn dropdown-toggle";
            case "B":
                return "btn-primary btn dropdown-toggle";
            case "-":
                return "btn-default btn dropdown-toggle";
        }
    }
}

class Count {
    constructor(public A: number = 0, public B: number = 0) {
    }
}

class Counter {
    public count: Count = new Count();
    public buttons: Btn[] = [];
    constructor() {
        for (let i = 0; i < 10; i++) {
            this.buttons.push(new Btn(i));
        }
    }
}

// Action : アプリケーションからの情報をstoreへ送る為のオブジェクト
enum ActionTypes {
    ChangeTo
}
interface Action {
    type: ActionTypes;
    index: number;
    from: string;
    to: string;
}

// ActionCreator : Actionを生成するメソッド
function changeTo(from: Btn, to: string) {
    return {
        type: ActionTypes.ChangeTo,
        index: from.index,
        from: from.name,
        to: to
    } as Action;
}

// Reducer : Actionを受けてStateを変更するの為のメソッド ((state, action) => newState となる関数)
function counter(state = new Counter(), action: Action) {
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
            } as Counter;
        default:
            return state;
    }
}
const counterApp = Redux.combineReducers({ counter });
//export default counterApp;

// View (Reactコンポーネント)
interface AppProps {
    counter?: Counter;
    dispatch?: Redux.Dispatch;
}
class App extends React.Component<AppProps, any> {
    render() {
        const { dispatch, counter } = this.props;
        return (
            <div>
                <div>
                    <label>A: </label><span>{counter.count.A} </span>
                    <label>B: </label><span>{counter.count.B} </span>
                </div>
                <ButtonList buttons={counter.buttons} dispatch={dispatch} />
            </div>
        );
    }
}


interface ButtonListProps {
    dispatch?: Redux.Dispatch;
    buttons?: Btn[];
}
class ButtonList extends React.Component<ButtonListProps, any> {
    render() {
        const { dispatch, buttons } = this.props;
        if (buttons) {
            var ButtonNodes = buttons.map(
                b => <Button key={b.index} button={b} dispatch={dispatch} />
            );
        }

        return (
            <div>
                {ButtonNodes}
            </div>
        );
    }
};
interface ButtonProps {
    dispatch?: Redux.Dispatch;
    button: Btn;
}
class Button extends React.Component<ButtonProps, any>{
    render() {
        const { dispatch, button } = this.props;
        return (
            <span>
                <div className="btn-group btn-group-sm">
                    <button className={ button.btnClass() } data-toggle="dropdown" style={{ width: "40px" }}>
                        <span>{ button.name }</span> <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" style={{ minWidth: "inherit" }}>
                        <li className={ button.name == "A" ? "hidden" : "" }>
                            <a onClick={ () => dispatch(changeTo(button, "A")) }>A に変更</a>
                        </li>
                        <li className={ button.name == "B" ? "hidden" : "" }>
                            <a onClick={ () => dispatch(changeTo(button, "B")) }>B に変更</a>
                        </li>
                        <li className={ button.name == "-" ? "hidden" : "" }>
                            <a onClick={ () => dispatch(changeTo(button, "-")) }>- に変更</a>
                        </li>
                    </ul>
                </div>
                <span> </span>
            </span>
        );
    }
}


// Container
interface AppState {
    counter: Counter;
}
function select(state: AppState): AppProps {
    return {
        counter: state.counter
    };
}
const ReduxCounterApp = ReactRedux.connect(select)(App); // ReduxのstateとReactのpropsをマッピング

// Store : Stateを保持
let store = Redux.createStore(counterApp);


ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReduxCounterApp />
    </ReactRedux.Provider>,
    document.getElementById('content')
);
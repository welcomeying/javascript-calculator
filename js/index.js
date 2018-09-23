var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var numbers = [
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["zero", 0]
];
var Buttons = /** @class */ (function (_super) {
    __extends(Buttons, _super);
    function Buttons(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDigit = function (event) {
            _this.props.inputDigit(event.target.value);
        };
        _this.handleOperator = function (event) {
            _this.props.inputOperator(event.target.value);
        };
        _this.handleDecimal = function (event) {
            _this.props.inputDecimal(event.target.value);
        };
        return _this;
    }
    Buttons.prototype.render = function () {
        var _this = this;
        var renderNumbers = numbers.map(function (item) { return React.createElement("button", { id: item[0], key: item[1], value: item[1], onClick: _this.handleDigit }, item[1]); });
        return (React.createElement("div", { className: "buttons" },
            React.createElement("div", { className: "first-row" },
                React.createElement("button", { id: "clear", onClick: this.props.clearDisplay }, "AC"),
                React.createElement("button", { id: "divide", value: "/", onClick: this.handleOperator }, "/"),
                React.createElement("button", { id: "multiply", value: "*", onClick: this.handleOperator }, "x")),
            React.createElement("div", { className: "flex-row" },
                React.createElement("div", { className: "numbers" },
                    renderNumbers,
                    React.createElement("button", { id: "decimal", value: ".", onClick: this.handleDecimal }, ".")),
                React.createElement("div", { className: "operators-column" },
                    React.createElement("button", { id: "add", value: "+", onClick: this.handleOperator }, "+"),
                    React.createElement("button", { id: "subtract", value: "-", onClick: this.handleOperator }, "-"),
                    React.createElement("button", { id: "equals", onClick: this.props.calculate }, "=")))));
    };
    return Buttons;
}(React.Component));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.clearDisplay = function (event) {
            _this.setState({
                current: "0",
                expression: "",
                calculated: false
            });
        };
        _this.inputDigit = function (input) {
            if (_this.state.calculated) {
                _this.setState({
                    current: input,
                    expression: input,
                    calculated: false
                });
            }
            else {
                if (input === "0" && _this.state.expression === "0") {
                    return;
                }
                if (_this.state.current === "0") {
                    _this.setState({
                        current: input,
                        expression: _this.state.expression + input
                    });
                }
                else {
                    _this.setState({
                        current: _this.state.current + input,
                        expression: _this.state.expression + input
                    });
                }
            }
        };
        _this.inputOperator = function (input) {
            var isOperator = /[\*\/\+\-]/;
            if (_this.state.expression === "") {
                return;
            }
            if (_this.state.calculated) {
                _this.setState({
                    calculated: false
                });
            }
            if (isOperator.test(_this.state.expression.slice(-1))) {
                _this.setState({
                    expression: _this.state.expression.slice(0, -1) + input
                });
            }
            else {
                _this.setState({
                    expression: _this.state.expression + input,
                    current: ""
                });
            }
        };
        _this.inputDecimal = function () {
            if (_this.state.current.includes(".") && !_this.state.calculated) {
                return;
            }
            if (_this.state.calculated) {
                _this.setState({
                    current: "0.",
                    expression: "0.",
                    calculated: false
                });
            }
            else {
                if (_this.state.current === "") {
                    _this.setState({
                        current: _this.state.current + "0.",
                        expression: _this.state.expression + "0."
                    });
                }
                else if (_this.state.expression === "") {
                    _this.setState({
                        current: _this.state.current + ".",
                        expression: _this.state.expression + "0."
                    });
                }
                else {
                    _this.setState({
                        current: _this.state.current + ".",
                        expression: _this.state.expression + "."
                    });
                }
            }
        };
        _this.calculate = function () {
            var result = eval(_this.state.expression).toString();
            _this.setState({
                expression: result,
                current: result,
                calculated: true
            });
        };
        _this.state = {
            current: "0",
            expression: "",
            calculated: false
        };
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement("div", { className: "output" },
                React.createElement("div", { id: "expression" }, this.state.expression),
                React.createElement("div", { id: "display" }, this.state.current)),
            React.createElement(Buttons, { clearDisplay: this.clearDisplay, inputDigit: this.inputDigit, inputOperator: this.inputOperator, inputDecimal: this.inputDecimal, calculate: this.calculate })));
    };
    return App;
}(React.Component));
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
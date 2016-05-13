"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var ReactDOM = require('react-dom');
var CommentForm = (function (_super) {
    __extends(CommentForm, _super);
    function CommentForm() {
        _super.apply(this, arguments);
    }
    CommentForm.prototype.handleSubmit = function (e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs["author"]).value.trim();
        var text = ReactDOM.findDOMNode(this.refs["text"]).value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        ReactDOM.findDOMNode(this.refs["author"]).value = '';
        ReactDOM.findDOMNode(this.refs["text"]).value = '';
        return;
    };
    CommentForm.prototype.render = function () {
        return (React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit.bind(this)}, React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), React.createElement("input", {type: "submit", value: "Post"})));
    };
    return CommentForm;
}(React.Component));
var CommentBox = (function (_super) {
    __extends(CommentBox, _super);
    function CommentBox(props) {
        console.log(props);
        _super.call(this, props);
        this.state = { data: [] };
    }
    CommentBox.prototype.loadCommentsFromServer = function () {
        var _this = this;
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            type: 'POST',
            success: function (data) { return _this.setState({ data: data }); },
            error: function (xhr, status, err) { return console.error(_this.props.url, status, err.toString()); }
        });
    };
    CommentBox.prototype.componentDidMount = function () {
        var _this = this;
        this.loadCommentsFromServer();
        setInterval(function () { return _this.loadCommentsFromServer(); }, this.props.pollInterval);
    };
    CommentBox.prototype.handleCommentSubmit = function (comment) {
        var _this = this;
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) { return _this.setState({ data: data }); },
            error: function (xhr, status, err) { return console.error(_this.props.url, status, err.toString()); }
        });
    };
    CommentBox.prototype.render = function () {
        return (React.createElement("div", {className: "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(CommentList, {data: this.state.data}), React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit.bind(this)})));
    };
    return CommentBox;
}(React.Component));
;
var CommentList = (function (_super) {
    __extends(CommentList, _super);
    function CommentList() {
        _super.apply(this, arguments);
    }
    CommentList.prototype.render = function () {
        var commentNodes = this.props.data.map(function (comment) {
            return (React.createElement(CommentItem, {author: comment.author, key: comment.id}, comment.text));
        });
        return (React.createElement("div", {className: "commentList"}, commentNodes));
    };
    return CommentList;
}(React.Component));
;
var CommentItem = (function (_super) {
    __extends(CommentItem, _super);
    function CommentItem() {
        _super.apply(this, arguments);
    }
    CommentItem.prototype.render = function () {
        return (React.createElement("div", {className: "comment"}, React.createElement("h2", {className: "commentAuthor"}, this.props.author), this.props.children));
    };
    return CommentItem;
}(React.Component));
var data = [
    { id: 1, author: "Pete Hunt!!", text: "This is one comment!!!" },
    { id: 2, author: "Jordan Walke!!", text: "This is *another* comment!!!" }
];
ReactDOM.render(React.createElement(CommentBox, {url: "/home/api", pollInterval: 200000}), document.getElementById('content'));
//# sourceMappingURL=test.js.map
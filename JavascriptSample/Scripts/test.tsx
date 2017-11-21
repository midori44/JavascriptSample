import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Test {
}

interface CommentFormProps {
    author: string;
    text: string;
}
class CommentForm extends React.Component<any, any> {
    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        let author = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["author"]).value.trim();
        let text = ReactDOM.findDOMNode<HTMLInputElement>(this.refs["text"]).value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        ReactDOM.findDOMNode<HTMLInputElement>(this.refs["author"]).value = '';
        ReactDOM.findDOMNode<HTMLInputElement>(this.refs["text"]).value = '';
        return;
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this) }>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Say something..." ref="text" />
                <input type="submit" value="Post" />
            </form>
        );
    }
}

interface CommentBoxProps {
    url: string;
    pollInterval: number;
}
class CommentBox extends React.Component<CommentBoxProps, any> {
    constructor(props: CommentBoxProps) {
        console.log(props);
        super(props);
        this.state = { data: [] };
    }
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            type: 'POST',
            success: data => this.setState({ data: data }),
            error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(() => this.loadCommentsFromServer(), this.props.pollInterval);
    }
    handleCommentSubmit(comment) {
        let comments = this.state.data;
        let newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: data => this.setState({ data: data }),
            error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
        });
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this) } />
            </div>
        );
    }
};

interface CommentListProps {
    data?: CommentItemProps[];
}
class CommentList extends React.Component<CommentListProps, any> {
    render() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <CommentItem author={comment.author} key={comment.id}>
                    {comment.text}
                </CommentItem>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
};

interface CommentItemProps {
    id?: number;
    author?: string;
    text?: string;
}
class CommentItem extends React.Component<CommentItemProps, any> {
    render() {
        return (
            <div className="comment">
                <h2 className="commentAuthor">{this.props.author}</h2>
                {this.props.children}
            </div>
        );
    }
}

var data = [
    { id: 1, author: "Pete Hunt!!", text: "This is one comment!!!" },
    { id: 2, author: "Jordan Walke!!", text: "This is *another* comment!!!" }
];

ReactDOM.render(
    <CommentBox url="/home/api" pollInterval={200000} />,
    document.getElementById('content')
);

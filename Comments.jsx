data = [
<<<<<<< HEAD
	{author: "Pete Hunt", text: "This is "}
]
=======
	{author: "Pete Hunt", text: "This is a comment"}
];
>>>>>>> c2bc1b2507fc3114fca7cc60786fbe1b3686dcb5

CommentBox = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData: function() {
		Meteor.subscribe("commentsForStory", this.props.story);
		return {comments: Comments.find({story: this.props.story}).fetch()};
	},
	handleCommentSubmit: function (comment) {
		//calling a method updates the browser view immediately
		Meteor.call("addComment", this.props.story, comment, function (err) {
			if (err) {
				consle.error("failed to add comment", err);
				//but if the call fails, the comment will automatically disappea
			}
		});
	},
	setScript: function() {
		return {__html: "<script src='https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.min.js'></script>"};
	},

	render: function() {
		return (
			<div className="container">
				//<div className="setScript" dangerouslySetInnerHTML={this.setScript()} />
				<div className="CommentBox">
					<h1>Comments</h1>
					<CommentList data={this.data.comments} />
					<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
			</div>
		)
	}
});


CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				<Comment author="John Doe">This is a comment.</Comment>
				<Comment author="Jane Doe">This is also a comment.</Comment>
			</div>
		);
	}
});

CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				Hello, world! I am a CommentForm.
			</div>
		);
	}
});

Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<h3 className="commentAuthor">
					{this.props.author}
				</h3>
				{marked(this.props.children.toString())}
			</div>
		);
	}
});
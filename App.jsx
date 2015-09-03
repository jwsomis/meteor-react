//App component - represents the whole app
App = React.createClass({
	//This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	getInitialState() {
		return {
			hideCompleted: false
		}
	},

	//Loads items from the Tasks collection and puts them on this.data.tasks
	getMeteorData() {
		let query = {};

		if (this.state.hideCompleted) {
			//If hide completed is checked, filter tasks
			query = {checked: {$ne: true}};
		}

		return {
			tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
			incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
			currentUser: Meteor.user()
		};

		/*return {
			tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
		}*/
	},

	renderTasks() {
		return this.data.tasks.map((task) => {
			return <Task key={task._id} task={task} />
		});
	},

	handleSubmit(event) {
		event.preventDefault();

		//Find the text field via the React red
		var text = React.findDOMNode(this.refs.textInput).value.trim();

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});

		//Clear form
		React.findDOMNode(this.refs.textInput).value = "";
	},

	toggleHideCompleted() {
		this.setState({
			hideCompleted: ! this.state.hideCompleted
		});
	},

	render() {
		return (
			<div className="container">
				<header>
					<label className="hide-completed">
						<input type="checkbox" readOnly={true} checked={this.state.hideCompleted} onClick={this.toggleHideCompleted} />
						Hide Completed Tasks
					</label>

					<AccountsUIWrapper />

					<h1>Todo List ({this.data.incompleteCount})</h1>

						{/*new task from*/}
					{ this.data.currentUser ?
						<form className="new-task" onSubmit={this.handleSubmit} >
							<input type="text" ref="textInput" placeholder="Type to add new tasks" />
						</form> : ''
					}

				</header>

				<hr />
				<div className="task-list">
					<ul>
						{this.renderTasks()}
					</ul>
				</div>

				<hr />
			</div>
		);
	}
});
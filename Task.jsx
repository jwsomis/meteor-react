Task = React.createClass({
	propTypes: {
		//This component gets the task to display through a React prop
		//We can use propTypes to indicate it is required
		task: React.PropTypes.object.isRequired,
		showPrivateButton: React.PropTypes.bool.isRequired		
	},

	toggleChecked() {
		//Set the checked property to the opposite of its current value
		Meteor.call("setChecked", this.props.task._id, ! this.props.task.checked);
		/*Tasks.update(this.props.task._id, {
			$set: {checked: ! this.props.task.checked}
		});*/
	},

	deleteThisTask() {
		Meteor.call("removeTask", this.props.task._id);
		/*Tasks.remove(this.props.task._id);*/
	},

	togglePrivate() {
		Meteor.call("setPrivate", this.props.task._id, ! this.props.task.private);
	},

	render() {
		//Give tasks a different className when they are checked off,
		//so that we can style them nicely
		//Add "checked" and or "private" to the className when needed
		const taskClassName = (this.props.task.checked ? "checked" : "") + " " + (this.props.task.private ? "private" : "");

		return (
			//<li>{this.props.task.text}</li>
			<li className={taskClassName}>
				<button className="delete btn btn-default btn-sm" onClick={this.deleteThisTask}>
					&times;
				</button>

				<input type="checkbox" readOnly={true} checked={this.props.task.checked} onClick={this.toggleChecked} />

				{ this.props.task.username ?
					<span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span> : 
					<span className="text">{this.props.task.text}</span>
				}

				{ this.props.showPrivateButton ? (
					<button className="toggle-private btn" onClick={this.togglePrivate}>
						{ this.props.task.private ? "Private" : "Public" }
					</button>
				) : '' }
			</li>
		);
	}
});

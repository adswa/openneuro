// dependencies -------------------------------------------------------

import React      from 'react';
import Reflux     from 'reflux';
import userStore  from '../user/user.store';
import adminStore from './admin.store';
import actions    from './admin.actions'
import Input      from '../common/forms/input.jsx';
import {Panel}    from 'react-bootstrap';
import scitran    from '../utils/scitran';
import WarnButton from '../common/forms/warn-button.jsx';

let users = React.createClass({

	mixins: [Reflux.connect(adminStore)],

// life cycle events --------------------------------------------------

	componentDidMount () {
		actions.getUsers();
		actions.clearForm('newUserForm');
	},

	render () {
		let showDeleteBtn = this.state.showDeleteBtn;
		let newUser = this.state.newUserForm;

		let users = this.state.users.map((user, index) => {
			let adminBadge = user.wheel === true ? 'Admin' : null;

	        let adminToggle;
	        if (user._id !== userStore.data.scitran._id) {
	        	adminToggle = <WarnButton message="Toggle Admin Privileges" confirm="Toggle Admin" icon="fa-user-plus" action={actions.toggleSuperUser.bind(this, user)}/>;
	        }

			return (
			    <div className="fadeIn user-panel clearfix" key={user._id}>
                    <div className="col-sm-4 user-col">
                    	<h3>
                    		<div className="userName">
								<span>{user.firstname}</span> &nbsp;
								<span>{user.lastname}</span>
								<div className="badge">{adminBadge}</div>
							</div>
                    	</h3>
                    </div>
                    <div className="col-sm-4 user-col middle">
	                    <h3 className="user-email">{user._id}</h3>
                    </div>
                    <div className="col-sm-4 user-col last">
	                    <h3 className="user-delete">
		                    <WarnButton message="Delete this User" action={actions.removeUser.bind(this, user._id, index)}/>
		                    {adminToggle}
	                    </h3>
                    </div>
                </div>
			);
		});

		return (
			<div className="dash-tab-content fadeIn inner-route admin clearfix">
				<h2>Current Users</h2>
				<div>
					<div className="col-sm-4 add-user">
						<div>
							<h2>Add User</h2>
							{this._newUserError()}
							<Input placeholder="gmail address" type="text"  value={newUser._id}       name={'_id'}       onChange={this._inputChange} />
							<Input placeholder="first name"    type="text"  value={newUser.firstname} name={'firstname'} onChange={this._inputChange} />
							<Input placeholder="last name"     type="text"  value={newUser.lastname}  name={'lastname'}  onChange={this._inputChange} />
				    		<button className="btn-blue" onClick={actions.addUser} >
								<span>Add User</span>
							</button>
						</div>
					</div>
					<div className="col-sm-8 users-card">
						{users}
					</div>
				</div>
			</div>
    	);
	},

// custom methods -----------------------------------------------------

	_newUserError() {
		return this.state.newUserError ? <div className="alert alert-danger">{this.state.newUserError}</div> : null;
	},

	_inputChange(e) {actions.inputChange('newUserForm', e.target.name, e.target.value);},

});

export default users;
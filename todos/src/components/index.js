import Login from './login';
import Modal from 'react-modal';
import React, { Component } from 'react';

const WithLogin = Login();

Modal.setAppElement('#root');

class Index extends Component {

  	constructor() {
		super();

		this.state = {

		
		};

  	}

 	render() {
		return (
			<div className="index-page">
			
				<div className="sign-up-login-wrapper">

					<WithLogin />

				<a href="/signup">
					<div className="sign-up-login-button">
					SIGN UP
					</div>
				</a>
				</div>
				
			</div>
		);
 	}
}

export default Index;

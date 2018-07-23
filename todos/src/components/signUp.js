import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

let userDetails = {
	name : '',
	email : '',
	password : '',
	re_password : ''
};

class SignUp extends Component {

	constructor() {
		super();

		this.state = {
			isSignedUp : false
		}
	}

	setName = (name) => {
		userDetails.name = name.target.value;
		document.getElementById('name').innerHTML = "";
	}

	setEmail = (email) => {
		userDetails.email = email.target.value;
		document.getElementById('email').innerHTML = "";		
	}

	setPassword = (password) => {
		userDetails.password = password.target.value;
		document.getElementById('password').innerHTML = "";
	}

	setRePassword = (rePassword) => {
		userDetails.re_password = rePassword.target.value;
		if( userDetails.re_password !== userDetails.password )
			document.getElementById('re_password').innerHTML = "Password not matched";

		else
			document.getElementById('re_password').innerHTML = "";

	}

	signUp = () => {

		const formField = ['Name','Email','Password','re_password'];

		formField.forEach(( field ) => {
			
			if( userDetails[ field.toLowerCase() ] === '' ){
				const $elem = document.getElementById( field.toLowerCase() );
				const msg = (field === 're_password') ? 'Confirm Password' : field;
				$elem.innerHTML = msg + " cannot be empty";
		
			}
			
		});

		if(userDetails.password === userDetails.re_password) {

			if( userDetails.name !== '' && userDetails.email !== '' && userDetails.password !== '' ) {

				this.registerUser();
			}
		}
	}

	registerUser = () => {
		
		axios({
			method: "post",
			url: "http://127.0.0.1:8848/api/users/",
			data: {
			  	name: userDetails.name,
			  	email: userDetails.email,
			  	password: userDetails.password,
			  	is_active: "1"
			},
			config: {
				headers: { "Content-Type": "application/json" }
			}
		})
		.then( (response) => {
			
			if (response.status === 201) {
				
				document.getElementById('signup_succss').innerHTML = "Account created! Please login from login page.";
				this.setState({ isSignedUp: true });

			}
		});
	}

	render() {
		return (
			<div>
				{( this.state.isSignedUp ) ?
					(<Redirect to={{ pathname: "/" }} />) :
					( <div className="sign-up-form">
						<div className="form-title">
							<h1>Sign<span>Up</span></h1>
						</div>
						<hr className="hr-design"/>
						<form>
							<span className="form-success" id="signup_succss" ></span>
							<input onChange={ (name) => this.setName(name) } type="text" placeholder="Full Name"/>
							<span className="form-error" id="name" ></span>

							<input onChange={ (email) => this.setEmail(email) } type="email" placeholder="Email"/>
							<span className="form-error" id="email" ></span>

							<input onChange={ (password) => this.setPassword(password) } type="password" placeholder="Password"/>
							<span className="form-error" id="password" ></span>

							<input onChange={ (rePassword) => this.setRePassword(rePassword) } type="password" placeholder="Confirm Password"/>
							<span className="form-error" id="re_password" ></span>

						</form>
						<div className="signup-submit-button" onClick={ ()=> this.signUp() } >SIGN UP</div>

						<hr className="hr-design"/>
						<div className="signup-footer" >
							<p>Already have account? <a href="/">Login here</a></p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default SignUp;

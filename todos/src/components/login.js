import React from 'react';
import Modal from 'react-modal';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

const customStyles = {
    content : {
      top         : '50%',
      left        : '50%',
      right       : 'auto',
      bottom      : 'auto',
      marginRight : '-50%',
      transform   : 'translate(-50%, -50%)',
      background  : '#aabef8ec'
    }
};

const Login = Component => {

    class Login extends React.Component {

        constructor() {
            super();
            
            this.state = {
                email: '',
                message:'',
                password: '',
                isLogedIn: false,
                modelIsOpen: false,
            }
        }

        // SET EMAIL STATE
        setEmail = (email) => {
            this.setState({
              email:email.target.value
            })
        }
        
        // SET PASSWORD STATE
        setPassword = (password) => {
            this.setState({
              password:password.target.value
            })
        }
        
        // MODAL BOX OPENER
        openModal= () => {
            this.setState({modalIsOpen: true});
        }
        
        // MODAL BOX CLOSER
        closeModal = () => {
            this.setState({modalIsOpen: false});
        }
        
        // LOGIN REQUEST TO SERVER
        login = () => {
        
            fetch('http://127.0.0.1:8848/api/users/login/',  {
              method: "GET",
              headers: {
                'email': this.state.email,
                'password': this.state.password
              }
            })
            .then( response => response.json())
            .then( loginCredentials => {
               
              if(loginCredentials.error){
                this.setState({ message:loginCredentials.error.message });
                return;
              } 
              
              this.onLogedIn( loginCredentials );
            });
            
        }
        
        // ON LOGEDIN CALLS AUTH METHOD TO SAVE TOKEN
        onLogedIn = ( loginCredentials ) => {
        
            Auth.authenticate(loginCredentials);

            this.setState({ isLogedIn: true })
        }

        componentWillReceiveProps(nextProps) {

            console.log(nextProps)
        } 

        render() {   
           
            return  <div>{
                    ( Auth.getToken() !== null ) ? 
                    <Redirect to={{ pathname: "/dashboard" }} /> :
                    ( <Modal
                        isOpen={ this.state.modalIsOpen }
                        onAfterOpen={ this.afterOpenModal }
                        onRequestClose={ this.closeModal }
                        style={ customStyles }
                    >

                    <div className="model-box-title-close">
                        <h2>Login with your credentials</h2>
                        <h3 onClick={ this.closeModal }>x</h3>
                    </div>
                        
                    <form className="login-form">
                        <input onChange ={ (email)=> this.setEmail(email) } type="email" placeholder="Email"/>
                        <input onChange ={ (password)=> this.setPassword(password) } type="password" placeholder="Password"/>
                        <div className="login-submit-button" onClick={ ()=> this.login() } >LOGIN</div>
                    </form>
                    <div className="login-msg">
                        <span> { this.state.message } </span>
                    </div>
                    
                    </Modal> )
                    }
                    <div onClick = { this.openModal } className="sign-up-login-button">
                     LOGIN
                    </div>
                </div>;
        }
    }

    return Login;
}

export default Login;
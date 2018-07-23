import React from 'react';
import Auth from '../utils/auth';
import { Redirect, Link } from 'react-router-dom';

class Navbar extends React.Component {

    constructor() {
        super();

        this.state = {
            logOut: false
        }
    }

    signOut = () => {

        Auth.clearToken();

        this.setState({ logOut: true })
    }

    render() {
        return (
            ( Auth.getToken() === null ) ? 
            <Redirect to={{ pathname: "/" }} /> :
            (<div className="navbar-wrapper">
                <div className="top-navbar clearfix">

                    <div className="navbar-logo" >
                        <Link to={{ pathname: "/dashboard" }} >MyTodo</Link>
                    </div>
                    <ul>
                        <li> <Link to={{ pathname: "/dashboard" }} >Home </Link> </li>
                        <li> <Link to={{ pathname: "/todos" }} >Todos </Link> </li>
                        {/* <li> <Link to={{ pathname: "/dashboard" }} >ABOUT </Link> </li> */}
                        {/* <li> <Link to={{ pathname: "/dashboard" }} >CONTACT </Link> </li> */}
                    
                    </ul>
                   
                    <div className="navbar-right">
                        <ul>
                            <li>
                                { Auth.getUserDetails() } <img src={ require('../images/downarrow.png')} alt="down arrow"/>
                                <ul>
                                    <li onClick={ () => this.signOut() }>Log out</li>
                                    <li>Setting</li>           
                                </ul>
                            </li>
                            {/* <li><a href="#">Balance - 0</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>) 
        )
    }
}

export default Navbar;
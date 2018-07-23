import Auth from '../utils/auth';
import React from 'react';
import Navbar from './navbar';
class Dashboard extends React.Component {

    render() {
        console.log(Auth.getUserDetails('id'))
        return <div className="container">
                <Navbar />
                <div className="body-wrapper">
                
                    WELCOME TO TODOS { Auth.getUserDetails() }
                </div>
            </div>
        
    }
}

export default Dashboard;
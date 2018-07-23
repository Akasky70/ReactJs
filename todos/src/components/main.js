import React from 'react';
import Index from './index';
import SignUp from './signUp';
import Todo from './todos/todos';
import Dashboard from './dashboard';
import PrivateRoute from './privateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Main extends React.Component {  
    render() {
       
        return <div>
            <Router>
                <Switch>
                    <Route exact path = '/' component={ Index } />
                    <Route exact path = '/signup' component={ SignUp } />
                    <PrivateRoute exact path = '/dashboard' component={ Dashboard } />
                    <PrivateRoute exact path = '/todos' component={ Todo } />
                </Switch>
            
            </Router>
        </div>
    }
}
  
export default Main;
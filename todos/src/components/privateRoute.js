import React from 'react';  
import { Redirect, Route } from 'react-router-dom';

// Utils
import Auth from '../utils/auth';

const PrivateRoute = ( { component: Component, ...rest }) => (  
   
    <Route {...rest} render={ props => (

        ( Auth.getToken() !== null ) ?
        ( <Component {...props} /> ) : 
        ( <Redirect to={{ pathname: "/" }}/> )
        
    )} />
);

export default PrivateRoute; 
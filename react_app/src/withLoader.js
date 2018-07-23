import React from 'react';
import Loader from './Loader'

const withLoader = Component => {

    class LoaderComponent extends React.Component {

        render() {
            
            return ( this.props.list.length ) ?
                <Component {...this.props} /> : 
                <tr className="data-not-found">
                    <td colSpan="7">
                        <Loader/>
                    </td>
                </tr>;

        }
    }

    return LoaderComponent;
}

export default withLoader;
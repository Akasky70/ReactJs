import React from 'react';

const withLoader = Component => {

    class LoaderComponent extends React.Component {

        render() {
            
            return ( this.props.list.length ) ?
                <Component {...this.props} ></Component>: 
                <tr className="data-not-found">
                    <td colSpan="7">
                        LOADING . . .
                    </td>
                </tr>;

        }
    }

    return LoaderComponent;
}

export default withLoader;
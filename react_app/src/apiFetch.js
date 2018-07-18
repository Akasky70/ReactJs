import React from 'react';

const URL = ' http://127.0.0.1:8848/api/todo';
let Data = null;
class ApiFetch extends React.Component {

    constructor() {
        super();

        this.state = ({

            isLoaded: false
        })

    }

    componentDidMount() {

        fetch(URL)
        .then((response) => {
            return response.json();
        })
        .then((myTodos) => {

            Data =  myTodos;

            this.setState({

                isLoaded:true
            })
        })
    }

    render() {
        return <div> 
            
            { ( this.state.isLoaded) ? JSON.stringify(Data) : "Loading" }

        </div>
    }
}

export default ApiFetch;
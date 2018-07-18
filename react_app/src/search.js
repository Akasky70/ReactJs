import React from 'react';
import Data from './data/data';

const Person = ({ name }) => <li>{ name } </li>;

class Search extends React.Component {

    constructor() {
        super();

        this.state = {

            keyword:'',
            people: [
                { id: 1, name:'Jhon'},
                { id: 1, name:'Jhonny'},
                { id: 1, name:'Hary'},
                { id: 1, name:'Robert'},
                { id: 1, name:'Alex'},
                { id: 1, name:'Jane'}
            ]
        }

    this.handleInput = this.handleInput.bind(this);

    }

    handleInput(event) {

        this.setState({
            
            keyword : event.target.value,
        })
    }


    render() {
       
        return <div> 
            <input onChange={ (event) => this.handleInput(event) }/>
            <div >
                { Data.filter(
                    (people) => people.name.toLowerCase().includes(this.state.keyword.toLowerCase()))
                    
                    .map((person, index) => <Person key={ index } { ...person } />)}
            </div>
        </div>;
    }

}

export default Search;
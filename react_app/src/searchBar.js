import React from 'react';

class SearchBar extends React.Component {

    constructor() {
        super();
    }

    updateQuery = () => {

    }

    setApiQuery = ()=>{}

    render() {

        return (<div>
                <select  >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <input onChange={(input) => this.updateQuery(input) } placeholder="Type keyword to search" />
                <button onClick={() => this.setApiQuery() } className="search-button" >Search </button>
            </div>)
    }
}

export default SearchBar;
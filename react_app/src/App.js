// import Search from './search';
import Todos from './todosRender';
// import ApiFetch from './apiFetch';
// import FilterData from './filterData';
import React, { Component } from 'react';
// import MyComponent from './myComponent';
// import AssignmentOne from './assignment1';

let query = null;

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      name: '',
      query:''
    }

    this.setName = this.setName.bind(this);
    this.setApiQuery = this.setApiQuery.bind(this);
  }

  setName(name) {
    this.setState({
      name: name,
     
    });
  }

  updateQuery(input) {
   
    query = input.target.value
   
  }

  setApiQuery() {

    this.setState({
      query:query
    })
  }

  render() {
    return (
      <div className="App">
        {/* <MyComponent country="ABCd" sendNameToParent={this.setName}/>
        <p>{this.state.name}</p> */}

        {/* <AssignmentOne/>         */}

        {/* <Search/> */}

        {/* <FilterData/> */}

        {/* <ApiFetch/> */}

        <div className="filter-table-container clearfix">
                
          <div>
            <select  >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>

            <input onChange={(input) => this.updateQuery(input) } placeholder="Type keyword to search" />
            <button onClick={() => this.setApiQuery() } className="search-button" >Search </button>
          </div>
          <div id="data-table">
              <table className="filter-table">
                <thead>
                  <tr className="table-header">
                      <td width="40">ID</td>
                      <td width="200">Title</td>
                      <td width="200">Description</td>
                      <td width="150">Category</td>
                      <td width="150">Status</td>
                      <td width="100">Edit</td>
                      <td width="100">Delete</td>
                  </tr>
                </thead>
                <tbody>

                  <Todos query={ this.state.query }/>

                </tbody>
              </table>
              <div className="page-number">
                    <span>1</span>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
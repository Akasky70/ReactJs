// import Search from './search';
import FilterData from './filterData';
import React, { Component } from 'react';
// import MyComponent from './myComponent';
// import AssignmentOne from './assignment1';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: ''
    }

    this.setName = this.setName.bind(this);
  }

  setName(name) {
    this.setState({
      name: name
    });
  }

  render() {
    return (
      <div className="App">
        {/* <MyComponent country="ABCd" sendNameToParent={this.setName}/>
        <p>{this.state.name}</p> */}

        {/* <AssignmentOne/>         */}

        {/* <Search/> */}

        <FilterData/>
      </div>
    );
  }
}

export default App;
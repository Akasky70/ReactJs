import React from 'react';

const person = {
    name: 'JOHN',
    hobbies: {
        firstHobby: {
            name: 'Games'
        },
        secondHobby: {
            name: 'Food'
        }
    }
}

class MyComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            name: 'John',
            age: 30,
            value: '',
        }

        this.handleClick = this.handleClick.bind(this);

        this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        this.props.sendNameToParent(this.state.age);
    }

    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }

    setValue(event) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return <div
            onClick={() => this.handleClick()}>
            <p>Hello my name is <strong>{this.state.name}</strong>.</p>
            <p>I am <strong>{this.state.age}</strong> years old.</p>
            <p>I am from <strong>{this.props.country}</strong>.</p>
            <input onChange={event => this.setValue(event)}/>
            {this.state.value}
        </div>
    }
}

export default MyComponent;


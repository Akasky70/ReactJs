import React from 'react';

class AssignmentOne extends React.Component {

    constructor() {

        super();

        this.state = {
            formName : 'Details Form',
            formData: { }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(input) {

        let formData = this.state.formData;
        let name = input.target.name;
        let value = input.target.value;

        formData[name] = value;

        this.setState({ formData });

    }

    // setFormData(event) {
       
    //     this.setState({
    //         name: event.target.name
    //     })
    // }

    render() {

        return <div className="details-form">
                <h1> { this.state.formName } </h1> 
                <table className="form-table" >
                    <tbody>
                    <tr>
                        <td> <label>Name </label> </td>
                        <td> <input name="name" onChange={ (input)=> this.handleInputChange(input) } autoComplete="off"/><br/> </td>
                    </tr>

                    <tr>
                        <td> <label>Address </label> </td>
                        <td> <input name="address" onChange={ (input)=> this.handleInputChange(input) } autoComplete="off"/><br/> </td>
                    </tr>

                    <tr>
                        <td> <label>Email </label> </td>
                        <td> <input name="email" onChange={ (input)=> this.handleInputChange(input) } autoComplete="off"/><br/> </td>
                    </tr>

                    <tr>
                        <td> <label>Phone </label> </td>
                        <td> <input name="phone" onChange={ (input)=> this.handleInputChange(input) } autoComplete="off"/><br/> </td>
                    </tr>
                    <tr > 
                        <td colSpan="2"> 
                            <button  className="submit-bottom">SUBMIT</button> 
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div>
                    <p> Name : {this.state.formData.name } </p>
                    <p> Address : {this.state.formData.address } </p>
                    <p> Email : {this.state.formData.email } </p>
                    <p> Phone : {this.state.formData.phone } </p>
                </div>
               
            </div>;
    }
}

export default AssignmentOne;
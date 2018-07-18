import React from 'react';
import Employees from './data/data';

const Employee = ({ name, gender, company }) => 
    <tr className="table-body-tr">
        <td>{ name } </td>
        <td>{ gender } </td>
        <td>{ company } </td>
    </tr>;

class FilterData extends React.Component {

    constructor() {
        super();

        this.state = {
            query:'',
            perPage:10,
            currentPage:1,
            currentEmployees: Employees.slice(0, 10),
            pages: Array.from(new Array( Math.ceil(Employees.length/10) ),(val,index)=>index+1)
        };
        
        this.sortData = this.sortData.bind(this);
        this.dataCount = this.dataCount.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.setSearchQuery = this.setSearchQuery.bind(this);
        
    };
    
    // FUNCTION TO CALCULATE DATAS, PAGES, PAGENUMBERS
    dataCount(count) {
        
        let pages = 0,
            dataFrom = 0,
            dataUpto = 0,  
            currentEmployees = [],
            currentPage = this.state.currentPage ,
            inputCount = (count) ? parseInt(count.target.value) : this.state.perPage;
        
        pages = Array.from(new Array( Math.ceil(Employees.length / inputCount) ),(val,index)=>index+1);

        dataFrom = (currentPage - 1) * inputCount;
        dataUpto = dataFrom + inputCount;
      
        currentEmployees = Employees.slice( dataFrom, dataUpto );

        this.setState({ 
            pages,
            currentEmployees,
            perPage:inputCount
        });
    }
   
    // FUNCTION TO SET SEARCH QUERY IN STATE
    setSearchQuery(query) {

        this.setState({
            query:query.target.value
        });

        // let text = document.getElementById("data-table").innerHTML;
        // let textArr = text.split("");

        // var pattern = new RegExp("("+query.target.value+")", "gi");
        // var new_text = text.replace(pattern, "<span class='highlight'>"+query.target.value+"</span>");
        //     document.getElementById("data-table").innerHTML = new_text;
         
      
        // textArr.filter((word) => word.name.toLowerCase().includes(query.target.value.toLowerCase()));
    }   

    // FUNCTION THAT UPDATE CURRENTPAGE NUMBERS
    async updatePage(page) {

        let $elem = document.getElementById(this.state.currentPage);
            if( $elem ) $elem.classList.remove("active");

        await this.setState({

            currentPage: page
        });

        $elem = document.getElementById(page);
        $elem.classList.add("active");

        this.dataCount();
    }

    // SORTING DATA
    sortData() {
        alert();
    }

    // RENDER FUNCTION OF REACT FROM WHERE VIEW IS RENDERED
    render() {

        return <div className="filter-table-container clearfix">
                
                <select onChange={ (count) => this.dataCount(count)} >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>

                <input onChange={(query) => this.setSearchQuery(query) } placeholder="Type keyword to search" />
                <div id="data-table">
                    <table className="filter-table">
                        <thead>
                            <tr className="table-header">
                                <td >Name</td>
                                <td>Gender</td>
                                <td>Company</td>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.currentEmployees
                                .filter((employee) => 
                                    employee.name.toLowerCase().includes(this.state.query.toLowerCase())
                                    || employee.gender.toLowerCase().startsWith(this.state.query.toLowerCase())            
                                    || employee.company.toLowerCase().includes(this.state.query.toLowerCase()) 
                                )
                                .map(function( employee, index) {
                                    
                                    if(employee)
                                        return <Employee key={ index } { ...employee } /> ;
                                    else
                                        <h2>NO DATA</h2>
                                    }
                                )}
                        </tbody>
                    </table>
                </div>
                <div className="page-number">
                   { this.state.pages.map(( page ) => 
                        <span key={ page } id={ page }  onClick={ ()=> this.updatePage( page ) } >{ page }</span>
                    )}

                    <div className="total-data-count">
                    Viewed <span>{ 
                            ( this.state.perPage * this.state.currentPage > Employees.length ) 
                            ? Employees.length :
                            this.state.perPage * this.state.currentPage }
                         </span> out of <span>{ Employees.length }</span>
                    </div> 
                </div>
            </div>
    }
}

export default FilterData;
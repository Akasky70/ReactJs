import React from 'react';
import Navbar from '../navbar';
import WithLoader from './withLoader';
import FetchingTodos from './fetchingTodos';

import './todo.css';

const List = ({ list = [] }) => (
   
    list.map((item, i) => {
        
        if(item.title){
            return (
                <tr key = { i } className="table-body-tr">
                    <td > { i+1 } </td>
                    <td > { item.updatedAt } </td>
                    <td > { item.title } </td>
                    <td > { item.description } </td>
                    <td > { item.hasCategory.map((item) => item.name ) }</td>
                    <td > { (item.isCompleted) ? 'Completed' : 'Pending' } </td>
                    <td > 
                        <div className="action-icon" onClick={ () => this.todoAction( item.id, 'edit' )} > 
                            <img src= { require('../../images/edit.png')} alt="edit png"/> 
                        </div>
                    </td>
                    <td >
                        <div className="action-icon" onClick={ () => this.todoAction( item.id, 'delete' ) } > 
                            <img src={require('../../images/delete.png')} alt="delete png" /> 
                        </div>
                    </td>
                </tr>
            )
        } else {
            return <tr key={ i } className="data-not-found"><td colSpan="7">{ item.message }</td></tr>
        }
    })
);

const ListOfFetchData =  FetchingTodos( WithLoader(List));
let query = null;

class Todo extends React.Component {
    constructor() {
        super();

        this.state = ({

            query :'',
            pages: [],
            perPage:10,
            sortBy:'ASC',
            currentPage:1,
            totalData : 0,
            segment:'todo',
            sortFrom:'title',
        });
    };

    // GENERATE NEW URL AS PER QUERY
    generateUrlSegment = () => {

        let finalSegments = this.state.segment;
        if( this.state.query!=='' || this.state.currentPage || this.state.perPage) finalSegments +="?";
        if( this.state.query!=='' ) finalSegments +="&title="+ this.state.query;
        if( this.state.currentPage ) finalSegments +="&page="+this.state.currentPage;
        if( this.state.perPage ) finalSegments +="&perpage="+this.state.perPage;
        if( this.state.sortFrom ) finalSegments +="&sortfrom="+this.state.sortFrom;
        if( this.state.sortBy ) finalSegments +="&sortby="+this.state.sortBy;

        return finalSegments;
    }

    // UPDATE QUERY FOR SEARCH
    updateQuery = (input) => {
        query = input.target.value
    }

    // SETS QUERY TO STATE ON CLICK TO RENDER SEARCH
    setApiQuery = () => {

        this.setState({
          query:query
        })
    }

    // UPDATES PERPAGE VALUE LIMIT
    updatePerPage = async (select) => {

        await this.setState({
            perPage:select.target.value
        });

        this.createPages();
    }

    // GET PAGES FRO CHILD
    setPages = async ( metadata ) => {

        let totalData = parseInt(metadata.totalData.fulfillmentValue, 10);
       
        await this.setState({
            currentPage: metadata.page,
            totalData: totalData
        });

        this.createPages();
    }

    // CREATE PAGES
    createPages = () => {

        let perPage = this.state.perPage;
        let totalData = this.state.totalData;

        let pages = Array.from(new Array( Math.ceil( totalData / perPage ) ),(val,index)=>index+1);
       
        this.setState({
            pages: pages
        });
    }

    // UPDATE PAGE NUMBER WHILE CLICKING ON PAGINATION
    updatePage = (page) => {

        let $elem = document.getElementById(this.state.currentPage);
        if( $elem ) $elem.classList.remove("active");
        
        this.setState({
            currentPage:page
        });

        $elem = document.getElementById(page);
        $elem.classList.add("active");
    }


    // SORTING QUERY SET FUNCTION
    sortData = (sortFrom) => {
        
        let sortBy = ( this.state.sortBy === 'ASC') ? "DESC" : "ASC";
        this.setState({
            sortBy:sortBy,
            sortFrom: sortFrom
        });
    }

    render() {

        return <div>
            <Navbar />
            <div className="body-wrapper">
                <h2>MyTodos</h2>
                <div className="filter-table-container clearfix">
                    <div>
                        <select onChange={ (select) => this.updatePerPage(select) } >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                        <input onChange={(input) => this.updateQuery(input) } placeholder="Type keyword to search" />
                        <button onClick={() => this.setApiQuery() } className="search-button" >Search </button>
                    </div>
                    <div id="data-table">
                        <table className="filter-table">
                            <thead>
                                <tr className="table-header">
                                    <td width="40">ID</td>
                                    <td width="200" onClick={ () => this.sortData('updated_at') } >
                                        Date
                                        <div className="sort-icon">
                                            <img src={ require('../../images/downarrow.png')} alt="down arrow"/>
                                        </div>
                                    </td>
                                    <td width="200" onClick={ () => this.sortData('title') }  >
                                        Title
                                        <div className="sort-icon">
                                            <img src={ require('../../images/downarrow.png')} alt="down arrow"/>
                                        </div>
                                    </td>
                                    <td width="200" onClick={ () => this.sortData('description') } >
                                        Description
                                        <div className="sort-icon">
                                            <img src={ require('../../images/downarrow.png')} alt="down arrow"/>
                                        </div>
                                    </td>
                                    <td width="150">Category</td>
                                    <td width="150">Status</td>
                                    <td width="100">Edit</td>
                                    <td width="100">Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                <ListOfFetchData query={ this.generateUrlSegment() } setPages = { this.setPages }/>
                            </tbody>
                        </table>
                    </div>

                    <div className="page-number">
                        { this.state.pages.map(( page ) => 
                            <span key={ page } id={ page }  onClick={ ()=> this.updatePage( page ) } >{ page }</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    }
}

export default Todo;
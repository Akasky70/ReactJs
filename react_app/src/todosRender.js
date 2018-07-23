import React from 'react';
import WithLoader from './withLoader';
import WithFetchingData from './withFetchingData';

const List = ({ list = [] }) => (
    
    list.map((item, i) => {
        
        if(item.title){
            return (
                <tr key = { i } className="table-body-tr">
                    <td > { i+1 } </td>
                    <td > { item.title } </td>
                    <td > { item.description } </td>
                    <td > { item.hasCategory.map((item) => item.name ) }</td>
                    <td > { (item.isCompleted) ? 'Completed' : 'Pending' } </td>
                    <td > 
                        <div className="action-icon" onClick={ () => this.todoAction( item.id, 'edit' )} > 
                            <img src= { require('./images/edit.png')} /> 
                        </div>
                    </td>
                    <td >
                        <div className="action-icon" onClick={ () => this.todoAction( item.id, 'delete' ) } > 
                            <img src={require('./images/delete.png')} /> 
                        </div>
                    </td>
                </tr>
            )
        } else {
            return <tr key={ i } className="data-not-found"><td colSpan="7">{ item.message }</td></tr>
        }
    })
);

const ListWithFetchingData =  WithFetchingData( WithLoader(List));

class TodoRender extends React.Component {

    constructor() {
        super();

        this.state = ({

            query :'',
            segment:'todo',

        });

        this.updateQuery = this.updateQuery.bind(this);
    };

    updateQuery() {

        this.setState({
            query:this.query.query
        })

    }

    componentWillReceiveProps( nextProps ) {

        if( this.props.query !== nextProps.query ){
            this.setState({
                query: nextProps.query
            })
        }
    }

    generateUrlSegment = () => {

        let finalSegments = this.state.segment;
        if( this.state.query!=='' ) finalSegments +="?title="+ this.state.query;

        return finalSegments;
    }

    render() {
        
        return <ListWithFetchingData query={ this.generateUrlSegment() }/>
                
            
                        
    }
}
  

export default TodoRender;
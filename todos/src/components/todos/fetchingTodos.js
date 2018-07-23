import React from 'react';
import axios from 'axios';
import Auth from '../../utils/auth';

const fetchingTodos = Component => {
    class FetchingDataComponent extends React.Component {

        constructor() {
        
            super();
            
            this.state = ({
                list:[],
                error:[],
                metadata:[],
                baseURL:'http://127.0.0.1:8848/api/'
            
            });
        }

        // FETCHING DATA WITH AXIOUS
        fetchData = ( fullUrl ) => {
           
            axios({
                method: "get",
                url: fullUrl,
                headers: {
                    "responseType": "json",
                    "authorization": Auth.getToken('accessToken'),
                    "refresh_token": Auth.getToken('refreshToken'),
                    "user_id": Auth.getUserDetails('id')
                }
            }) 
            .then( response => {
                
                this.setState({
                    list:response.data.data.todo,
                    metadata:response.data.data.metaData
                });
                this.sendMetadata();
            })
            .catch( err => {
                const error = [];
                
                error.push(err.response.data.error);

                this.setState({
                    list:error
                });
            });
        }

        // SENDING DATA TO PARENT CALLBACK METHOD
        sendMetadata = () => {

            this.props.setPages(this.state.metadata);
        }

        // QUERY IS ADDED AFTER COMPONENT MOUNTS
        componentDidMount() {

            let fullUrl = this.state.baseURL + this.props.query; 
            
            this.fetchData(fullUrl);

        }

        // SEARCH QUERY MOUNTS
        componentWillReceiveProps( nextProps ) {

            if(this.props.query !== nextProps.query) {
                let fullUrl = this.state.baseURL + nextProps.query;
                this.fetchData(fullUrl)
            }
        }

        render() {

            return <Component list = { this.state.list } />;
        }
    }
    return FetchingDataComponent;
}

export default fetchingTodos;
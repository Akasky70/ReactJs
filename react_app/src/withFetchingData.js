import React from 'react';

const withFetchingData = Component => {

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

        fetchData = ( fullUrl ) => {
            console.log(fullUrl)

            fetch(fullUrl)
            .then( response => response.json())
            .then( allData => {
                
                if(allData.error){
                   
                    const error = [];
                          error.push(allData.error);

                    this.setState({
                        list:error
                    })
                    return;
                }
                this.setState({
                    list:allData.data.todo,
                    metadata:allData.data.metaData
                });
            });

        }

        componentDidMount() {

            let fullUrl = this.state.baseURL + this.props.query; 
            // if(query) fullUrl += '?title='+query.query;
            
            this.fetchData(fullUrl);
        }

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

export default withFetchingData;
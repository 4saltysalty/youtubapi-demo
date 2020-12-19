import React from 'react';

import Collection from '../../components/collection/collection.component';
import { searchListVideo } from '../../youtube/youtube.v3.util';
import FAKE_DATA from '../../data'
import './homepage.styles.sass';

class HomePage extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            isLoaded: false,
            result: null
        };
    }

    componentDidMount(){

        let param = {
            part: "snippet,contentDetails",
            chart: "mostPopular",
            regionCode: "TW",
            maxResults: 12
        };
        searchListVideo(param)
            .then(result => {
                this.setState({
                    result, isLoaded: true
                })
            })
        
    }
  
    componentWillUnmount(){
  
    }

    render(){
        const { isLoaded, result } = this.state;
        if(!isLoaded){
            return (<div className="loading">Loading...</div>)
        }else{
            return (
                <div className="homepage">
                    <Collection result = {result} />
                    {/* <Pagination /> */}
                    
                </div>  
            )
        }
    }
}

export default HomePage;
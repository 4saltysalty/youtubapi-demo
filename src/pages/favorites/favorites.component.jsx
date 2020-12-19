import React from 'react';
import List from '../../components/list/list.component';
import { searchListVideo } from '../../youtube/youtube.v3.util';
import { VIDEO_COLLECTION } from '../../systemconfig';

import './favorites.styles.sass';

class FavoritesPage extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            empty: true,
            isLoaded: false,
            result: null
        };
        if(!localStorage.getItem(VIDEO_COLLECTION)){
            localStorage.setItem(VIDEO_COLLECTION, "[]");
        }
    }

    componentDidMount(){
        let collection = JSON.parse(localStorage.getItem(VIDEO_COLLECTION));

        // console.log(collection)
        // console.log(collection.join(","));
      
        if(collection.length < 1){
            this.setState({ isLoaded: true });
            return;
        }

        this.query(collection)
                .then(result => {
                    this.setState({ result, isLoaded: true, empty: false });
                });        
    }
  
    query = (collection) => {
        return searchListVideo(
            {
                part: "snippet,contentDetails",
                id: collection.join(",")
            }
        );
    }

    removeVideoFromList = (evt) => {
        const id = evt.currentTarget.dataset.id;
        let collection = JSON.parse(localStorage.getItem(VIDEO_COLLECTION));
        
        collection.splice(collection.indexOf(id), 1);
        localStorage.setItem(VIDEO_COLLECTION, JSON.stringify(collection));
        
        if(collection.length < 1 ){
            this.setState({ result: null, empty: true });
        }else{
            this.query(collection)
                    .then(result => {
                        this.setState({ result });
                    });
        }
    }

    render(){
        const { isLoaded, result, empty } = this.state;
        if(!isLoaded){
            return (<div className="loading">Loading...</div>)
        }else{
            return (
                <div className="favoritespage">
                    <h3>我的收藏影片</h3>
                    <List result = {result} empty = {empty} removeHandler = {this.removeVideoFromList} />
                    {/* <Pagination /> */}
                </div>  
            )
        }
    }
}

export default FavoritesPage;
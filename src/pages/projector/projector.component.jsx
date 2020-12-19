import React from 'react';
import ReactPlayer from 'react-player';
import { searchListVideo, watchYoutubeUrl } from '../../youtube/youtube.v3.util';
import { VIDEO_COLLECTION } from '../../systemconfig';
import CustomButton from '../../components/custom-button/custom-button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import './projector.styles.sass';

class Projectorpage extends React.Component{
    constructor(props){
        super(props)
      
        this.state = {
            source: null,
            item: null,
            collected: false,
            isYoutube: false,
            adDisplay: false
        }
    }

    componentDidMount(){
        const youtubeId = this.props.match.params.youtubeId;
        if(youtubeId){
            let collection = JSON.parse(localStorage.getItem(VIDEO_COLLECTION));
            if(collection.indexOf(youtubeId) > -1){
                this.setState({ 
                    collected: true
                });
            }
            this.query(youtubeId)
                .then(result => {
                    this.setState({ 
                        item: result.items[0],
                        source: watchYoutubeUrl(youtubeId),
                        isYoutube: true
                    });
                });   
          
        }else{
            this.setState({
                item: {
                    snippet: { title: "m3u8測試影片" }
                },
                source: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
            });
        }
    }

    query = (vid) => {
        return searchListVideo(
            {
                part: "snippet",
                id: vid
            }
        );
    }

    pauseHandler = ()=>{
        this.setState({
            adDisplay: true
        })
    }

    collectHandler = (evt)=>{
        const id = evt.currentTarget.dataset.id;
        let collection = JSON.parse(localStorage.getItem(VIDEO_COLLECTION));
        if(collection.indexOf(id) > -1){
            alert("已經收藏囉!")
        }else{
            collection.push(id);
            localStorage.setItem(VIDEO_COLLECTION, JSON.stringify(collection));
            this.setState({
                collected: true
            })
        }

    }

    removeHandler = (evt) => {
        const id = evt.currentTarget.dataset.id;
        let collection = JSON.parse(localStorage.getItem(VIDEO_COLLECTION));
        collection.splice(collection.indexOf(id), 1);
        localStorage.setItem(VIDEO_COLLECTION, JSON.stringify(collection));
        this.setState({
            collected: false
        })
    }

    render(){
        const { source, item, collected, isYoutube, adDisplay } = this.state;
        return (
            <div className="projectorpage">
                <div className = "projectorpage-player">
                    <ReactPlayer 
                        url={source}
                        playing 
                        controls
                        onPause = {this.pauseHandler}
                        width='100%'
                        height='100%'
                    />
                </div>
                {
                    item &&
                    <div className="projectorpage-info">
                        <div className="projectorpage-info-titlebox">
                            <h2 className="projectorpage-info-titlebox-title">{ item.snippet.title }</h2>
                            {
                               isYoutube &&  
                                <div className="projectorpage-info-titlebox-func">
                                    {
                                        collected ? 
                                        <CustomButton isHeart isCollected onClick={ this.removeHandler } vdid={item.id} ><FontAwesomeIcon icon={faHeart} size="2x" /></CustomButton>
                                        :
                                        <CustomButton isHeart onClick={ this.collectHandler } vdid={item.id} ><FontAwesomeIcon icon={faHeart} size="2x" /></CustomButton>
                                    }
                                </div>
                            }
                        </div>
                        <article className="projectorpage-info-desc">
                            { item.snippet.description }
                        </article>
                    </div>
                }
                {
                    adDisplay && 
                    <div className="advertisement" onClick={ ()=>{ this.setState({ adDisplay: false }) } }>
                        <div className="advertisement-content"> 廣告 </div>
                    </div>
                }
            </div>
        )
    }
}

export default Projectorpage;
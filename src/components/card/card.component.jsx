import React from 'react';
import { parse } from 'iso8601-duration';
import { Link } from 'react-router-dom';

import './card.styles.sass';

class Card extends React.Component{
    constructor(props){
        super(props);
    }

    timeString = (duration) => {
        let { years, months, days, hours, minutes, seconds } = parse(duration);
        let arr = [years, months, days, hours, minutes, seconds];
        let str = "";
        for(let i=0 ; i<arr.length; i++){
            if(arr[i] && arr[i] > 0){
                str += arr[i];
                str += i < arr.length-1 ? ":" : ""
            }
        }
        return str;
    }

    cutoffString = (description, limit) => {
        let str = description.slice(0, limit);
        if(description.length > limit)
            str += "...";
        return str;
    }
    render(){
        const { vdid, title, description, duration, thumbnails, ...itemProps} = this.props;
        const href = "/projector/" + vdid;
        return (
            <div className="card">
                <Link to={href} >
                    <div className="card-container">
                        <img 
                            className="card-image" 
                            src={thumbnails.medium.url}
                            // srcSet={`${thumbnails.medium.url} 1000w, ${thumbnails.default.url} 600w`}
                            alt=''
                        />
                        <div className="card-duration">{this.timeString(duration)}</div>
                    </div>
                </Link>
                <div className="card-info">
                    <h4 className="card-title">{this.cutoffString(title, 40)}</h4>
                    <p className="card-description">{this.cutoffString(description, 100)}</p>
                </div>
            </div>
        )
    }
}

export default Card;
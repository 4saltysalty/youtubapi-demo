import React from 'react';
import { parse } from 'iso8601-duration';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './list-item.styles.sass';

class ListItem extends React.Component{
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
        const { vdid, title, description, duration, thumbnails, removeHandler, ...itemProps} = this.props;
        const href = "/projector/" + vdid;
        return (
            <div className="listitem">
                <Link to={href} >
                    <div className="listitem-container">
                        <img 
                            className="listitem-image" 
                            src={thumbnails.medium.url}
                            // srcSet={`${thumbnails.medium.url} 1000w, ${thumbnails.standard.url} 600w, ${thumbnails.standard.url} 300w`}
                            alt=''
                        />
                        <div className="listitem-duration">{this.timeString(duration)}</div>
                    </div>
                </Link>
                <div className="listitem-info">
                    <h4 className="listitem-title">{this.cutoffString(title, 100)}</h4>
                    <span className="listitem-description">{this.cutoffString(description, 300)}</span>
                </div>
                <div className="listitem-func">
                    <CustomButton isTrash onClick={ removeHandler } vdid={vdid}><FontAwesomeIcon icon={faTrash} size="2x" /></CustomButton>
                </div>
            </div>
        )
    }
}


export default ListItem;
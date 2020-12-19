import React from "react";
import './list.styles.sass';

import ListItem from '../list-item/list-item.component';

class List extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const { result, empty, removeHandler } = this.props;
        return (
            <div className="list">
                {
                    empty?
                        <h3>您還未收藏影片喔!</h3>
                    :
                        result.items.map(({ id, snippet, contentDetails, ...itemProps}) => (
                            <ListItem
                                key={id}
                                vdid={id} 
                                title={snippet.title} 
                                description={snippet.description} 
                                duration={contentDetails.duration}
                                thumbnails={snippet.thumbnails}
                                removeHandler = {removeHandler}
                                {...itemProps}
                            />
                        ))
                    
                }
            </div> 
        )
    }
}

export default List;

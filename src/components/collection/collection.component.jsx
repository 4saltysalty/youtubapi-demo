import React from "react";
import './collection.styles.sass';

import Card from '../card/card.component';

const Collection = ({ result }) => {
    return (
        <div className="collection">
            {
                result.items.map(({ id, snippet, contentDetails, ...itemProps}) => (
                    <Card
                        key={id}
                        vdid={id} 
                        title={snippet.title} 
                        description={snippet.description} 
                        duration={contentDetails.duration}
                        thumbnails={snippet.thumbnails}
                        {...itemProps}
                    />
                ))
            }
        </div> 
    )
}

export default Collection;

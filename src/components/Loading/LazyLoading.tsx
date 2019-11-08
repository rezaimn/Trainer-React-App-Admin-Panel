import React from 'react';
import {Spinner} from 'reactstrap'


const LazyLoading  = () => {
    // var classes = classNames('animated', 'fadeIn', 'pt-3', 'text-center');
    return(
        <div style={{textAlign: 'center', margin: 20}}>
            <Spinner type={'grow'} color='success'/>
        </div>
        
    )
}

export {LazyLoading};
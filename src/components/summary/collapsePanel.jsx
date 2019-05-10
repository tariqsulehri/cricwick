import React from 'react';

const CollapsePanel = (props) => {
   const {title, unique_id} =  props  
    return (
        <div>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                {title} + " -  " + {unique_id} 
            </button>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                </div>
            </div>
        </div>
    );
}

export default CollapsePanel;



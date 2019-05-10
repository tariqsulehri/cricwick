import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner} from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

const Loading = () => (
    <div style={{textAlign:'center', marginTop :50 + 'px'}}  > 
          {/* <img style={{height:50 +'px', width:50 +'px'}}  
               src={require('../../assets/css/common/loading.gif')} alt=''/>
               
               />  */}

                <FontAwesomeIcon color="gray"
                  icon={faSpinner} spin
                  size="3x"/>
    </div>



);
  
export default Loading;

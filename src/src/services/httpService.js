import axios from 'axios';
//import axios from 'superagent';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Note: this Service will use in case if an Request error
  
//Service is use for as a Http request Inteceptor 
// 1st Agument use in case for SUCESS. So we have palce null we are concerned with Errors
// 2nd Agument use in case for ERROR. We have concerned need work on it.   
axios.interceptors.response.use(null,  error => {
  
    // Expected Client Side Http Error Staus Codes
    const expectedError = error.response && 
                          error.response.status >= 400 &&
                          error.response.status <= 500;
   
    // if there is an Unexpected Error so if status code is different than
    // Expected errors it should be a Un-Expected one.
    if(!expectedError){
       toast.error("An Un-expected error occur during processing...");  
    } 
    
    // Reject promise in case of an Error
    return Promise.reject(error);

});

export default{
    get    : axios.get,
    post   : axios.post,
    put    : axios.put,
    delete : axios.delete
}

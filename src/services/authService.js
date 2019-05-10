import http from "../services/httpService";
import {apiEndPoint} from "../config.json";
import config from  '../config.json';

// const apiUrl = apiEndPoint + "/auth";
const apiUrl = 'https://staging.cricwick.net:13002/api'

export function login(username){
     
    const Url = apiUrl + '/'
    + 'login_or_sendpin?telco=' + config.telco
    + '&phone=' + username 
    + '&sub_type='

    console.log(Url);

    return http.get(Url);

}
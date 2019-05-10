import http from "./httpService";
import apiUrl from '../config.json';

let page = 1;
let perPage = 5;
let telco = 'telco=mobilink';

const apiEndpoint = apiUrl + "/user_api"
+ "/"
+ "get_new_series"
+ "?"
+ "page="
+  page
+ "&"
+ "per_page=" + perPage
+ "&" 
+ telco 
 
 export function getAllVideos(){
     return http.get(apiEndpoint);
 }
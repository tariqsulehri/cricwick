import http from "../services/httpService";
import {apiEndPoint} from "../config.json";

const apiUrl = apiEndPoint + "/auth";

export function register(user){
    return http.post(apiUrl, {
          email : user.username,
          password :  user.password,
          name : user.name       
    });
}


import axios from 'axios';
import authHeader from "./auth.header.js";


const API_URL = "http://localhost:3000/api/";

class UserService {

    getUserPoints() {
        // return axios.get(API_URL + 'points', { headers: authHeader() })
    }

}

export default new UserService();
import axios from 'axios';
import Vue from 'vue';


const API_URL = "http://localhost:3000/api/";

class AuthService {

    login(body) {
        return axios.post(API_URL + "login", body)
            .then((response) => {
                if (response.data == "User does not exist") {
                    Vue.toasted.global.noUser().goAway(2900);
                    return new Error;
                } else if (response.data == "Wrong password") {
                    Vue.toasted.global.wrongPassword().goAway(2900);
                    return new Error;
                } else if (response.data.token != undefined) {
                    localStorage.setItem('user', response.data.token);
                    return response.data;
                }

            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(body) {
        if (this.password == this.passwordr) {

            axios.post(API_URL + "register", JSON.stringify(body))
                .then((response) => {
                    if (response.data == "Nick used") {
                        Vue.toasted.global.nickUsed().goAway(2900);
                    } else if (response.data.token != undefined) {
                        localStorage.setItem('user', response.data.token);
                        return response.data;
                    }
                });
        } else {
            Vue.toasted.global.passwordsDontMatch().goAway(2900);
        }
    }

}


export default new AuthService();
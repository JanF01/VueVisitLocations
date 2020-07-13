import axios from 'axios';
import Vue from 'vue';


const API_URL = "http://localhost:3000/api/";

class AuthService {

    login(body) {
        return axios.post(API_URL + "login", body)
            .then((response) => {
                if (response.data == "User does not exist") {
                    Vue.toasted.global.noUser().goAway(2900);
                } else if (response.data == "Wrong password") {
                    Vue.toasted.global.wrongPassword().goAway(2900);
                } else if (response.data != undefined) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    return response.data;
                }

            });
    }

    logout() {
        localStorage.removeItem('user');
        window.location.reload();
    }

    register(body) {
        if (body.password == body.passwordr) {

            axios.post(API_URL + "register", body)
                .then((response) => {
                    if (response.data == "Nick used") {
                        Vue.toasted.global.nickUsed().goAway(2900);
                        return new Error;
                    } else if (response.data == "Password too weak") {
                        Vue.toasted.global.passwordError().goAway(2900);
                        return new Error;
                    } else if (response.data != undefined) {
                        Vue.toasted.global.registerSuccess().goAway(2900);
                        return response.data;
                    }
                });
        } else {
            Vue.toasted.global.passwordsDontMatch().goAway(2900);
        }
    }

}


export default new AuthService();
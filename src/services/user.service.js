import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:3000/api/";
var userId = null;

class UserService {
    getUserPublic() {
        return axios
            .get(API_URL + "public", {
                headers: authHeader(),
            })
            .then((result) => {

                if (result.data.id) {
                    userId = result.data.id;
                }
                return result;
            });
    }
    checkForUser(nick) {
        return axios
            .get(API_URL + "userExists", {
                headers: {
                    'nick': nick
                }
            }).then((result) => {
                return result;
            });
    }

    getUserPoints(nick) {
        if (nick == "-") {
            return axios
                .get(API_URL + "points", {
                    headers: authHeader(),
                })
                .then((result) => {
                    return result;
                });
        } else {
            return axios
                .get(API_URL + "points", {
                    headers: {
                        'nick': nick
                    },
                })
                .then((result) => {
                    return result;
                });
        }
    }

    getUserPoint(lat, lng) {
        return axios
            .get(API_URL + "point", {
                headers: {
                    'lat': lat,
                    'lng': lng,
                    'userid': userId,
                }
            })
            .then((result) => {
                return result;
            });
    }

    addMarker(marker) {
        marker.userId = userId;

        return axios
            .post(API_URL + "addMarker", marker)
            .then((result) => {
                return result;
            });
    }

    editMarker(marker) {
        marker.userId = userId;
        return axios
            .post(API_URL + "editMarker", marker)
            .then((result) => {
                return result;
            });
    }

    deleteMarker(marker) {
        marker.userId = userId;
        return axios
            .post(API_URL + "deleteMarker", marker)
            .then((result) => {
                return result;
            })
    }
}

export default new UserService();
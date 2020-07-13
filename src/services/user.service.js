import axios from "axios";
import authHeader from "./auth.header.js";

const API_URL = "http://localhost:3000/api/";

class UserService {
  getUserPublic() {
    return axios
      .get(API_URL + "public", {
        headers: authHeader(),
      })
      .then((result) => {
        return result;
      });
  }

  getUserPoints() {
    return axios
      .get(API_URL + "points", {
        headers: authHeader(),
      })
      .then((result) => {
        return result;
      });
  }
}

export default new UserService();

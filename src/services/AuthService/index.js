import axios from "axios";
const url = "http://localhost:8081";

class AuthService {
    login(user) {
        return axios.post(url + "/login", user);
    }

    registrate(user) {
        return axios.post(url + "/admin/registration", user);
    }

    changePassword(user) {
        return axios.post(url + "/users/changePassword", user);
    }
}

const authService = new AuthService();
export default authService;
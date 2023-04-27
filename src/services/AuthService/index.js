import axios from "axios";
const url = "http://localhost:8081";

class AuthService {
    login(user) {
        axios.post(url + "/login", user)
            .then(({ data }) => localStorage.setItem("user", data));
    }
}

const authService = new AuthService();
export default authService;
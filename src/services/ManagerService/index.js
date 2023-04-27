import axios from "axios";
const url = "http://localhost:8081";

class ManagerService {
    getAll() {
        return axios.get(url + "/admin");
    }

    delete(id) {
        return axios.delete(url + "/admin/" + id);
    }

    registrate(user) {
        return axios.post(url + "/admin/registration", user);
    }
}

const managerService = new ManagerService();
export default managerService;
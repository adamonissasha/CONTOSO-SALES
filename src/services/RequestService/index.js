import axios from "axios";
const url = "http://localhost:8081";

class RequestService {
    getAll() {
        return axios.get(url + "/requests");
    }

    getByManagerId(id) {
        return axios.get(url + "/request/" + id);
    }

    addNew(request) {
        return axios.post(url + "/request", request);
    }

    delete(id) {
        return axios.delete(url + "/request/" + id);
    }

    update(id, product) {
        return axios.put(url + "/products/" + id, product);
    }
    changeStatus(id, status) {
        return axios.put(url + "/admin/status/" + id + "/" + status);
    }
}

const requestService = new RequestService();
export default requestService;
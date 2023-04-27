import axios from "axios";
const url = "http://localhost:8081";

class ClientService {
    getAll() {
        return axios.get(url + "/clients");
    }

    addNew(client) {
        return axios.post(url + "/clients", client);
    }

    delete(id) {
        return axios.delete(url + "/clients/" + id);
    }

    update(id, client) {
        return axios.put(url + "/clients/" + id, client);
    }

    sendOneMessage(id, data) {
        return axios.post(url + "/clients/message/" + id, data);
    }

    sendMessageToAll(data) {
        return axios.post(url + "/clients/message", data);
    }
}

const clientService = new ClientService();
export default clientService;
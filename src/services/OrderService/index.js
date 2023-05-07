import axios from "axios";
const url = "http://localhost:8081";

class OrderService {
    getAll() {
        return axios.get(url + "/orders");
    }

    cancel(data) {
        return axios.put(url + "/admin/order", data);
    }

    changeStatus(id, status) {
        console.log(id + status);
        return axios.put(url + "/orders/" + id + "/" + status);
    }
}

const orderService = new OrderService();
export default orderService;
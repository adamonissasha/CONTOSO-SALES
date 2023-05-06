import axios from "axios";
const url = "http://localhost:8081";

class OrderService {
    getAll() {
        return axios.get(url + "/orders");
    }

    cancel(data) {
        return axios.put(url + "/admin/order", data);
    }
}

const orderService = new OrderService();
export default orderService;
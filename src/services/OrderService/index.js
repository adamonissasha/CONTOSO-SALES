import axios from "axios";
const url = "http://localhost:8081";

class OrderService {
    getAll() {
        return axios.get(url + "/orders");
    }
}

const orderService = new OrderService();
export default orderService;
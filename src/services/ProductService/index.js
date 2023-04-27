import axios from "axios";
const url = "http://localhost:8081";

class ProductService {
    getAll() {
        return axios.get(url + "/products");
    }

    addNew(product) {
        return axios.post(url + "/products", product);
    }

    delete(id) {
        return axios.delete(url + "/products/" + id);
    }

    update(id, product) {
        return axios.put(url + "/products/" + id, product);
    }

    addProductAmount(data) {
        return axios.put(url + "/products/amount", data);
    }
}

const productService = new ProductService();
export default productService;
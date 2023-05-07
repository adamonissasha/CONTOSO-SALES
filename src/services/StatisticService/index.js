import axios from "axios";
const url = "http://localhost:8081";

class StatisticService {
    getProfitInRange(from, to) {
        return axios.get(url + "/admin/profit/" + from + "/" + to);
    }

    getFailedSuccessInRange(from, to) {
        return axios.get(url + "/admin/failed-success/" + from + "/" + to);
    }

    getMostActiveClients() {
        return axios.get(url + "/admin/most-active-buyers");
    }

    getMostPopularItems() {
        return axios.get(url + "/admin/most-popular-items");
    }
}

const statisticService = new StatisticService();
export default statisticService;
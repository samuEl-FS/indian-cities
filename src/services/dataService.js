import axios from "../utils/axios";

class DataService {
  getData = () =>
    new Promise((resolve, reject) => {
      axios
        .post("https://next.json-generator.com/api/json/get/EJX4SGwfK")
        .then(response => {
          if (response.data) {
            resolve(response.data.data);
          } else {
            reject(response.data.error);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
}

const dataService = new DataService();

export default dataService;

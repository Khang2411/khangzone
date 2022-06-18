import axios from "axios";

function callAPI(method: any, endpoind: string, dataSend: any, authenticate: any) {
    return axios({
        method: method,
        url: `http://localhost:8080/khangbanmaytinh/api/${endpoind}`,
        data: dataSend,
        headers: { 'Content-Type': 'application/json', 'Authorization': authenticate },
    })
}

export default callAPI
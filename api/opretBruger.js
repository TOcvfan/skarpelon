import axios from 'axios';
import config from '@/config/config';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path

const opretBruger = async (data) => {
    let res;
    const requestOptions = {
        method: 'POST',
        headers: headers()
    };
    const opretBruger = await axios.post(`${url}newuser`, data, requestOptions).then(response => {
        res = response.data
        return res
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            throw res;
        } else if (error.request) {
            res = error.request
            throw res
        } else {
            res = error.message
            throw res
        }
    })
    return opretBruger;
}

export default opretBruger;
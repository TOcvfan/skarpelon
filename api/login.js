import config from '@/config/config';
import axios from 'axios';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path;

const login = async (data) => {
    let res;

    const requestOptions = {
        method: 'POST',
        headers: headers(),
    };

    const login = await axios.post(`${url}login`, data, requestOptions).then(response => {
        res = response.data
        return res
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            throw res;
        } else if (error.request) {
            res = error.request;
            throw res
        } else {
            res = error.message;
            throw res
        }
    })
    return login
}

export default login;
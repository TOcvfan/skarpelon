import axios from 'axios';
import config from '../helpers/config';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path;


const rediger = async (data, sti, token) => {
    let res;
    const requestOptions = {
        method: 'PUT',
        headers: headers(token),
    };

    const rediger = await axios.put(url + sti, data, requestOptions).then(response => {
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
    return rediger;

}

export default rediger;
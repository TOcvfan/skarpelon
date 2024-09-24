import axios from 'axios';
import config from '@/config/config';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path;


const del = async (sti, token) => {
    let res;
    const requestOptions = {
        method: 'DELETE',
        headers: headers(token),
    };

    const del = await axios.delete(url + sti, requestOptions).then(response => {
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
    return del;

}

export default del;
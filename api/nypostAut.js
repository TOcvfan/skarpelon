import config from '../helpers/config';
import axios from 'axios';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path;

const nyPostAut = async (data, sti, token) => {
    const requestOptions = {
        method: 'POST',
        headers: headers(token)
    };
    let res;

    const nyPostAut = await axios.post(url + sti, data, requestOptions).then(response => {
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
    });
    return nyPostAut;

}
export default nyPostAut;
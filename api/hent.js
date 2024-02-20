import axios from 'axios';
import config from '@/helpers/config';
import headers from '@/helpers/headers';
const url = config.baseURL + config.path

const hent = async (sti, token) => {
    const requestOptions = {
        method: 'GET',
        headers: headers(token)
    };
    let res;
    const hent = await axios.get(url + sti, requestOptions).then(response => {
        res = response.data
        return res
    }).catch(function (error) {
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
    return hent;
}

export default hent;
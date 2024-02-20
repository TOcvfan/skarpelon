import axios from 'axios';
import config from '../helpers/config';
import headers from '@/helpers/headers';

const checkServer = async () => {
    const requestOptions = {
        method: 'GET',
        headers: headers()
    };
    let res;
    await axios(`${config.baseURL}/tester`, requestOptions).then((response) => {
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
}

export default checkServer;
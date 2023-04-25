import axios from 'axios';
import queryString from 'query-string';

const axiosClientO = axios.create({
    baseURL: "http://www.omdbapi.com/",
    headers: {
        'Content-Type': 'application/json'
    },
    params: {apikey: "f117a64b"}
});

axiosClientO.interceptors.request.use(async (config) => config);

axiosClientO.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

const omdbApi = {
    getData: (id) => {
        const url = '?i='+id;
        return axiosClientO.get(url, {params: {}});
    },
}

export default omdbApi;
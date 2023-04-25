import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        'Content-Type': 'application/json'
    },
    params: {api_key: "1e11e7d4c5f3aad6e459fc0f63bfb0f5"}
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});


const tmdbApi = {
    getVideos: (id) => {
        const url = 'movie/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    detail: async (id, params) => {
        const url = 'movie/' + id;
        return await axiosClient.get(url, params);
    },
    credits: (id) => {
        const url = 'movie/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (id) => {
        const url = 'movie/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
}

export default tmdbApi;
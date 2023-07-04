import axios from 'axios'

export const BASE_URL = 'https://gldev-practicalapi.azurewebsites.net';

export const ENDPOINTS = {
    getall: 'Get',
    category:'GetByCategory',
    calories : 'GetByCalories',
    intensity: 'GetByIntensity',
    getcalories: 'GetCalories'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + '/api/FitnessClass/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}
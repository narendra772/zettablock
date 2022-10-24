import apiClient from "./ApiClient";
import { baseUrl } from './apis';
import axios from 'axios';
import qs from 'qs'


export const getApisList = async (api) => {
    try {
        const response = await apiClient.get(baseUrl + '/apis');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getSortedApisList = async (api) => {
    try {
        const response = await apiClient.get(baseUrl + '/apis?sortBy=name&order=asc');
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getSearchedApisList = async (keyword) => {
    try {
        const response = await apiClient.get(baseUrl + `/apis?search=${keyword}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export default function apiPut(apiId, newDescription) {
    console.log(apiId);
    console.log(newDescription);
    var data = qs.stringify({
    'description': newDescription
    });
    var config = {
    method: 'put',
    url: `${baseUrl}/apis/${apiId}`,
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });
}

export const deleteById = (id) => {
    var config = {
      method: 'delete',
      url: baseUrl + `/apis/${id}`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    }

// export const putDesc = async (id, desc) => {
//     try {
//         const response = await apiClient.post(baseUrl + `/apis/${id}`);
//         return response.status;
//     } catch (error) {
//         return error;
//     }
// }
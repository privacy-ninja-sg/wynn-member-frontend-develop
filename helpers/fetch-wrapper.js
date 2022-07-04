import { userService } from '../services/user.service';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get,
    post,
    authHeader
};

function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) }
    }
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) }
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.access_token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.access_token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
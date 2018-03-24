import $ from 'jquery';
import base64 from 'base-64'
import {API_ENDPOINT, API_AUTH_ACTION} from '../constants';
export const UPDATE_CREDENTIALS = 'user:updateCredentials';
export const SHOW_ERROR = 'user:showError'; 

// update user state (username, password) on login
export function updateCredentials(username, password) {
    return {
        type: UPDATE_CREDENTIALS,
        payload: {
            user: {
                username: username,
                password: password
            }
        }
    }
}

export function showError(msg) {
    return {
        type: SHOW_ERROR,
        payload: {
            user: { authenticationFailure : true }
        }
    }
}

// performs authorization against api
export function apiAuthenticate(username, password) { 
    return dispatch => {
        $.ajax({
            type: 'POST',
            url: API_ENDPOINT + API_AUTH_ACTION,
            headers: {
                'Authorization': 'Basic ' + base64.encode(username + ':' + password)
            },
            success(data) {
                alert(data)
            },
            error(response) {
                dispatch(showError());
            }
        });
    }
}
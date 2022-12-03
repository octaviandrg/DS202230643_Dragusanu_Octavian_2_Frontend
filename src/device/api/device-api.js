import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    device: '/device'
};

function getDevices(callback) {
    let request = new Request(HOST.backend_api + endpoint.device + "/all", {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDevicesByUsername(callback) {
    const localStorageUser = localStorage.getItem("electricity-user");
    let currentUser = {
        id: null,
        username: null,
        role: 'UNKNOWN'
    };
    currentUser = JSON.parse(localStorageUser);
    let request = new Request(HOST.backend_api + endpoint.device + "/byUsername/" + currentUser.username, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getDeviceById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.device + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postDevice(device, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/create", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


function putDevice(device, deviceId, callback){
    let request = new Request(HOST.backend_api + endpoint.device + "/update/" +  deviceId , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteDevice(deviceId, callback) {
    let request = new Request(HOST.backend_api + endpoint.device + "/delete/" +  deviceId, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getDevices,
    getDeviceById,
    deleteDevice,
    postDevice,
    putDevice,
    getDevicesByUsername
};

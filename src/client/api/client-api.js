import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    client: '/client'
};

function getClients(callback) {
    let request = new Request(HOST.backend_api + endpoint.client + '/all', {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getClientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.client + '/' + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postClient(client, callback){
    let request = new Request(HOST.backend_api + endpoint.client + '/create' , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function putClient(client, clientId, callback){
    let request = new Request(HOST.backend_api + endpoint.client + "/update/" +  clientId , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteClient(clientId, callback) {
    let request = new Request(HOST.backend_api + endpoint.client + "/delete/" +  clientId, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getClients,
    getClientById,
    postClient,
    deleteClient,
    putClient
};

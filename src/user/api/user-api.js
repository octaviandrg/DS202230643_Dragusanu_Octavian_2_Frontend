import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    user: '/user'
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.user + '/all', {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getUserById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.user + '/' + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function postUser(user, callback){
    let request = new Request(HOST.backend_api + "/auth/registration" , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function putUser(user, userId, callback){
    let request = new Request(HOST.backend_api + endpoint.user + "/update/" +  userId , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteUser(userId, callback) {
    let request = new Request(HOST.backend_api + endpoint.user + "/delete/" +  userId, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getUsers,
    getUserById,
    postUser,
    deleteUser,
    putUser
};

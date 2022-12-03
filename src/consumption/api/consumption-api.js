import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    consumption: '/consumption/'
};


function getConsumptionsByDeviceId(deviceId, d, m, y, callback) {
    let request = new Request(HOST.backend_api + endpoint.consumption + 'deviceId/' + deviceId 
                                + '/' + d + '/' + m + '/' + y, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


export {
    getConsumptionsByDeviceId
};

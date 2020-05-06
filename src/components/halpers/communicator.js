import axios from 'axios';

export function send_email(data) {
    console.log('Communicator.send_email ' + data.email);
    axios.post('http://supermath.xyz:3000/api/email', data)
        .then(onApiCall)
        .catch(onApiCallError);
}

function onApiCall(response) {
    console.log('Communicator.onApiCall ' + response.toString());

    if ('data' in response) {
        if ('error' in response.data) {
            console.log('ERROR: Communicator.onApiCall ' + response.data.error);

        } else if ('id' in response.data) {
            console.log('Communicator.onApiCall successed, id ' + response.data.id);

        } else {
            console.log('WARN: Communicator.onApiCall received no data in response from server');
        }
    }
}

function onApiCallError(error) {
    console.log('Communicator.onApiCallError -> error ' + error);

}

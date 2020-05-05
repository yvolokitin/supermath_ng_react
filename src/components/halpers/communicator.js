import axios from 'axios';

export function send_email(data) {
    axios.post('http://supermath.xyz:3000/api/email', data)
        .then(onApiUpdate)
        .catch(onApiUpdateError);
}

function onApiCall(response) {
    console.log('Communicator.onApiCall ' + response.toString());

    if ('data' in response) {
        if ('error' in response.data) {
            console.log('ERROR: Communicator.onApiCall ' + response.data.error);

        } else if ('id' in response.data) {
            console.log('Communicator.onApiCall successed, id ' + response.data.id);

        } else {
            console.log('Communicator.onApiCall received no data in response from server');
        }
    }

function onApiCallError(error) {
    console.log('Communicator.onApiCallError -> error ' + error);

}

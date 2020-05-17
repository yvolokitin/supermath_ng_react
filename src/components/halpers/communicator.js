import axios from 'axios';

export function send_email(data) {
    console.log('Communicator.send_email ' + data.email);
    axios.post('http://supermath.xyz:3000/api/email', data)
        .then(onApiCall)
        .catch(onApiCallError);
}

export function update_avatar(id, pswdhash, avatar) {
    console.log('Communicator.update_avatar ' + id);
    localStorage.setItem('avatar', avatar);
    var data = {
        'user_id': id,
        'pswdhash': pswdhash,
        'operation': 'avatar',
        'avatar': avatar,
    };
    axios.post('http://supermath.xyz:3000/api/update', data)
         .then(onApiCall)
         .catch(onApiCallError);
}

export function update_usersettings(id, pswdhash, property, value) {
    console.log('Communicator.update_usersettings ' + id);
    // localStorage.setItem('avatar', avatar);
    var data = {
        'user_id': id,
        'operation': property,
        'pswdhash': pswdhash
    };
    data[property] = value;
    axios.post('http://supermath.xyz:3000/api/update', data)
         .then(onApiCall)
         .catch(onApiCallError);
}

export function update_language(id, language) {
    console.log('Communicator.update_language ' + id);
    var pswdhash = localStorage.getItem('pswdhash');
    if (pswdhash != null) {
        var data = {
            'user_id': id,
            'pswdhash': pswdhash,
            'operation': 'lang',
            'lang': language};
        axios.post('http://supermath.xyz:3000/api/update', data)
             .then(onApiCall)
             .catch(onApiCallError);
    }
}

export function update_counter(id, pswdhash, data) {
    console.log('Communicator.update_counter ' + id);

    var passed = parseInt(data.passed), failed = parseInt(data.failed);
    if ((passed > 0) || (failed > 0)) {
        if (localStorage.getItem('passed') !== null) {
            passed = passed + parseInt(localStorage.getItem('passed'));
        }
        localStorage.setItem('passed', passed);

        if (localStorage.getItem('failed') !== null) {
            failed = failed + parseInt(localStorage.getItem('failed'));
        }
        localStorage.setItem('failed', failed);

        data.user_id = id; data.pswdhash = pswdhash;
        axios.post('http://supermath.xyz:3000/api/update', data)
             .then(onApiCall)
             .catch(onApiCallError);
    }
}

export function update_passfail(id, pswdhash, belt, passed, failed) {
    console.log('Communicator.update_passfail ' + id);

    localStorage.setItem('passed', passed);
    localStorage.setItem('failed', failed);

    var passkey = parseInt(id) * passed;
    var passbin = (passkey >>> 0).toString(2); // xor
    var failkey = parseInt(id) * failed;
    var failbin = (failkey >>> 0).toString(2);
    // console.log('Binary ' + passkey + ': ' + passbin + ', ' + failkey + ': ' + failbin);
    var post = {
        'user_id': id,
        'pswdhash': pswdhash,
        'passed': passbin,
        'failed': failbin,
        'belt': belt
    };
    axios.post('http://supermath.xyz:3000/api/counter', post)
         .then(onApiCall)
         .catch(onApiCallError);
}

function onApiCall(response) {
    console.log('Communicator.onApiCall response received.');
    if ('data' in response) {
        if ('error' in response.data) {
            console.log('Communicator.onApiCall -> error ' + response.data.error);

        } else if ('id' in response.data) {
            console.log('Communicator.onApiCall successed, id ' + response.data.id);

        } else {
            console.log('Communicator.onApiCall -> warning: received no data in response from server');
        }
    }
}

function onApiCallError(error) {
    console.log('Communicator.onApiCallError -> error ' + error);

}

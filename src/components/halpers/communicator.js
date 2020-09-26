import axios from 'axios';
import {set_item} from './../halpers/localstorage';

const URL_EMAIL = 'https://supermath.xyz:3000/api/email';
const URL_UPDATE = 'https://supermath.xyz:3000/api/update';
const URL_COUNTER = 'https://supermath.xyz:3000/api/counter';

export function send_email(data) {
    console.log('Communicator.send_email ' + data.email);
    axios.post(URL_EMAIL, data)
        .then(onApiCall)
        .catch(onApiCallError);
}

export function update_avatar(id, pswdhash, avatar) {
    console.log('Communicator.update_avatar ' + id);
    set_item(id, 'avatar', avatar);
    var data = {
        'user_id': id,
        'pswdhash': pswdhash,
        'operation': 'avatar',
        'avatar': avatar,
    };
    axios.post(URL_UPDATE, data)
         .then(onApiCall)
         .catch(onApiCallError);
}

export function update_usersettings(id, pswdhash, property, value) {
    console.log('Communicator.update_usersettings ' + id);
    set_item(id, property, value);
    var data = {
        'user_id': id,
        'operation': property,
        'pswdhash': pswdhash
    };
    data[property] = value;
    axios.post(URL_UPDATE, data)
         .then(onApiCall)
         .catch(onApiCallError);
}

// update_language(this.state.id, this.state.pswdhash, language);
export function update_language(id, pswdhash, language) {
    console.log('Communicator.update_language ' + id);
    if ((id != null) && (pswdhash != null) && (language != null)) {
        var data = {
            'user_id': id,
            'pswdhash': pswdhash,
            'operation': 'lang',
            'lang': language};
        axios.post(URL_UPDATE, data)
             .then(onApiCall)
             .catch(onApiCallError);
    }
}

// update_counter(this.state.id, this.state.pswdhash, value, new_passed, new_failed);
/**
 * Update user passed/failed counter after task completion
 * id and pswdhash are know parameters for user
 * data includes task related info: #passed/#failed per task, duration, rate etc
 * passed/failed are total numbers after addition in page/index.js
 */
export function update_counter(id, pswdhash, data, passed, failed) {
    console.log('Communicator.update_counter ' + id);
    // check that passed or failed  > 0 due to user might exit from game with no completion
    if ((parseInt(data.passed) > 0) || (parseInt(data.failed) > 0)) {
        set_item(data.user_id, 'passed', passed);
        set_item(data.user_id, 'failed', failed);

        data.user_id = id; data.pswdhash = pswdhash;
        axios.post(URL_UPDATE, data)
             .then(onApiCall)
             .catch(onApiCallError);
    }
}

/**
 * Update user passed, failed and cards counters
 * 
 * update_user_scores(this.state.id, pswdhash, this.state.belt, value);
 */
export function update_user_scores(id, pswdhash, belt, value) {
    console.log('Communicator.update_passfail ' + id);

    localStorage.setItem('passed', value.passed);
    localStorage.setItem('failed', value.failed);
    localStorage.setItem('cards', value.cards);

    var passkey = parseInt(id) * value.passed;
    var passbin = (passkey >>> 0).toString(2); // xor
    var failkey = parseInt(id) * value.failed;
    var failbin = (failkey >>> 0).toString(2);
    var cardkey = parseInt(id) * value.cards;
    var cardbin = (cardkey >>> 0).toString(2);

    // console.log('Binary ' + passkey + ': ' + passbin + ', ' + failkey + ': ' + failbin);
    var post = {
        'user_id': id,
        'pswdhash': pswdhash,
        'belt': belt,
        'passed': passbin,
        'failed': failbin,
        'cards': cardbin,
    };
    axios.post(URL_COUNTER, post)
         .then(onApiCall)
         .catch(onApiCallError);
}

function onApiCall(response) {
    console.log('Communicator.onApiCall response received.');
    if ('data' in response) {
        if ('error' in response.data) {
            console.log('Communicator.onApiCall -> error ' + response.data.error);

        } else if ('id' in response.data) {
            if ('operation' in response.data) {
                console.log('Communicator.onApiCall on ' + response.data.operation + ' operation successed, id ' + response.data.id);

            } else {
                console.log('Communicator.onApiCall successed, id ' + response.data.id);
            }

        } else {
            console.log('Communicator.onApiCall -> warning: received no data in response from server');
        }
    }
}

function onApiCallError(error) {
    console.log('Communicator.onApiCallError -> error ' + error);

}

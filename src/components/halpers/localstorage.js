const getNavigatorLanguage = () => (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';

const user_props = ['name', 'email', 'surname', 'birthday', 'avatar', 'pswdhash', 'passed', 'failed', 'cards', 'lang', 'belt', 'solved', 'age'];

function language_detector() {
    var language = 'en', navigator_lang = getNavigatorLanguage();

    // en-US, en-GB are all English
    if (navigator_lang.includes('en')) {
        language = 'en';
    } else if (navigator_lang.includes('ru') || navigator_lang.includes('be') || navigator_lang.includes('uk')) { 
        language = 'ru';
    } else if (navigator_lang.includes('nl')) {
        language = 'nl';
    } else if (navigator_lang.includes('de')) {
        language = 'de';
    } else if (navigator_lang.includes('es')) {
        language = 'es';
    } else if (navigator_lang.includes('it')) {
        language = 'it';
    } else if (navigator_lang.includes('fr')) {
        language = 'fr'
    }

    return language;
}

/**
 * Language detector
 */
export function get_lang(user_id) {
    var language = 'en';
    // if user_id = 0 -> there is no local user
    if (user_id === undefined || user_id === 0) {
        language = localStorage.getItem('lang');
        if (language === null || language.length === 0) {
            language = language_detector();
        }

    } else {
        language = get_item(user_id, 'lang');
        if (language === null || language.length === 0) {
            language = language_detector();
        }
    }

    return language;
}

/**
 * Set Language for particular user
 */
export function set_lang(user_id, lang) {
    if (user_id > 0) {
        set_item(user_id, 'lang', lang);
    } else {
        localStorage.setItem('lang', lang);
    }
}

/**
 * Get active user
 */
export function get_active_user() {
    // localStorage.removeItem('user_id');
    var user = 0;
    if (typeof(Storage) !== 'undefined') {
        var active = localStorage.getItem('user_id');
        if (active !== null && active !== undefined) {
            user = parseInt(active);
        }
    }

    return user;
}

/**
 * Set active user
 */
export function set_active_user(user_id) {
    if (user_id > 0) {
        var users = localStorage.getItem('users');
        if (users !== null && users !== undefined) {
            var locals = users.split(',');
            var sub_user = user_id.toString() + ',';
            if (locals.length > 0) {
                if (locals.includes(user_id.toString()) === false) {
                    localStorage.setItem('users', users + sub_user);
                }
            } else {
                localStorage.setItem('users', sub_user);
            }
        } else {
            localStorage.setItem('users', sub_user);
        }
    }

    localStorage.setItem('user_id', user_id);
}

/**
 * Get All IDs of users who ever been logged and saved in localstorage
 * 
 * user_is is user, which should be excluded from list
 */
export function get_local_users(user_id = 0) {
    // localStorage.setItem('users', '');
    var users = [];
    if (typeof(Storage) !== 'undefined') {
        var local_users = [], locals = localStorage.getItem('users');
        if (locals !== null && locals !== undefined) {
            local_users = locals.split(',');
        }

        // console.log('get_local_users, user_id ' + user_id + ', locals: ' + locals);
        for (var i = 0; i < local_users.length; i++) {
            if ((parseInt(local_users[i]) !== parseInt(user_id)) &&
                (get_item(local_users[i], 'name') !== '') &&
                (get_item(local_users[i], 'email') !== '') &&
                (get_item(local_users[i], 'surname') !== '') &&
                (get_item(local_users[i], 'pswdhash') !== '')) {

                var data = {
                    'id': local_users[i],
                    'name': get_item(local_users[i], 'name'),
                    'email': get_item(local_users[i], 'email'),
                    'surname': get_item(local_users[i], 'surname'),
                    'avatar': get_item(local_users[i], 'avatar'),
                    'pswdhash': get_item(local_users[i], 'pswdhash'),
                };

                console.log('id ' + local_users[i] + ', name ' + data.name + ', avatar ' + data.avatar);
                users.push(data);
            }
        }
    }

    return users;
}

/**
 * Remove all local user info from localstorage
 */
export function remove_local_user(user_id) {
    console.log('remove_local_user ' + user_id);

    if (typeof(Storage) !== 'undefined') {
        var local_users = [], locals = localStorage.getItem('users');
        if (locals !== null && locals !== undefined) {
            local_users = locals.split(',');
        }

        // if no local users available -> nothing to remove
        if (local_users.length > 0) {
            var new_user_list = '';
            for (var i = 0; i < local_users.length; i++) {
                if (local_users[i] !== 0 &&
                    local_users[i] !== user_id &&
                    local_users[i].length > 0) {
                        new_user_list = new_user_list + local_users[i] + ',';

                } else if (local_users[i] !== 0 &&
                    local_users[i] === user_id) {
                        // remove all related user data
                        for (var k = 0; k < user_props.length; k++) {
                            var key = user_id + '_' + user_props[k];
                            localStorage.removeItem(key);
                        }
                }
            }

            localStorage.setItem('users', new_user_list);
        }
    }
}

/**
 * Remove item
 */
export function remove_item(key) {
    if (typeof(Storage) !== 'undefined') {
        localStorage.removeItem(key);
    }
}

/**
 * setItem(): Add key and value to localStorage
 *
 * @param user_id is user id
 *
 */
export function set_item(user_id, key, value) {
    if ((user_id !== undefined) && (key !== undefined) && (value !== undefined)) {
        if (typeof(Storage) !== 'undefined') {
            // Code for localStorage
            var storage_key = user_id.toString() + '_' + key;
            if (key === 'tasks_progress' || key === 'tasks_failed') {
                localStorage.setItem(storage_key, JSON.stringify(value));

            } else {
                localStorage.setItem(storage_key, value);
            }

        } else {
            // No web storage Support
            // TBD, cookies
        }
    }
}

/**
 * getItem(): Retrieve a value by the key from localStorage
 *
 */
export function get_item(user_id, key) {
    var property = '';
    if ((user_id !== undefined) && (key !== undefined)) {
        if (typeof(Storage) !== 'undefined') {
            // Code for localStorage
            var storage_key = user_id.toString() + '_' + key;
            if (key === 'tasks_progress' || key === 'tasks_failed') {
                property = JSON.parse(localStorage.getItem(storage_key));

            } else {
                property = localStorage.getItem(storage_key);
            }

            // console.log(storage_key + ': ' + property);
            // localStorage.removeItem(storage_key);

        } else {
            // No web storage Support
            // TBD, cookies
        }
    }

    // if property is still undefined -> return default value
    if (property === undefined || property === null || property.length === 0) {
        switch (key) {
            case 'belt':
                property = 'white';
                break;

            case 'level':
                property = 'none';
                break;

            case 'avatar':
                property = 'martin';
                break;

            case 'tasks_progress':
                property = {'task_1': 0,
                    'task_2': 0,
                    'task_3': 0,
                    'task_4': 0,
                    'task_5': 0,
                    'task_6': 0,
                    'task_7': 0,
                    'task_8': 0,
                    'task_9': 0,};
                break;

            case 'tasks_failed':
                property = {'task_1': [],
                    'task_2': [],
                    'task_3': [],
                    'task_4': [],
                    'task_5': [],
                    'task_6': [],
                    'task_7': [],
                    'task_8': [],
                    'task_9': [],};
                break;

            default:
                property = '';
                break;
        }
    }

    return property;
}

/**
 * Generate password hash per password
 */
export function generate_pswdhash(password) {
    var crypto = require('crypto');
    var mykey = crypto.createCipher('aes-128-cbc', password);
    var pswdhash = mykey.update('abc', 'utf8', 'hex');
    pswdhash += mykey.final('hex');
    return pswdhash;
}

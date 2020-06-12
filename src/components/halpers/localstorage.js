const getNavigatorLanguage = () => (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';

/**
 * Language detector
 */
export function get_lang(user_id) {
    var language = 'en';
    if (user_id === undefined || user_id === 0) {
        language = localStorage.getItem('lang');
        if (language === null || language.length === 0) {
            language = getNavigatorLanguage();
            if (language.includes('ru')) { language = 'ru'; }
            else if (language.includes('nl')) { language = 'nl'; }
            else if (language.includes('de')) { language = 'de'; }
            else if (language.includes('es')) { language = 'es'; }
            else if (language.includes('it')) { language = 'it'; }
            else if (language.includes('fr')) { language = 'fr'; }
        }

    } else {
        language = get_item(user_id, 'lang');
        if (language === null || language.length === 0) {
            language = getNavigatorLanguage();
            if (language.includes('ru')) { language = 'ru'; }
            else if (language.includes('nl')) { language = 'nl'; }
            else if (language.includes('de')) { language = 'de'; }
            else if (language.includes('es')) { language = 'es'; }
            else if (language.includes('it')) { language = 'it'; }
            else if (language.includes('fr')) { language = 'fr'; }
        }
    }

    if (language.includes('en-GB')) {
        language = 'en';
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
        var sub_user = user_id.toString() + ',';
        if (users !== null && users !== undefined) {
            if (users.includes(sub_user) === false) {
                localStorage.setItem('users', users + sub_user);
            }
        } else {
            localStorage.setItem('users', sub_user);
        }

        localStorage.setItem('user_id', user_id);
    }
}

/**
 * Get All IDs of users who ever been logged and saved in localstorage
 */
export function get_local_users() {
    console.log('!!!!!!!!!!!! get_local_users');

    var users = [];
    if (typeof(Storage) !== 'undefined') {
        var local_users = [], locals = localStorage.getItem('users');
        if (locals !== null && locals !== undefined) {
            local_users = locals.split(',');
        }

        for (var i = 0; i < local_users.length; i++) {
            if ((local_users[i] !== 0) &&
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

                // console.log('id ' + local_users[i] + ', name ' + data.name + ', avatar ' + data.avatar);
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
    const user_props = ['name', 'email', 'surname', 'birthday', 'avatar', 'pswdhash', 'passed', 'failed', 'cards', 'lang', 'belt', 'solved', 'age'];
    var users = [];

    if (typeof(Storage) !== 'undefined') {
        var local_users = [], locals = localStorage.getItem('users');
        if (locals !== null && locals !== undefined) {
            local_users = locals.split(',');
        }

        for (var i = 0; i < local_users.length; i++) {
            if ((local_users[i] !== 0) && (local_users[i] !== user_id)) {
                users.push(local_users[i]);
            }
        }

        var new_list = '';
        if (users.length > 0) {
            for (var j = 0; j < users.length; j++) {
                new_list = new_list + users[j] + ',';
            }
        }

        localStorage.setItem('users', new_list);

        for (var k = 0; k < user_props.length; k++) {
            var key = user_id + '_' + user_props[k];
            localStorage.removeItem(key);
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
 * @param id is user id
 *
 */
export function set_item(id, key, value) {
    if ((id !== undefined) && (key !== undefined) && (value !== undefined)) {
        if (typeof(Storage) !== 'undefined') {
            // Code for localStorage
            var prefix = id.toString() + '_';
            localStorage.setItem(prefix + key, value);

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
export function get_item(id, key) {
    var property = '';
    if ((id !== undefined) && (key !== undefined)) {
        if (typeof(Storage) !== 'undefined') {
            // Code for localStorage
            var prefix = id.toString() + '_';
            property = localStorage.getItem(prefix + key);

        } else {
            // No web storage Support
            // TBD, cookies
        }
    }

    // if property is still undefined -> return default value
    if (property === undefined || property === null) {
        switch (key) {
            case 'belt':
                property = 'white';
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

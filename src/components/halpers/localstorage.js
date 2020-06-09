const getNavigatorLanguage = () => (navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';

/**
 * Language detector
 */
export function get_lang(user_id) {
    var language = '';
    if (user_id === undefined || user_id === 0) {
        language = localStorage.getItem('lang');
        if (language === null) {
            language = getNavigatorLanguage();
            if (language.includes('ru')) { language = 'ru'; }
            else if (language.includes('nl')) { language = 'nl'; }
            else if (language.includes('de')) { language = 'de'; }
            else if (language.includes('es')) { language = 'es'; }
            else if (language.includes('it')) { language = 'it'; }
            else if (language.includes('fr')) { language = 'fr'; }
            else { language = 'en'; }
        }

    } else {
        language = get_item(user_id, 'lang');
        if (language === null) {
            language = getNavigatorLanguage();
            if (language.includes('ru')) { language = 'ru'; }
            else if (language.includes('nl')) { language = 'nl'; }
            else if (language.includes('de')) { language = 'de'; }
            else if (language.includes('es')) { language = 'es'; }
            else if (language.includes('it')) { language = 'it'; }
            else if (language.includes('fr')) { language = 'fr'; }
            else { language = 'en'; }
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
    var users = localStorage.getItem('users');
    if (users !== undefined) {
        var sub_user = user_id.toString() + ',';
        if (users.toString().includes(sub_user) === false) {
            localStorage.setItem('users', users + sub_user);
        }
    } else {
        localStorage.setItem('users', sub_user);
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
    if ((id !== undefined) && (key !== undefined)) {
        if (typeof(Storage) !== 'undefined') {
            // Code for localStorage
            var prefix = id.toString() + '_';
            return localStorage.getItem(prefix + key);

        } else {
            // No web storage Support
            // TBD, cookies
        }
    }
}



import {validator} from './../translations/validator';

const charsPattern = /^[a-zA-Z]+$/;
// const letterNumber = /^[0-9a-zA-Z]+$/;
const letterNumber = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
const emailLocalPart = /^[0-9_a-z\-A-Z.]+$/;
const emailDomainPart = /^[a-zA-Z\-0-9.]+$/;
//const pswdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

/**
  * Email address validation: local-part @ case-insensitive domain
  * 
  * 
  * The maximum total length of the local-part of an email address is 64 octets
  */
export function validate_email(email, lang) {
    // general email address check for undefined and proper length
    if ((email === undefined) || (email === null)) {
        return validator[lang]['email_mandatory'];
    }
    if ((email.length < 5) || (email.length > 64)) {
        return validator[lang]['email_length'];
    }

    const parts = email.split('@');
    // local-part@domain -> [local-part] and [domain]
    if (parts.length !== 2) {
        return validator[lang]['email_at_error'];
    }

    // user name part of email address validation
    if ((parts[0].length < 4) || (parts[0].length > 31)) {
        return validator[lang]['email_username_length'];
    }
    if (emailLocalPart.test(parts[0]) !== true) {
        return validator[lang]['email_format'];
    }
    // firts symbol must be letter, last symbol must be letter or digit
    var first = parts[0].charAt(0), last = parts[0].slice(-1);
    if ((charsPattern.test(first) !== true) || (letterNumber.test(last) !== true)) {
        return validator[lang]['email_username_firstlast'];
    }

    // domain name part of email address validation
    if ((parts[1].length < 5) || (parts[1].length > 60)) {
        return validator[lang]['email_format'];
    }
    if (emailDomainPart.test(parts[1]) !== true) {
        return validator[lang]['email_format'];
    }
    first = parts[1].charAt(0); last = parts[1].slice(-1);
    if ((charsPattern.test(first) !== true) || (charsPattern.test(last) !== true)) {
        return validator[lang]['email_format'];
    }

    return 'ok';
}

/**
 * Validate name for letters and numbers only
 */
export function validate_name(name, lang) {
    if (name.length < 1) {
        return validator[lang]['name_min_length'];
    }

    if (name.length > 32) {
        return validator[lang]['name_max_length'];
    }

    if (letterNumber.test(name) !== true) {
        return validator[lang]['name_chars'];
    }

    return 'ok';
}

/**
 * Validate Surname for letters and numbers only
 * Surname can be empty, i.e. length === 0
 */
export function validate_surname(surname, lang) {
    if (surname.length > 0) {
        if (surname.length > 32) {
            return validator[lang]['name_max_length'];
        }

        if (letterNumber.test(surname) !== true) {
            return validator[lang]['name_chars'];
        }
    }

    return 'ok';
}

/**
 * Password validation
 *
 */
export function validate_pswd(pswd, lang) {
    if ((pswd.length < 5) || (pswd.length > 30)) {
        return validator[lang]['pswd_length'];
    }

    /*if (pswdPattern.test(pswd) !== true) {
        return validator[lang]['pswd_match'];
    }*/

    return 'ok';
}

/**
 * Birthday validation
 * @param birthday in format YYYY-MM-DD, for example 2014-01-28
 */
export function validate_birth(birthday, lang) {
    console.log('validate_birth ' + birthday);
    if (birthday.length !== 10) {
        return validator[lang]['birthday_length'];
    }

    // birth[0] is year
    var birth = birthday.split('-');
    if ((birth[0].length < 4) || (parseInt(birth[0]) < 1939)) {
        var date_now = parseInt((new Date()).getFullYear()) - parseInt(birth[0]);
        console.log('YURA: date_now ' + date_now);
        return validator[lang]['birthday_year'] + ' ' + date_now + validator[lang]['year_old'];
    }

    return 'ok';
}

import {validator} from './../translations/validator';

const charsPattern = /^[a-zA-Z]+$/;
const letterNumber = /^[0-9a-zA-Z]+$/;
const emailLocalPart = /^[0-9a-zA-Z.]+$/;
const emailDomainPart = /^[a-zA-Z\-0-9.]+$/;
//const pswdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

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
  * Email address validation: local-part @ case-insensitive domain
  * 
  * 
  * The maximum total length of the local-part of an email address is 64 octets
  */
export function validate_email(email, lang) {
    const parts = email.split('@');
    // local-part@domain -> [local-part] and [domain]
    if (parts.length !== 2) {
        return validator[lang]['email_format'];
    }

    var local = parts[0], domain = parts[1];
    if ((local.length < 4) || (local.length > 31)) {
        return validator[lang]['email_format'];
    }
    if (emailLocalPart.test(local) !== true) {
        return validator[lang]['email_format'];
    }
    var first = local.charAt(0), last = local.slice(-1);
    if ((charsPattern.test(first) !== true) || (charsPattern.test(last) !== true)) {
        return validator[lang]['email_format'];
    }

    console.log('local ' + local + ', domain ' + domain);
    if ((domain.length < 5) || (domain.length > 60)) {
        return validator[lang]['email_format'];
    }
    if (emailDomainPart.test(domain) !== true) {
        return validator[lang]['email_format'];
    }
    first = domain.charAt(0); last = domain.slice(-1);
    if ((charsPattern.test(first) !== true) || (charsPattern.test(last) !== true)) {
        return validator[lang]['email_format'];
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

    /*
    if (pswdPattern.test(pswd) !== true) {
        return validator[lang]['pswd_match'];
    }
    */

    return 'ok';
}

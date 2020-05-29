import {validator} from './../translations/validator';

const letterNumber = /^[0-9a-zA-Z]+$/;
const emailLocalPart = /^[0-9a-zA-Z.]+$/;
const emailDomainPart = /^[0-9a-zA-Z_-]+$/;

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

    console.log('111111111');
    var local = parts[0], domain = parts[1];
    if ((local.length < 4) || (local.length > 31)) {
        return validator[lang]['email_format'];
    }
    console.log('222222');
    if (emailLocalPart.test(local) !== true) {
        return validator[lang]['email_format'];
    }
    console.log('33333333');
    var first = local.charAt(0), last = local.slice(-1);
    if ((letterNumber.test(first) !== true) || (letterNumber.test(last) !== true)) {
        return validator[lang]['email_format'];
    }
    console.log('4444444');

    if ((domain.length < 2) || (domain.length > 60)) {
        return validator[lang]['email_format'];
    }
    console.log('5555555');
    if (emailDomainPart.test(domain) !== true) {
        return validator[lang]['email_format'];
    }
    console.log('666666666');
    first = domain.charAt(0); last = domain.slice(-1);
    if ((letterNumber.test(first) !== true) || (letterNumber.test(last) !== true)) {
        return validator[lang]['email_format'];
    }
    console.log('777777777');

    return 'ok';
}

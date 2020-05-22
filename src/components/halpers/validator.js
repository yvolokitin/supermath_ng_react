const letterNumber = /^[0-9a-zA-Z]+$/;

/**
 * Validate name for letters and numbers only
 */
export function validate_name(name, lang) {
    if (name.match(letterNumber) === true) {
        console.log('AAAAAAA ' + name.match(letterNumber));
        return 'ok';
    } else {
        return 'Please, use letters and numbers only ' + name.match(letterNumber);
    }
}

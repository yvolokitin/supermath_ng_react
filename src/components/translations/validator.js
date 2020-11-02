// validator error messages
export const validator = {
    // English
    'en': {
        'name_min_length': 'Name can\'t be blank and should has at least one character or number in length: a-z,A-Z,0-9',
        'name_max_length': 'Name length could not be longer then 32 characters: a-z,A-Z,0-9',
        'name_chars': 'Name can include only characters (uppercase or lowercase) and numbers: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Password contains enexpected symbols',
        'birthday_length': 'Birthday length does not match expected format DD/MM/YYYY',
        'birthday_year': 'We are sorry, but your birthday is too old. Do you really so old? ',
        'year_old': ' years old?',
    },
    // Russian
    'ru': {
        'name_min_length': 'Имя не может быть пустым и должно состоять хотя бы из одного символа или цифры: a-z,A-Z,0-9',
        'name_max_length': 'Имя не может содержать более 32 символов или цифр: a-z,A-Z,0-9',
        'name_chars': 'Имя должно состоять только из букв (заглавных и/или строчных) и цифр: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of for Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Пароль содержит Password contains enexpected symbols',
        'birthday_length': 'День рождения не соответствует ожидаемому формату DD/MM/YYYY',
        'birthday_year': 'Дата и год рождения должны быть актуальными. Простит, ты действительно на столько стар?',
        'year_old': ' лет?',
    },
    // Dutch
    'nl' : {
        'name_min_length': 'Naam mag niet leeg zijn en moet minstens één teken of getal lang zijn: a-z, A-Z, 0-9',
        'name_max_length': 'Naam mag niet langer zijn dan 32 karakters: a-z, A-Z, 0-9',
        'name_chars': 'Naam mag alleen tekens (hoofdletters of kleine letters) en cijfers bevatten: a-z, A-Z, 0-9',

        'email_mandatory': 'E-mailadres moet worden ingevoerd, het mag niet leeg zijn',
        'email_length': 'E-mailadres moet minimaal 5 karakters lang zijn en maximaal 64 karakters lang',
        'email_at_error': 'E-mailadres moet bestaan​​uit \'gebruikersnaam\' symbool \' @ \'en \' domeinnaam \'',
        'email_username_length': 'Gebruikersnaamgedeelte van voor e-mailadres moet minimaal 4 tekens lang zijn en maximaal 31 tekens lang',
        'email_username_firstlast': 'Het gebruikersnaamgedeelte van het e-mailadres moet beginnen met een teken (hoofdletters of kleine letters) en het laatste symbool moet tekens of cijfers zijn (a-z, A-Z, 0-9)',
        'email_format': 'E-mailadres moet de indeling gebruikersnaam@domein.nnn hebben. De gebruikersnaam moet 4-30 tekens lang zijn en kan elke combinatie zijn van letters (a-z, A-Z), cijfers (0-9) of punten (.). Voorbeelden: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz ',

        'pswd_length': 'Wachtwoord moet minimaal 5 karakters lang zijn en mag niet langer zijn dan 30 symbolen',
        'pswd_match': 'Wachtwoord bevat verwachte symbolen',
        'birthday_length': 'Verjaardag lengte komt niet overeen met verwacht formaat DD / MM / JJJJ',
        'birthday_year': 'Het spijt ons, maar je verjaardag is te oud. Ben je echt zo oud? ',
        'year_old': ' jaar oud?',
    },
    // French
    'fr' : {
        'name_min_length': 'Name can\'t be blank and should has at least one character or number in length: a-z,A-Z,0-9',
        'name_max_length': 'Name length could not be longer then 32 characters: a-z,A-Z,0-9',
        'name_chars': 'Name can include only characters (uppercase or lowercase) and numbers: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of for Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Password contains enexpected symbols',
        'birthday_length': 'Birthday length does not match expected format DD/MM/YYYY',
        'birthday_year': 'We are sorry, but your birthday is too old. Do you really so old? ',
        'year_old': ' years old?',
    },
    // German
    'de' : {
        'name_min_length': 'Name can\'t be blank and should has at least one character or number in length: a-z,A-Z,0-9',
        'name_max_length': 'Name length could not be longer then 32 characters: a-z,A-Z,0-9',
        'name_chars': 'Name can include only characters (uppercase or lowercase) and numbers: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of for Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Password contains enexpected symbols',
        'birthday_length': 'Birthday length does not match expected format DD/MM/YYYY',
        'birthday_year': 'We are sorry, but your birthday is too old. Do you really so old? ',
        'year_old': ' years old?',
    },
    // Spanish
    'es' : {
        'name_min_length': 'Name can\'t be blank and should has at least one character or number in length: a-z,A-Z,0-9',
        'name_max_length': 'Name length could not be longer then 32 characters: a-z,A-Z,0-9',
        'name_chars': 'Name can include only characters (uppercase or lowercase) and numbers: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of for Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Password contains enexpected symbols',
        'birthday_length': 'Birthday length does not match expected format DD/MM/YYYY',
        'birthday_year': 'We are sorry, but your birthday is too old. Do you really so old? ',
        'year_old': ' years old?',
    },
    // Italian
    'it' : {
        'name_min_length': 'Name can\'t be blank and should has at least one character or number in length: a-z,A-Z,0-9',
        'name_max_length': 'Name length could not be longer then 32 characters: a-z,A-Z,0-9',
        'name_chars': 'Name can include only characters (uppercase or lowercase) and numbers: a-z,A-Z,0-9',

        'email_mandatory': 'Email address must be entered, it could not be empty',
        'email_length': 'Email address should be at least 5 characters and max 64 characters in length',
        'email_at_error': 'Email address should consists from \'username\' symbol \'@\' and \'domain name\'',
        'email_username_length': 'Username part of for Email address should be at least 4 characters and max 31 characters in length',
        'email_username_firstlast': 'Username part of Email address must start from character (uppercase or lowercase) and last symbol should be character or numbers (a-z,A-Z,0-9)',
        'email_format': 'Email address should be in format username@domain.nnn. Username should be 4–30 characters long and can be any combination of letters (a-z,A-Z), numbers (0-9), or periods (.). Examples: example@site.com, jsmith@example.com, John.Smith@example.com, this_is_example@example.xyz',

        'pswd_length': 'Password should be at least 5 characters and could not be longer then 30 symbols',
        'pswd_match': 'Password contains enexpected symbols',
        'birthday_length': 'Birthday length does not match expected format DD/MM/YYYY',
        'birthday_year': 'We are sorry, but your birthday is too old. Do you really so old? ',
        'year_old': ' years old?',
    },
};

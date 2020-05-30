export const constraints = {
    name: {
        // User name is required
        presence: true,
        // And it must be between 3 and 20 characters long
        length: {
            minimum: 2,
            maximum: 20
        },
        format: {
            // We don't allow anything that a-z and 0-9
            pattern: '[a-z0-9]+',
            // but we don't care if the username is uppercase or lowercase
            flags: 'i',
            message: 'can only contain a-z and 0-9'
        }
    },
    pswd: {
        // Password is required
        presence: true,
        // And must be at least 5 characters long
        length: {
            minimum: 5
        }
    },
    email: {
        // Email is required
        presence: true,
        // and must be an email (duh)
        email: true
    },
    birth: {
        // The user needs to give a birthday
        presence: true,
        length: {
            minimum: 10,
            message: 'Birth Date should be specified in exact format: dd/mm/yyyy'
        }
    },
};

export default constraints;

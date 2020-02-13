export const constraints = {
    username: {
        presence: true,
    },
    password: {
        presence: true,
        length: {
            minimum: 6,
            message: "must be at least 6 characters"
        }
    },
    emailAddress: {
        presence: {
            allowEmpty: false,
            message: "^Please enter an email address"
        },
        email: {
            message: "^Please enter a valid email address"
        }
    },
};

export default constraints;

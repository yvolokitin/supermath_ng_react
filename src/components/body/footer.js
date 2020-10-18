import React from 'react';


import './footer.css';

export default function Footer(props) {
    const [contacts, setContacts] = React.useState(false);
    const [share, setShare] = React.useState(false);

    function onAction(type) {
        console.log('Footer.onAction -> ' + type);
        if (type === 'contacts') {
            setShare(false); setContacts(true);

        } else {
            setShare(false);
        }
    }

    return (

    );
}

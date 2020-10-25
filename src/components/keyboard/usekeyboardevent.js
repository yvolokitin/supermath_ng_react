import React from 'react';

export default function useKeyboardEvent(callback) {
    React.useEffect(() => {
        const handler = function(event) {
            callback(event.key);
        }

        window.addEventListener('keydown', handler)
        return () => {
            window.removeEventListener('keydown', handler)
        }

    }, [callback])
}

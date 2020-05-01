import React from 'react';

const Navigation = ({ handleRoute, loggedIn, route }) => {

    if (loggedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim black underline pa3 pointer'
                    onClick={() => handleRoute('signin', false)}
                >
                    Sign Out
                </p>
            </nav>
        )
    } else if (route === 'signin') {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => handleRoute('register', false)}>Register</p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p className='f3 link dim black underline pa3 pointer' onClick={() => handleRoute('signin', false)}>Sign In</p>
            </nav>
        )
    }

};

export default Navigation;
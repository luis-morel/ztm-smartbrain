import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, you have scanned `}<span className='f2'>{entries}</span>{` image(s).`}
            </div>
        </div>
    )
};

export default Rank;
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
    return (
        <div className='center ma'>
            <div id='imageContainer' className='absolute mt2'>
                <img
                    alt='Faces'
                    id='userImage'
                    src={imageUrl}
                    height='auto'
                    width='500px'
                />
                <div
                    className='bounding-box'
                    style={
                        {
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol
                        }
                    }
                />
            </div>
        </div>
    )
};

export default FaceRecognition;
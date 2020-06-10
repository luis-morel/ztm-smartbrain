import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ handleInput, handleSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                    <input
                        type='text'
                        className='f4 pa2 w-70 center'
                        onChange={handleInput}
                        placeholder='Enter image URL'
                    />
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={handleSubmit}
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ImageLinkForm;
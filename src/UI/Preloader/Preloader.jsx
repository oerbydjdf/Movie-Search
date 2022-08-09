import React from 'react';
import './stylePreload.css';
import PrelodIcon from '../../IMG/preloader.gif';

const Preloader = ({preload}) => {
    return (
        (preload)?
            <div className='clock-loader'>
                <img className='loader' src={PrelodIcon} alt="" />
            </div>
            : <></>
    );
};

export default Preloader;
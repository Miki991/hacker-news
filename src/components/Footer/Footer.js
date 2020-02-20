import React from 'react';
import './Footer.scss';


const Footer = () => {
    return (
        <footer className='d-flex justify-content-center align-items-center'>
            <p className='text-center mb-0'>
                Created with 
                <img 
                    src="/assets/img/heart.png"
                    alt='Heart'
                    className='heart-icon' />
                and <i>React.js</i>
                <img 
                    src='/assets/img/react.png' 
                    alt='React Logo'
                    className='react-icon' />
            </p>
        </footer>
    )
}


export default Footer;
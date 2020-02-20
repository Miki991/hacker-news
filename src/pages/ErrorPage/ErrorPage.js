import React from 'react';
import './ErrorPage.scss';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';


const ErrorPage = () => {
    return (
        <section className='error-page h-100 d-flex flex-column justify-content-center align-items-center'>
            <Fade> 
                <h1>This page does not exist.</h1>
                <Link to='/' exact='true'>Back to Homepage</Link>
            </Fade>
        </section>
    )
}


export default ErrorPage;
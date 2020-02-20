import React from 'react';
import './TopArrow.scss';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const TopArrow = () => {

    const goToTop = () => {
        window.scroll({top: 0, behavior: 'smooth'})
    }

    return (
        <div onClick={goToTop} className='to-top position-fixed d-flex justify-content-center align-items-center'>
            <FontAwesomeIcon icon={faArrowUp} color='white' />
        </div>
    )
}

export default TopArrow;
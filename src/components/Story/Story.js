import React, { useState } from 'react';
import './Story.scss';
import Comments from '../Comments/Comments';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'



const Story = props => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);

    const displayComments = () => {
        setShowComments(!showComments);

        let arr = [];

        if (!comments.length && props.data.kids) {
            for (let comment of props.data.kids) {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    arr.push(data);

                    if (arr.length === props.data.kids.length) {
                        arr.sort((a,b) => b.time - a.time);
                        setComments(arr);
                    }
                })
            }
        }
    }

    const renderCommentsButton = () => {
        if (showComments && props.data.kids) {
            return (
                <button onClick={displayComments}>
                    HIDE COMMENTS <FontAwesomeIcon icon={faChevronUp} className='ml-1' />
                </button>
            )
        } else if (!showComments && props.data.kids) {
            return (
                <button onClick={displayComments}>
                    SHOW COMMENTS <FontAwesomeIcon icon={faChevronDown} className='ml-1' />
                </button>
            )
        } else { 
            return null; 
        }
    }

    return (
        <Fade>
            <div className='story position-relative py-4' data-id={props.data.id}>
                <h2 className='mb-2 text-center text-md-left'>
                    <span>{props.data.index}. </span>
                    <a 
                        target='_blank' 
                        rel='noopener noreferrer' 
                        href={props.data.url}>{props.data.title}
                    </a>
                </h2>
                <div className='story-info d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-center'>
                    <div className='story-details d-flex align-items-center'>
                        <p className='mb-3 mb-md-0'>{props.data.score} points | by 
                            <span className='author-name'> {props.data.by} </span> | 
                            <span>
                                &nbsp;comments: {props.data.kids ? props.data.kids.length : 0}
                            </span>
                        </p>
                    </div>
                    <div className='story-btns'>
                        {renderCommentsButton()}
                    </div>
                </div>
                {showComments ? 
                    <div className='container'>
                        <Comments comments={comments} />
                    </div> : null 
                } 
            </div>
        </Fade>
    )
}


export default Story;
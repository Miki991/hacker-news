import React, {useState} from 'react';
import './Comment.scss';
import Fade from 'react-reveal/Fade'
import Comments from '../Comments/Comments';


const Comment = props => {
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);

    const renderTime = (time) => {
        let date = new Date(time).toUTCString();

        return date;
    }

    const displayReplies = (comment) => {
        setShowReplies(!showReplies);

        let arr = [];

        if (!replies.length && comment.kids) {
            for (let com of comment.kids) {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${com}.json?print=pretty`)
                .then(res => res.json())
                .then(data => {
                    arr.push(data);

                    if (arr.length === comment.kids.length) {
                        arr.sort((a,b) => b.time - a.time);
                        setReplies(arr);
                    }
                })
            }
        }
    }

    const setComment = comment => {
        // Setting comment with dangerouslySetInnerHTML as comment body is a string with <p /> and <a /> tags in it
        return {__html: comment}; 
    }

    return (
        <Fade key={props.comment.id}>
            <div 
                className='single-comment py-3' 
                key={props.comment.id} 
                data-id={props.comment.id}>
                <p className='comment-author font-weight-bold mb-1'>
                    {props.comment.by}
                </p>
                <p className='comment-time'>
                    {renderTime(props.comment.time)}
                </p>
                <p 
                    dangerouslySetInnerHTML={setComment(props.comment.text)}
                    className='comment-body'>
                </p>
                {props.comment.kids ? 
                    <button 
                        className='text-white btn comment-btn'
                        onClick={() => displayReplies(props.comment)}>
                        {showReplies ? 'HIDE REPLIES' : 'SHOW REPLIES'}
                    </button> : null
                }
                {showReplies ? <Comments replies={true} comments={replies} /> : null}
            </div>
        </Fade>
    )
}


export default Comment;
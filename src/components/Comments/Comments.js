import React from 'react';
import './Comments.scss';
import CommentsLoader from '../CommentsLoader/CommentsLoader';
import Comment from '../Comment/Comment';



const Comments = props => {
    return (
        <div className={props.replies ? `comments replies my-3` : `comments my-3`}>
            {props.comments.length ?
                props.comments.map(comment => <Comment comment={comment} key={comment.id} />)
                :
                <CommentsLoader />
            }
        </div>
    )
}


export default Comments;
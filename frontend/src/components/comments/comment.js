import { useEffect, useState } from 'react';
import baseUrl from '../../util/baseUrl'; // Assuming baseUrl is imported correctly
import { formatDistanceToNow } from 'date-fns';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useCommentContext } from './CommentContext';

const Comment = ({ comment, deleteComment }) => {  
    const { comments, dispatch } = useCommentContext();
    const token = window.localStorage.getItem('token');
    const userId = window.localStorage.getItem('userId');
    const [errorMessage, setErrorMessage] = useState('');
    // const [childCommentText, setChildCommentText] = useState('');
    // const [showChildComments, setShowChildComments] = useState(false);
    // const [showReplyBox, setShowReplyBox] = useState(false);

    // // Manage submission of child comments
    // const handleSubmitChildComment = async (e) => {
    //     e.preventDefault();
    //     if (childCommentText.trim() !== '') {
    //         try {
    //             const response = await fetch(`${baseUrl}/comments/${comment._id}/children`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${token}`, // Assuming token is defined
    //                 },
    //                 body: JSON.stringify({ comment_message: childCommentText }),
    //             });
    //             if (response.ok) {
    //                 // Child comment posted successfully
    //                 setChildCommentText('');
    //                 setShowReplyBox(false);
    //             } else {
    //                 throw new Error('Failed to add child comment');
    //             }
    //         } catch (error) {
    //             console.error('Error adding child comment:', error);
    //             setErrorMessage('Failed to add child comment');
    //         }
    //     } else {
    //         console.log('User tried to leave a blank comment');
    //     }
    // };

    // // Handle change in child comment input
    // const handleChildCommentChange = (e) => {
    //     setChildCommentText(e.target.value);
    // };

    return (
        <>
            {/* Comment Authorline - Profile Pic, Time, Name */}
            <div className={`comment-container mb-2 ${comment.parentComment ? 'pl-4 border-l-2 border-gray-300' : ''}`}>
                <div className="comment-content w-1/2 bg-gray-100 rounded-lg p-2">
                    <span className='comment-user font-bold text-sm'>{comment.commenter.firstName} {comment.commenter.lastName}</span>
                    <p className='comment-message text-sm'>{comment.comment_message}</p>
                </div>
                <span className='comment-date text-gray-500 ml-2 text-xs'>
                    {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                </span>
                {/* Button to open reply input box
                <button
                    className="reply-button text-xs font-bold text-gray-400 hover:underline cursor-pointer ml-2"
                    onClick={() => setShowReplyBox(!showReplyBox)}
                >
                    Reply
                </button> */}

            {/* Delete Button */}
            {comment.commenter._id === userId && (
              <span
                className="text-xs text-blue-400 ml-2 hover:text-blue-600 hover:underline cursor-pointer"
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </span>
            )}
            </div>
    
             {/* Reply input box
             {showReplyBox && (
                <form onSubmit={handleSubmitChildComment}>
                    <div className="relative w-full">
                        <input
                            type='text'
                            value={childCommentText}
                            onChange={handleChildCommentChange}
                            placeholder='Write a reply...'
                            className='new-post-message border border-gray-300 rounded-xl p-2 resize-none bg-gray-100 w-full mb-4 pr-16'
                        />
                        <button className='absolute right-1 top-0 bottom-4 bg-transparent text-gray-600 px-2 py-1 rounded cursor-pointer' type='submit'>
                            <MdKeyboardDoubleArrowRight />
                        </button>
                    </div>
                </form>
            )}
            {!showChildComments && comment.children.length > 0 && (
                <button className="reply-button text-sm font-bold text-gray-400 hover:underline cursor-pointer" onClick={() => setShowChildComments(true)}>
                    {comment.children.length === 1 ? 
                        'View 1 reply' : 
                        `View all ${comment.children.length} replies`}
                </button>
            )}

            {showChildComments && (
                <div className="child-comments">
                    {comment.children.map(child => (
                        <div key={child._id} className="child-comment pl-4 border-l-2 border-gray-300">
                            <Comment key={child._id} comment={child} />
                        </div>
                    ))}
                    <button className="reply-button text-sm font-bold text-gray-400 hover:underline cursor-pointer" onClick={() => setShowChildComments(false)}>Hide Replies</button>
                </div>
            )} */}

        </>
    );
};

export default Comment;




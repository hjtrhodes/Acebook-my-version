import React, { useState } from 'react';
import baseUrl from '../../util/baseUrl';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Comment from './comment';
import { useCommentContext } from './CommentContext';

const Comments = ({ comment_objects_array, postId, onAddComment, onDeleteComment }) => {
    const { dispatch } = useCommentContext();
    const token = window.localStorage.getItem('token');
    const [comment_message, setComment_Message] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCommentChange = (e) => {
        setComment_Message(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (comment_message.trim() !== '') {
            try {
                const response = await fetch(`${baseUrl}/comments/${postId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ comment_message: comment_message }),
                });

                if (response.ok) {
                    setComment_Message('');
                    const data = await response.json();
                    window.localStorage.setItem('token', data.token);
                    // Dispatch action to add comment
                    dispatch({ type: 'ADD_COMMENT', payload: data.newComment });
                    onAddComment(data.newComment);
                } else {
                    throw new Error('Failed to add comment');
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                setErrorMessage('Failed to add comment');
            }
        } else {
            console.log('User tried to leave a blank comment');
            setComment_Message('');
            return;
        }
    };

    const deleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                const response = await fetch(`${baseUrl}/comments/${commentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Dispatch action to delete comment
                    dispatch({ type: 'DELETE_COMMENT', payload: commentId });
                    onDeleteComment(commentId);
                    console.log("Comment deleted successfully!");
                } else {
                    console.error("Failed to delete comment");
                    alert("An error occurred. Please try again later.");
                }
            } catch (error) {
                console.error("Error in deleting comment:", error);
                alert("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div>
            {/* Comments List */}
            <div className='comments-list p-2'>
                <div className="w-full flex-col mb-2">
                    {comment_objects_array
                        .slice()
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((comment) => (
                            <article key={comment._id}>
                                <Comment comment={comment} deleteComment={deleteComment} />
                            </article>
                        ))}
                </div>
            </div>

            {/* Input Box for New Parent Comment */}
            <form onSubmit={handleSubmitComment} className='comment-form flex justify-center'>
                <div className="relative w-full">
                    <input
                        type='text'
                        value={comment_message}
                        onChange={handleCommentChange}
                        placeholder='Write a comment...'
                        className='new-post-message border border-gray-300 rounded-xl p-2 resize-none bg-gray-100 w-full mb-4 pr-10'
                    />
                    <button className='absolute right-1 top-0 bottom-4 bg-transparent text-gray-600 px-2 py-1 rounded cursor-pointer' type='submit'>
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Comments;


      
import { useEffect, useState } from 'react';
import baseUrl from '../../util/baseUrl';
import { formatDistanceToNow } from 'date-fns';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Comment from './comment'

const Comments = ({ comment_objects_array, postId }) => {
    const token = window.localStorage.getItem('token');
    const [comment_message, setComment_Message] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Manage state of main comments
    const handleCommentChange = (e) => {
        setComment_Message(e.target.value);
    };

    // Manage submission of parent comments
    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment_message.trim() !== '') {
            fetch(`${baseUrl}/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment_message: comment_message }),
            })
                .then(async (response) => {
                    if (response.ok) {
                        setComment_Message('');
                        // Update the token if necessary
                        let data = await response.json();
                        window.localStorage.setItem('token', data.token);
                    } else {
                        throw new Error('Failed to add comment');
                    }
                })
                .catch((error) => {
                    console.error('Error adding comment:', error);
                    setErrorMessage('Failed to add comment');
                });
        } else {
            console.log('User tried to leave a blank comment');
            setComment_Message('');
            return;
        }
    };

    return (
        <div>
            {/* Comments List (each comment has ability to input and submit child comment)*/}
            <div className='comments-list p-2'>
                <div className="w-full flex-col mb-2">
                    {comment_objects_array
                        .slice()
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((comment) => (
                            <article key={comment._id}>
                                <Comment comment={comment} />
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

      
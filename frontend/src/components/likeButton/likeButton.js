import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useState } from 'react';
import baseUrl from '../../util/baseUrl';

const LikeButton = (props) => {
    const [likesState, setLikesState] = useState("");

    const checkIfUserHasLikedPost = async () => {
        try {
            const userId = window.localStorage.getItem("userId");
            const token = window.localStorage.getItem("token");

            if (!userId || !token) {
                console.error("User ID or token is missing, user not logged in");
                throw new Error("User ID or token is missing, user not logged in");
            }

            const response = await fetch(`${baseUrl}/posts/${props.postId}/likes`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                },
                body: JSON.stringify({ 
                    imageId: props.postId,
                    userId: userId 
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                props.updateLikeCount(responseData.likes);
                setLikesState(responseData.message);
            } else {
                console.error('Failed to access userID array');
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    const handleSubmitLikes = async (e) => {
        e.preventDefault();
        checkIfUserHasLikedPost();
    };

    return (
        <>
            <form onSubmit={handleSubmitLikes}>
                <button
                    className={`likeButton transform hover:-translate-y-1 w-full rounded-full p-1 mb-1`}
                    type='submit'
                    onClick={handleSubmitLikes}
                >
                    <span className="flex items-center text-gray-400">
                        {likesState ? <AiFillLike size={30} className="mr-1" style={{ color: 'blue' }} /> : <AiOutlineLike size={30} className="mr-1" />}
                        <span className={`font-bold ${likesState ? 'text-blue-700' : ''}`}>Like</span>
                    </span>
                </button>
            </form>
        </>
    );
};

export default LikeButton;


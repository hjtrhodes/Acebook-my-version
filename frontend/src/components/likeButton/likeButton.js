import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import baseUrl from '../../util/baseUrl';

const LikeButton = (props) => {

    const UpdateLikeOrUnlike = async () => {
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
                },
                body: JSON.stringify({ 
                    userId: userId 
                }),
            });

            if (response.ok) {
                props.getLikesAmountandUserLiked();
            } else {
                console.error('Failed to access userID array');
            }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    const handleSubmitLikes = async (e) => {
        e.preventDefault();
        UpdateLikeOrUnlike();
        props.getLikesAmountandUserLiked();
    };

    return (
        <>
            <form onSubmit={handleSubmitLikes}>
                <button
                    className={`likeButton transform w-full rounded-full pt-1`}
                    type='submit'
                    onClick={handleSubmitLikes}
                >
                    <span className="flex items-center justify-center text-gray-400">
                        {props.likesState ? <AiFillLike size={30} className="mr-1" style={{ color: 'blue' }} /> : <AiOutlineLike size={30} className="mr-1" />}
                        <span className={`font-bold ${props.likesState  ? 'text-blue-700' : ''}`}>Like</span>
                    </span>
                </button>
            </form>
        </>
    );
};

export default LikeButton;


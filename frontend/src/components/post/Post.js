import { useEffect, useState } from 'react';
import LikeButton from '../likeButton/likeButton';
import baseUrl from '../../util/baseUrl';
import { formatDistanceToNow } from 'date-fns';
import { FaRegComment } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import Comments from '../comments/comments';


const Post = ({ post, setForceRerender }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [likesState, setLikesState] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);
  const [comments, setComments] = useState(post.comments);
  const userId = window.localStorage.getItem("userId");

  const getLikesAmountandUserLiked = async () => {
      try {
          const token = window.localStorage.getItem("token");

          const response = await fetch(`${baseUrl}/posts/${post._id}/${userId}/likes`, {
              method: 'get',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const responseData = await response.json();
              setNoOfLikes(responseData.likes);
              setLikesState(responseData.likedByUser);
          } else {
              console.error('Failed to get likes amount and liked status');
          }
      } catch (error) {
          console.error('Error in fetching or parsing data:', error);
      }
  };

  useEffect(() => {
      getLikesAmountandUserLiked();
  }, [likesState]);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
};

const deletePost = async () => {
  const token = window.localStorage.getItem("token");
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      const response = await fetch(`${baseUrl}/posts/${post._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

        if (response.ok) {
          // Handle successful deletion, e.g., remove the post from your data source
          console.log("Post deleted successfully!");
          setForceRerender();
          // Add logic to update your UI to reflect the deleted post
        } else {
          console.error("Failed to delete post");
          alert("An error occurred. Please try again later.");
        }
      } catch (error) {
        console.error("Error in deleting post:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

    // Function to update comments state when a new comment is added
    const handleAddComment = (newComment) => {
      setComments([...comments, newComment]);
    };
  
    // Function to update comments state when a comment is deleted
    const handleDeleteComment = (deletedCommentId) => {
      setComments(comments.filter(comment => comment._id !== deletedCommentId));
    };

  return (
<>
      <div className='postcontainer rounded-lg shadow-lg bg-white mb-3 border' data-cy='post'>
      
      {/* Author info */}
        <div className='author-info mb-3'>
      
      {/* Profile Image and Author Details */}
        {post.author.firstName ? (
          <>
            <div className='authorline flex items-center p-2'>
      
      {/* Profile Image */}
        {post.author.profileImage ? (
          <a href={`/posts/user/${post.author._id}`}>
              <img
                  src={`data:image/png;base64, ${post.author.profileImage}`}
                  alt='ProfilePic'
                  className='w-12 h-12 rounded-full cursor-pointer hover:shadow-md mr-2 border border-gray-100'
              />
          </a>
            ) : (
              <a href={`/posts/user/${post.author._id}`}>
              <RxAvatar size={40} className="mr-2 border border-gray-100" />
              </a>
            )}



      {/* Author Details */}
            <div className="flex flex-col">
              <span className='authorlinetext'>{post.author.firstName} {post.author.lastName}</span>
            <small className='smallText text-gray-400 ml-1 hover:underline'>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</small>
          {/* Delete Button */}
              {post.author._id === userId && (
              <span
                className="text-xs text-blue-400 ml-1 hover:text-blue-600 hover:underline cursor-pointer"
                onClick={deletePost}
              >
                Delete post
              </span>
            )}
            </div>
          </div>
          <p className='pl-4 pb-2 max-w-[95%]'>{post.message}</p>
          </>
            ) : (
              'Loading...'
            )}


      {/* Line separator */}
          <div className="w-full h-px bg-gray-300"></div>

      {/* Post Image */}
        <article key={post._id}>
        {post.image && (
          <img src={`data:image/png;base64, ${post.image}`} alt='Post' className='flex justify-center w-full' />
        )}
        </article>
      </div>


    {/* Like and Comment Section */}
        <div className='likeamountandcommentsamount flex justify-center w-full text-gray-400 mb-2'>
    {/* Like Count */}
        <div className="w-1/2 flex justify-center items-center hover:underline">
            <p>{noOfLikes} {noOfLikes === 1 ? 'like' : 'likes'}</p>
        </div>

    {/* Comment Button */}
      <div className="w-1/2 flex justify-center items-center hover:underline">
          <button className='comment-button' onClick={toggleContent}>
            {isContentVisible ? (
              <p className='text-gray-400 hover:underline cursor-pointer'>{comments.length} comments</p>
            ) : (
              <p className='text-gray-400 hover:underline cursor-pointer'>{comments.length} comments</p>
            )}
          </button>
      </div>
      </div>
      
      {/* Line separator */}
        <div className="h-px mr-2 ml-2 bg-gray-300"></div>

      <div className="flex justify-center mb-2" data-cy="post">
      {/* Like Container */}
        <div className='likecontainer bg-white w-1/2 pl-2 pr-1' data-cy='post'>
      {/* Like Button */}
            <div className="mt-2 w-full hover:bg-gray-100">
              <LikeButton getLikesAmountandUserLiked={getLikesAmountandUserLiked} likesState={likesState} postId={post._id}/>
            </div>
        </div>

      {/* Comment Container */}
        <div className='commentcontainer bg-white w-1/2 pr-2 pl-1' data-cy='post'>
      {/* Comment Button */}
            <div className="mt-2 w-full hover:bg-gray-100 flex items-center justify-center">
            <button
              className='comment-button flex items-center p-1'
              onClick={toggleContent}
            >
              <FaRegComment size={30} className="mr-2 text-gray-400" />
              <span className="font-bold text-gray-400 ">Comment</span>
            </button>
            </div>
        </div>
      </div>

      {/* Line separator */}
        <div className="h-px mr-2 ml-2 bg-gray-300"></div>

      {/* Comments Container */}
      {isContentVisible && (
        <div className="comments-container w-full pr-1 pl-1 pt-2">
          <Comments
            comment_objects_array={comments} // Pass updated comments array
            postId={post._id}
            onAddComment={handleAddComment} // Pass callback function to add comment
            onDeleteComment={handleDeleteComment} // Pass callback function to delete comment
          />
        </div>
      )}
        </div>

  </>
  );
};

export default Post;

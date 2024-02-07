import { useEffect, useState } from 'react';
import LikeButton from '../likeButton/likeButton';
import ProfileImageThumbnail from '../profileImageThumbnail/ProfileImageThumbnail';
import baseUrl from '../../util/baseUrl';
import { formatDistanceToNow } from 'date-fns';
import { FaRegComment } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const Post = ({ post }) => {
  const token = window.localStorage.getItem('token');
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const [likesState, setLikesState] = useState(false);
  const [noOfLikes, setNoOfLikes] = useState(0);

  const getLikesAmountandUserLiked = async () => {
      try {
          const userId = window.localStorage.getItem("userId")
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
  }, [noOfLikes, likesState]);


  useEffect(() => {
    if (token) {
      fetch(`${baseUrl}/users/${post.author}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(async (result) => {
          setAuthor(result.user);
        })
        .catch((err) => console.error(err));
    } else {
      console.log('No token set (in Post component)');
    }
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      console.log(comments);
      setComments([
        ...comments,
        {
          comment_message: comment,
          date: Date.now(),
          firstName: author.firstName ? author.firstName : 'Loading...',
          lastName: author.lastName ? author.lastName : 'Loading...',
        },
      ]);
      setComment('');
    } else {
      console.log('User tried to leave a blank comment');
      setComment('');
      return;
    }
    fetch(`${baseUrl}/posts/${post._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: comment }),
    })
      .then(async (response) => {
        let data = await response.json();
        window.localStorage.setItem('token', data.token);
      });
  };

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };

  return (
    <>
    <div className='postcontainer rounded-lg shadow-lg bg-white mb-3 border' data-cy='post'>
      <div data-cy='author-info' className='author-info mb-3'>
        {author ? (
          <>
            <div className='authorline flex items-center p-4'>
              <ProfileImageThumbnail user={author} />
              <div className="flex flex-col">
                <span className='authorlinetext'>{author.firstName} {author.lastName}</span>
                <small className='smallText text-gray-400 hover:underline'>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</small>
              </div>
            </div>
            <div className='pl-4 pb-2'>{post.message}</div>
          </>
        ) : (
          'Loading...'
        )}
        <div className="w-full h-px bg-gray-300"></div> {/* Line separator */}
        <article key={post._id}>
          {post.image && (
            <img src={`data:image/png;base64, ${post.image}`} alt='Post' className='flex justify-center w-full' />
            )}
        </article>
        </div>


        <div className='likeamountandcommentsamount flex justify-center w-full text-gray-400 mb-2'>
          <div className="w-1/2 flex justify-center items-center hover:underline">
            <p>{noOfLikes} {noOfLikes === 1 ? 'like' : 'likes'}</p>
          </div>
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
      
      <div className="w-full h-px bg-gray-300"></div> {/* Line separator */}
      
      <div className='comments flex items-center justify-center w-full mt-2 mb-2'>
  <div className="w-1/2 flex items-center justify-center">
    <LikeButton getLikesAmountandUserLiked={getLikesAmountandUserLiked} likesState={likesState} postId={post._id}/>
  </div>
  
  <div className="w-1/2 flex items-center justify-center">
  <button
    className='comment-button hover:-translate-y-1 w-full rounded-full p-1 mb-1'
    onClick={toggleContent}
  >
    {isContentVisible ? (
      <span className="flex items-center text-gray-400 justify-center">
        <FaRegComment size={30} className="mr-2" />
        <span className="font-bold">Comment</span>
      </span>
    ) : (
      <span className="flex items-center text-gray-400 justify-center">
        <FaRegComment size={30} className="mr-2" />
        <span className="font-bold">Comment</span>
      </span>
    )}
  </button>
  </div>
  </div>

  {isContentVisible && (
  <div className='comments-list p-2'>
    <div className="w-full flex-col mb-2">
      {comments.map((comment, index) => (
        <div key={index} className='comment-container mb-2'>
          <div className="comment-content w-1/2 bg-gray-100 rounded-lg p-2">
            <span className='comment-user font-bold text-sm'>{comment.firstName} {comment.lastName}</span>
            <p className='comment-message text-sm'>{comment.comment_message}</p>
          </div>
          <span className='comment-date text-gray-500 ml-2 text-xs'>{formatDistanceToNow(new Date(comment.date), { addSuffix: true })}</span>
        </div>
      ))}
    </div>

    <form onSubmit={handleSubmitComment} className='comment-form flex justify-center'>
      <div className="relative w-full">
        <input
          type='text'
          value={comment}
          onChange={handleCommentChange}
          placeholder='Write a comment...'
          className='new-post-message border border-gray-300 rounded-xl p-2 resize-none bg-gray-100 w-full mb-4 pr-10' // Add right padding to accommodate the button
        />
        <button className='absolute right-1 top-0 bottom-4 bg-transparent text-gray-600 px-2 py-1 rounded cursor-pointer' type='submit'>
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </form>
  </div>
)}

    </div>
    </>
  );
};

export default Post;


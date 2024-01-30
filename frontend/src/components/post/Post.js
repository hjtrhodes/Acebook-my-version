import React, { useEffect, useState } from 'react';
import './Post.css';
import LikeButton from '../likeButton/likeButton';
import ProfileImageThumbnail from '../profileImageThumbnail/ProfileImageThumbnail';
import baseUrl from '../../util/baseUrl';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post }) => {
  const token = window.localStorage.getItem('token');
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isContentVisible, setIsContentVisible] = useState(false);

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
          displayName: author.displayName ? author.displayName : 'Loading...',
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
    <div className='postcontainer' data-cy='post'>
      <div data-cy='author-info' className='author-info'>
        {author ? (
          <>
            <div className='authorline'>
            <span className='authorlinetext'>
              <ProfileImageThumbnail user={author} />
              </span>
              {`${author.displayName}`}
            </div>
          </>
        ) : (
          'Loading...'
        )}
      </div>

      <div className='postcontentandlikebutton'>
        <article data-cy='post' key={post._id}>
          <div className='post'>
            <img src={`data:image/png;base64, ${post.image}`} alt='Post' />
            <br />
            <div>{post.message}</div>
            <small className='smallText'>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</small>
          </div>
        </article>
        <LikeButton post_id={ post._id }/>
      </div>

      <div className='comments'>
        <button className='comment-button' onClick={toggleContent}>
          {isContentVisible ? `Hide Comments` : `${comments.length} comments`}
        </button>
        {isContentVisible && (
          <div>
            <div className='comments-list'>
              {comments.map((comment, index) => (
                <div key={index} className='comment'>
                  <span className='comment-message'>{comment.comment_message}</span>
                  <br />
                  <span className='comment-info'>
                    {comment.displayName} - {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitComment} className='comment-form'>
              <input
                type='text'
                value={comment}
                onChange={handleCommentChange}
                placeholder='Add a comment...'
                className='comment-input'
              />
              <button className='comment-button' type='submit'>
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;

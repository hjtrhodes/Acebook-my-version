import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css'
import NavBar from '../navBar/NavBar';
import NewPost from '../newPost/NewPost'
import baseUrl from '../../util/baseUrl';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch(`${baseUrl}/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))

          setPosts(data.posts);
        })

    } // TODO redirect to login page if token exists
  }, [token])
  
  if(token) {
    return (
      <div className='main-container'>
        <div className='navbar-container'>
          <NavBar posts={posts} navigate={navigate} />
        </div>
        <div className='feedcontainer'>
          <h2>Home</h2>
          <div className='newPostcontainer'>
            <NewPost />
          </div>
          <h3>All Posts</h3>
          <div id='feed' role="feed">
            {posts
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                <article key={post._id}><Post post={post} /></article>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
      navigate('/login')
    }
}

export default Feed;

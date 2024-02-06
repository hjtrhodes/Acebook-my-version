import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import baseUrl from '../../util/baseUrl';


const ProfileFeed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch(`${baseUrl}/posts/user`, {
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
  }, [])


  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
    if(token) {
      return(
        <>
          <article>
          <div id='profilefeed' role="profilefeed" className='main-container bg-gray-100 pt-4 z-0'>
            <div className='w-full sm:w-1/3 mx-auto z-0'>
              {posts
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((post) => (
                  <Post post={ post } key={ post._id } /> )
              )}
          </div>
          </div>
        </article> 
        </>
      )
    } else {
      navigate('/login')
    }
}

export default ProfileFeed;

import { useEffect, useState } from 'react';
import Post from '../post/Post'
import NavBar from '../navBar/NavBar';
import NewPost from '../newPost/NewPost'
import baseUrl from '../../util/baseUrl';
import Find from '../find/Find.js'

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // Define fetchPosts function
  const fetchPosts = async () => {
    try {
      if (token) {
        const response = await fetch(`${baseUrl}/posts`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          window.localStorage.setItem("token", data.token);
          setToken(data.token); // Update token only if different
          setPosts(data.posts);
        } else {
          // Handle non-200 response
        }
      } else {
        // Handle case where token is not available
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle fetch error
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if(token) {
    return (
      <>
      <NavBar posts={posts} navigate={navigate} />
      <div className='main-container bg-gray-100 pt-4 z-0'>
        <div className='w-full sm:w-1/3 mx-auto z-0'>
            {/* Pass fetchPosts to the NewPost component */}
            <NewPost fetchPosts={fetchPosts}/>
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
    </>
    );
  } else {
      navigate('/login')
    }
}

export default Feed;

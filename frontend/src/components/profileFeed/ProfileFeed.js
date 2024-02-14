import { useEffect, useState } from 'react';
import Post from '../post/Post'
import baseUrl from '../../util/baseUrl';


const ProfileFeed = ({ navigate }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
    
        if (!token) {
            // Redirect to '/login' if no token is found
            window.location.href = '/login';
            return; // Stop further execution of useEffect
        }
    
        fetch(`${baseUrl}/posts/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(async data => {
            window.localStorage.setItem("token", data.token);
            setPosts(data.posts);
        });
    }, []);
    

        return(
            <>
            
            <div id='profilefeed' role="profilefeed" className='main-container bg-gray-100 pt-4 z-0'>
                <div className='w-full sm:w-1/3 mx-auto z-0'>
                {posts
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                    <article key={ post._id }><Post post={ post } /></article>  
                    ))}
                </div>
            </div>
        </>
    )
};

export default ProfileFeed;

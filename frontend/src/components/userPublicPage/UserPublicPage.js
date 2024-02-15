import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import defaultProfile from '../../assets/defaultProfile.png';
import './UserPublicPage.css'
import ChronologicalPosts from '../chronologicalPosts/ChronologicalPosts';
import baseUrl from '../../util/baseUrl';
import { RxAvatar } from "react-icons/rx";

const UserPublicPage = ({ navigate }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [postsList, setPostsList] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (userInfo && postsList) {
      return;
    }
    if (token) {
      // Get user info
      fetch(`${baseUrl}/users/${userId}`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
      }
      })
      .then(res => res.json())
      .then(async data => {
        setUserInfo(data.user);
      })
      .then(() => {
        // Afterwards; get posts list
        fetch(`${baseUrl}/posts/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res => res.json())
        .then(async data => {
          setPostsList(data.posts);
        })
        .catch(err => console.error(err));
      })
      .catch(err => console.error(err));

    } else {
      navigate('/login');
    }
  }, [token, navigate, userInfo, postsList, userId]);

  if (!token) {
    navigate('/login');
  }
  return (
    <>
      <NavBar />
      <div className="main-container bg-gray-100 pt-10 z-0">
        <div className="profilecontainer w-full sm:w-1/3 mx-auto z-0 bg-gray-100">
          {userInfo && ( // Conditionally render if userInfo is not null
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="text-3xl font-bold">
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <div className="profilepic flex">
                {userInfo.profileImage ? (
                  <img
                    src={`data:image/png;base64, ${userInfo.profileImage}`}
                    alt="ProfilePic"
                    className="w-20 h-20 rounded-full cursor-pointer hover:shadow-md mr-2 border border-gray-100 mt-2"
                  />
                ) : (
                  <RxAvatar size={40} className="mr-2 border border-gray-100" />
                )}
              </div>
            </div>
          )}
        </div>
  
        {postsList ? (
          <ChronologicalPosts posts={postsList} />
        ) : (
          <h2>Loading posts...</h2>
        )}
      </div>
    </>
  );
  
}

export default UserPublicPage;

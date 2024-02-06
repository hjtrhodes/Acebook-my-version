import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar'
import defaultProfile from '../../assets/defaultProfile.png';
import ProfileFeed from '../profileFeed/ProfileFeed';
import NewPost from '../newPost/NewPost';
import baseUrl from '../../util/baseUrl';

const Profile = ({ navigate }) => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');


  useEffect(() => {
    if (token) {
      fetch(`${baseUrl}/users/display-name`, {
        headers: { 
          'Authorization': `Bearer ${token}` 
      }
      })
        .then(res => res.json())
        .then(async data => {
          setProfile(data)})
        .catch(err => console.error(err));
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  console.log('This is my console print of', profile);

        return(
          <>
        
        <NavBar/>

        <div className='main-container bg-gray-100 pt-10 z-0'>
        <div className='profilecontainer w-full sm:w-1/3 mx-auto z-0 bg-gray-100  '>
        
        <div className='flex flex-col justify-center items-center h-full'>
        <h2 className='text-3xl font-bold'>{firstName} {lastName}</h2>
        <div className='profilepic flex'>
        <img src={defaultProfile} alt="Default Profile Image"/>
        </div>
        <button className='submitbutton bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 mt-4 mb-4 rounded-lg'>
          Update Profile Image
        </button>
        </div>

        <NewPost />
        </div>
        <div className='feed'>
        <ProfileFeed  navigate={navigate}/>
        </div>
        <div/>
        </div>
        </>
      )
}

export default Profile;

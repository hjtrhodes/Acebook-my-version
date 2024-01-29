import React, { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar'
import defaultProfile from '../../assets/defaultProfile.png';
import ProfileFeed from '../profileFeed/ProfileFeed';
import NewPost from '../newPost/NewPost';
import './Profile.css';

// Some logic required: If you're landing on your own profile, you see the update image. If you're landing on another person's profile, you don't. 
// But do you see follow/unfollow instead? 

// const Profile = ({ navigate, currentUserId, profileOwnerId }) => {
//     const isOwnProfile = currentUserId === profileOwnerId;

const Profile = ({ navigate }) => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch('/users/display-name', {
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
        <div className='profilecontainer'>
        <h2>Profile Name: <strong className='username'>{profile && profile?.displayName}</strong></h2>
        
        <div className='profilepic'>
        <img src={defaultProfile} alt="Default Profile Image"/>
        </div>
        
        {/* {isOwnProfile && (
        <button>Update Profile Image</button>
      )}
       */}
        <br />
        <button className='submitbutton'>Update Profile Image</button>
        
        <div>
        <NewPost />
        </div>
        
        {/* <h3>Post & Number</h3>
        <h3>Followers & Number</h3>
        <h3>Following & Number</h3> */}
        <ProfileFeed navigate={navigate}/>
        </div>
        </>
      )
}

export default Profile;

import { useEffect, useState } from 'react';
import NavBar from '../navBar/NavBar'
import ProfileFeed from '../profileFeed/ProfileFeed';
import NewPost from '../newPost/NewPost';
import baseUrl from '../../util/baseUrl';
import { RxAvatar } from "react-icons/rx";
import Modal from '../modal/modal';

const Profile = ({ navigate }) => {
  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem("userId");
  const [selectedImage, setSelectedImage] = useState(null);
  const [userObject, setUserObject] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };

  // Fetch User Object using UserID
  useEffect(() => {
    const fetchProfileUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/userProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        window.localStorage.setItem('token', data.token);
        setUserObject(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchProfileUserData();
  }, [token, selectedImage]);

  // Adding Profile Image Functionality
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleAddProfileImage = async (event) => {
    event.preventDefault();
    
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage);
  
        const response = await fetch(`${baseUrl}/users/profileImage`, {
          method: 'PUT', 
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Profile image updated successfully:', data.message);
          // Close the modal after successful image upload
          handleCloseModal();
          handleClearImage();
        } else {
          console.error('Failed to update profile image:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    } else {
      console.error('No image selected.');
    }
  };
  
  return (
    <>
      <NavBar />

<div className="main-container bg-gray-100 pt-10 z-0">
  <div className="profilecontainer w-full sm:w-1/3 mx-auto z-0 bg-gray-100  ">
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-3xl font-bold">
        {userObject.user?.firstName} {userObject.user?.lastName}
      </h2>
      <div className="profilepic flex">
        {userObject.user?.profileImage ? (
          <img
            src={`data:image/png;base64, ${userObject.user.profileImage}`}
            alt="ProfilePic"
            className="w-20 h-20 rounded-full cursor-pointer hover:shadow-md mr-2 border border-gray-100 mt-2"
          />
        ) : (
          <RxAvatar size={40} className="mr-2 border border-gray-100" />
        )}
      </div>

        <div className="file-input inline-block cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 mt-4 mb-4 rounded-lg flex items-center z-0 ">
          <span className="text-white ml-2 z-0">
            <button onClick={handleOpenModal}><strong>Update Profile Image</strong></button>
          </span>
        </div>
    </div>
  <NewPost />
<div className='feed'>
</div>
  </div>
  <ProfileFeed navigate={navigate}/>
</div>

{/* Modal Component */}
<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  <h2 className="text-center text-xl font-bold mb-4">Upload Profile Image</h2>
  <input type="file" onChange={handleImageChange} className="block mx-auto mb-4" />
  {selectedImage && (
    <div className="max-h-[50vh] flex flex-col items-center mb-4">
      <img
        src={URL.createObjectURL(selectedImage)}
        alt="Selected"
        className="w-full h-auto object-cover"
        style={{ maxHeight: '45vh' }}
      />
      <div className="flex items-center justify-between w-full max-w-sm mt-4">
        <div className="w-1/2">
          <button onClick={handleAddProfileImage} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
        <div className="w-1/2 ml-4">
          <button onClick={handleClearImage} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Clear
          </button>
        </div>
      </div>
    </div>
  )}
</Modal>


<div/>
</>
)
}

    
    export default Profile;
    
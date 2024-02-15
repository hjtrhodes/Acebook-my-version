import React, { useState, useEffect, useContext } from 'react';
import { FindContext } from '../findContext/FindContext.js';
import baseUrl from '../../util/baseUrl';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/modal.js';

const Find = ( { isModalOpen, toggleModal } ) => {
  const { setSearchResults } = useContext(FindContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${baseUrl}/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData.users);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleUserSearch = () => {
    const foundUsers = users.filter(user =>
      (user.firstName.toLowerCase() + user.lastName.toLowerCase()).includes(searchQuery.toLowerCase())
    ).map(({ _id, firstName, lastName }) => ({ _id, firstName, lastName }));
  
    setUserSearchResults(foundUsers);
  };

  const handleUserClick = (userId) => {
    // Redirect to the user's profile page
    navigate(`/posts/user/${userId}`);
    // Close the modal after redirection if needed
    toggleModal();
    setSearchQuery('');
  };
  return (
    <div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <div className="flex flex-col justify-center items-center  mr-4 w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleUserSearch();
              }}
              className="rounded-lg p-2 border border-gray-300 focus:outline-none focus:border-blue-500"
            />
  
            <div className="mt-2 w-full max-h-40 overflow-y-auto">
              {userSearchResults.map(user => (
                <div key={user._id} onClick={() => handleUserClick(user._id)} className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                  {user.firstName} {user.lastName}
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Find;




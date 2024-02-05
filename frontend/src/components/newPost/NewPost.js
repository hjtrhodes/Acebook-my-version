import React, { useState } from 'react';
import Modal from 'react-modal';
import baseUrl from '../../util/baseUrl';
import { FcAddImage } from "react-icons/fc";
import { FaTimes } from 'react-icons/fa'

const NewPost = ({ user_id }) => {
    const [message, setMessage] = useState("");
    const [modalMessage, setModalMessage] = useState(""); // State for the modal text box
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [image, setImage] = useState(null); 
    const [characterCount, setCharacterCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayName = localStorage.getItem('displayName');

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
        setMessage(""); 
        setImage(null) 
        
        const formData = new FormData();
        formData.append('message', modalMessage); // Use modalMessage for the form data
        formData.append('image', image);

        console.log(`Bearer ${token}`);

        const response = await fetch(`${baseUrl}/posts`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {
            const responseData = await response.json(); 
            console.log(responseData);
        } else {
            console.log("Message not captured");
            console.log(JSON.stringify(response));
        }
    };

    const handleMessageChange = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        setCharacterCount(inputValue.length); 
    };

    const handleModalMessageChange = (event) => {
        const inputValue = event.target.value;
        setModalMessage(inputValue); // Update the state for the modal text box
    };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleReset = () => { 
        window.location.reload(); 
    };

    return(
        <>
                {image && (
                    <div className="image-preview">
                        <img
                            alt="not found"
                            width={"450px"}
                            height={"300px"}
                            src={URL.createObjectURL(image)}
                        />
                    </div>
                )}

                    <div className="rounded-lg shadow-lg p-4 bg-white mb-3 border">
                    <form
                        className="newpostform flex flex-col items-center justify-center"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        >
                        <textarea
                            placeholder={`What's on your mind, ${displayName}?`}
                            className="new-post-message border border-gray-300 rounded-xl p-2 resize-none bg-gray-100 w-full mb-4"
                            maxLength="250"
                            rows="1"
                            value={message}
                            onChange={handleMessageChange}
                            onClick={() => setIsModalOpen(true)}
                            />
                        <div className="w-full h-px bg-gray-300 mb-4"></div> {/* Line separator */}
                        <input
                            type="file"
                            id="postImage"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            />
                        <label
                            htmlFor="postImage"
                            className="file-input inline-block cursor-pointer transition-transform duration-300 transform hover:-translate-y-1"
                            ><div className="file-input inline-block cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 flex items-center">
                            <FcAddImage size={40} />
                            <span className="text-gray-400 ml-2"><strong>Photo</strong></span>
                        </div>
                        </label>
                    </form>
                </div>
                
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 flex items-center justify-center"
                    shouldCloseOnOverlayClick={true}
                >
                <div className="bg-white rounded-lg p-4 w-full sm:max-w-lg">
                    <div className="flex justify-between items-center mb-4">
                        <strong className="block text-black text-center p-2 flex-grow">Create Post</strong>
                        <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <div className="w-full h-px bg-gray-300 mb-4"></div> {/* Line separator */}
                    <textarea
                        placeholder={`What's on your mind, ${displayName}?`}
                        className="border border-gray-300 rounded-lg p-2 resize-none bg-gray-100 w-full focus:bg-white"
                        value={modalMessage}
                        onChange={handleModalMessageChange}
                        rows="6"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded mt-2" onClick={handleSubmit}>Post</button>
                    <div className="w-full h-px bg-gray-300 mb-4"></div> {/* Line separator */}
                    <input
                        type="file"
                        id="postImage"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="postImage"
                        className="file-input inline-block cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 text-center w-full"
                    >
                        <div className="flex justify-center items-center">
                            <FcAddImage size={40} />
                            <span className="text-gray-400 ml-2"><strong>Photo</strong></span>
                        </div>
                    </label>
                </div>
            </Modal>
        </>
    );
};

export default NewPost;


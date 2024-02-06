import { useState } from 'react';
import baseUrl from '../../util/baseUrl';
import { FcAddImage } from "react-icons/fc";

const NewPost = ({ fetchPosts }) => {
    const [message, setMessage] = useState("");
    const [token] = useState(window.localStorage.getItem("token"));
    const [image, setImage] = useState(null); 
    const [isFocused, setIsFocused] = useState(false);
    const [showPostButton, setShowPostButton] = useState(false);
    const firstName = window.localStorage.getItem('firstName');

    const handleSubmit = async (event) => { 
        event.preventDefault(); 
    
        const formData = new FormData();
        formData.append('message', message);
        formData.append('image', image);
    
        try {
            const response = await fetch(`${baseUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) { 
                setMessage("");
                setImage(null);
                setShowPostButton(false);
                setTimeout(() => {
                    fetchPosts();
                }, 2000);
            } else {
                console.log("Error:", response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };
    
    const handleMessageChange = (event) => {
        const inputValue = event.target.value;
        setMessage(inputValue);
        setShowPostButton(!!inputValue.trim()); // Show the post button if there's text
    };
    

    const handleTextAreaFocus = () => {
        setIsFocused(true);
    };

    const handleTextAreaBlur = () => {
        setIsFocused(false);
    };

    return(
        <div className="rounded-lg shadow-lg p-4 bg-white mb-3 border">
                        {image && (
                            <div className="image-preview flex items-center justify-center mb-3">
                                <img
                                    alt="not found"
                                    width={"450px"}
                                    height={"300px"}
                                    src={URL.createObjectURL(image)}
                                />
                            </div>
                        )}
                    
            <form
                className="newpostform flex flex-col items-center justify-center"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <textarea
                    placeholder={`What's on your mind, ${firstName}?`}
                    className={`new-post-message border border-gray-300 rounded-xl p-3 resize-none bg-gray-100 w-full mb-4`}
                    maxLength="250"
                    value={message}
                    onChange={handleMessageChange}
                    onFocus={handleTextAreaFocus}
                    onBlur={handleTextAreaBlur}
                />
                {showPostButton && (
                    <button 
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-lg mb-2"
                        onClick={handleSubmit}
                    >
                        Post
                    </button>
                )}
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
                >
                    <div className="file-input inline-block cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 flex items-center">
                        <FcAddImage size={40}/>
                        <span className="text-gray-400 ml-2" ><strong>Photo</strong></span>
                    </div>
                </label>
            </form>
        </div>
    );
};

export default NewPost;



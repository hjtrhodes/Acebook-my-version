// App.js
import React from 'react';
import { CommentProvider } from '../comments/CommentContext.js';
import './App.css';
import LoginForm from '../login/LoginForm';
import SignUpForm from '../signup/SignUpForm';
import { Navigation } from '../navBar/navigation';
import NewPost from '../newPost/NewPost';
import Feed from '../feed/Feed';
import UserPublicPage from '../userPublicPage/UserPublicPage';
import Profile from '../profile/Profile';
import Post from '../post/Post';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { FindContext } from '../findContext/FindContext.js';
import { useState } from 'react';
import Result from '../result/Result';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const App = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
      <FindContext.Provider value={{ searchResults, setSearchResults }}>
        <CommentProvider>
          <Routes>
            <Route path="/" element={<LoginForm navigate={useNavigate('/login')} />} />
            <Route path="/posts/*" element={<Feed navigate={useNavigate()} />} />
            <Route path="/posts/user/:userId/*" element={<UserPublicPage navigate={useNavigate()} />} />
            <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
            <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
            <Route element={<Navigation />} />
            <Route path="/profile/*" element={<Profile navigate={useNavigate()} />} />
            <Route path="/newpost/*" element={<NewPost navigate={useNavigate()} />} />
            <Route path="/posts/:postId/*" element={<Post />} />
            <Route path="/posts/:postId/likes/*" element={<Post />} />
          </Routes>
        </CommentProvider>
      </FindContext.Provider>

  );
};

export default App;
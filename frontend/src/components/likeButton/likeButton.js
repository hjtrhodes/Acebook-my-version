import likebutton from './static/like.png';
import React, { useState, useEffect } from 'react';
import './likeButton.css';
import LikeAmount from './likeAmount';
import baseUrl from '../../util/baseUrl';

const LikeButton = (props) => {
    const [likes, setLikes] = useState(0);
    const [token, setToken] = useState(window.localStorage.getItem('token'));

    const updateLikesOnServer = async (newLikes) => {
        try {
        const response = await fetch(`${baseUrl}/posts/${props.post_id}/likes`, {
            method: 'put',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ likes : newLikes }),
        });
    
        if (response.ok) {
            const data = await response.json();
            window.localStorage.setItem('token', data.token);
        } else {
            console.error('Failed to update likes');
        }
        } catch (error) {
            console.error('Error in fetching or parsing data:', error);
        }
    };

    const AddOrRemovePostIdtoUserifLikedOrUnliked = async () => {
    try {
        const response = await fetch(`${baseUrl}/users/likes`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: props.post_id }),
        });

        if (response.ok) {
        const data = await response.json();
            if (data.postIsLiked === true) {
                setLikes(1);
            } 
            else if (
                data.postIsLiked === false
            ) {
                setLikes(-1);
            } 
        } else {
        console.error('Failed to check if liked');
        }
    } catch (error) {
        console.error('Error in fetching or parsing data:', error);
    }
};

useEffect(() => {
    updateLikesOnServer(likes);
}, [likes]);


    const handleSubmitLikes = async (e) => {
    e.preventDefault();
        AddOrRemovePostIdtoUserifLikedOrUnliked()
    };

    return (
    <>
        <form onSubmit={handleSubmitLikes}>
            <button
            className='likeButton'
            type='submit'
            onClick={handleSubmitLikes}
            >
            <img src={likebutton} alt='Like' />
            </button><br />
            <LikeAmount likes={ likes } post_id={ props.post_id } />
        </form>
    </>
    );
};

export default LikeButton;
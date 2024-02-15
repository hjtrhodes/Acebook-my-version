// CommentContext.js
import React, { createContext, useContext, useReducer } from 'react';

const CommentContext = createContext();

const commentReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'DELETE_COMMENT':
            return state.filter(comment => comment.id !== action.payload);
        default:
            return state;
    }
};

export const CommentProvider = ({ children }) => {
    const [comments, dispatch] = useReducer(commentReducer, []);

    return (
        <CommentContext.Provider value={{ comments, dispatch }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => useContext(CommentContext);

import React from 'react';
import Post from '../post/Post';

const ChronologicalPosts = ({ posts }) => {
  return (
    <>
      <div className="chronological-posts">
        <div className='main-container bg-gray-100 pt-4 z-0'>
          <div className='w-full sm:w-1/3 mx-auto z-0'>
            {posts.length === 0 ? (
              <p className="flex justify-center">This user has not posted yet.</p>
            ) : (
              posts
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                  <article key={post._id}><Post post={post} /></article>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChronologicalPosts;
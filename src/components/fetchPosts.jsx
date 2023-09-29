import React, { useState, useEffect } from "react";
import DeletePost from "./deletePost";
import MakePost from "./makePost";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function FetchAllPosts({ token }) {
  const [posts, setPosts] = useState([]);

  async function FetchPosts() {
    try {
      const response = await fetch(`${BASE_URL}/posts`);
      const result = await response.json();
      setPosts(result.data.posts);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    FetchPosts();
  }, []);

  return (
    <>
      <MakePost token={`${token}`} FetchPosts={FetchPosts} />
      <div>
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <h2>{post.title}</h2>
            <h5>{post.description}</h5>
            <h4>{post.price}</h4>
            <h2>{post.author.username}</h2>
            <h3>{post.location}</h3>
            <button className="detail-button" data-id="${post._id}">
              See Details
            </button>
            <DeletePost
              postId={post._id}
              token={`${token}`}
              FetchPosts={FetchPosts}
            >
              Delete Post
            </DeletePost>
          </div>
        ))}
      </div>
    </>
  );
}
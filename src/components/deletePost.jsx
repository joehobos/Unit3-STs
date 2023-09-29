import React from "react";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function DeletePost({ postId, token, FetchPosts }) {
  async function handleDelete() {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);

      FetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
}
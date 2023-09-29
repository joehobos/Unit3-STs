import React, { useState } from "react";

const COHORT_NAME = "2302-ACC-PT-WEB-PT-C";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function MakePost({ token, FetchPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location,
            willDeliver,
          },
        }),
      });
      const result = await response.json();
      console.log(result);

      FetchPosts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Create a Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          required
        ></textarea>
        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter Price"
          required
        />
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          required
        />
        <label>Will Deliver:</label>
        <input
          type="checkbox"
          checked={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}
import React, { useState } from "react";
import FetchAllPosts from "./components/fetchPosts";
import RegisterUser from "./components/registerUser";
import './App.css'

import Login from "./components/login";
// import MyData from "./components/myData";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <Login setToken={setToken} />
      <FetchAllPosts token={token} />
      {/* <MyData /> */}
      <RegisterUser />
    </>
  );
}
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PostList from "../components/PostList";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error fetching posts:", err));
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Log Out</button>
      <hr />
      <PostList posts={posts} />
    </div>
  );
}

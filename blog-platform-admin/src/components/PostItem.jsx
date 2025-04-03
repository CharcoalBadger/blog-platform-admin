import { Link } from "react-router-dom";

export default function PostItem({ post }) {
  return (
    <li style={{ marginBottom: "1rem" }}>
      <h3>{post.title}</h3>
      <p>Status: {post.published ? "Published" : "Draft"}</p>
      <Link to={`/edit/${post.id}`}>✏️ Edit</Link>
    </li>
  );
}

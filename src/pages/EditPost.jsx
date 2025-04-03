import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams(); // Get the post id from the URL
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific post
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
      });
  }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();

  const postData = { title, content, published };

  const token = localStorage.getItem("token");

  // Log the token to check if it's null or missing
  console.log("Token being sent:", token);

  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Add the token in the Authorization header
    },
    body: JSON.stringify(postData),
  });

  if (res.ok) {
    navigate("/dashboard"); // Redirect to dashboard after successful update
  } else {
    const errorData = await res.json();
    console.error("Error:", errorData); // Log the error response
    alert("Failed to update post");
  }
};



  // Show a loading message while the post is being fetched
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            Published:
            <input
              type="checkbox"
              checked={published}
              onChange={() => setPublished(!published)}
            />
          </label>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

import PostItem from "./PostItem";

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <ul>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

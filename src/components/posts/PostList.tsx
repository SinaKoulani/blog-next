import type { Post } from "@/types/post";
import PostCard from "./PostCard";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="py-12 text-center text-gray-600">No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
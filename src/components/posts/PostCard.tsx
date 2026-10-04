import Link from "next/link";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <img
        src={post.coverImage}
        alt={post.title}
        className="aspect-video w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3 text-sm text-gray-500">
          <span>{post.category.name}</span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString("en-US")}
          </time>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-blue-700"
          >
            {post.title}
          </Link>
        </h2>
        <p className="leading-6 text-gray-600">{post.excerpt}</p>
      </div>
    </article>
  );
}
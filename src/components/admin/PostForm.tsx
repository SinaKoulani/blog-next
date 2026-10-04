"use client";

import { useState, type FormEvent } from "react";
import type { Category } from "@/types/category";
import type { Post, PostStatus } from "@/types/post";

export type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  categoryId: string;
  status: PostStatus;
  coverImage: string;
  content: string;
};

type PostFormProps = {
  initialData?: Partial<Post>;
  categories: Category[];
  onSubmit: (data: PostFormData) => void | Promise<void>;
  isSubmitting?: boolean;
};



// Receive initial form data and create state to store the current form data
export default function PostForm({
  initialData,
  categories,
  onSubmit,
  isSubmitting = false,
}: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    excerpt: initialData?.excerpt ?? "",
    categoryId: initialData?.category?.id ?? "",
    status: initialData?.status ?? "draft",
    coverImage: initialData?.coverImage ?? "",
    content: initialData?.content ?? "",
  });


  // Update a specific field in the form state
  function updateField<Key extends keyof PostFormData>(
    field: Key,
    value: PostFormData[Key],
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
  }


  // Handle form submission and send the form data
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit(formData);
  }


  // Reusable styles for inputs and labels
  const inputClassName =
    "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelClassName = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClassName}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={(event) => updateField("title", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="slug" className={labelClassName}>
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          required
          value={formData.slug}
          onChange={(event) => updateField("slug", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClassName}>
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          required
          value={formData.excerpt}
          onChange={(event) => updateField("excerpt", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className={labelClassName}>
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            value={formData.categoryId}
            onChange={(event) => updateField("categoryId", event.target.value)}
            className={inputClassName}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelClassName}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={(event) =>
              updateField(
                "status",
                event.target.value === "published" ? "published" : "draft",
              )
            }
            className={inputClassName}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="coverImage" className={labelClassName}>
          Cover Image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(event) => updateField("coverImage", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label htmlFor="content" className={labelClassName}>
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          required
          value={formData.content}
          onChange={(event) => updateField("content", event.target.value)}
          className={inputClassName}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}
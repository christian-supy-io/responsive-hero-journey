import { useState } from "react";
import { BlogForm } from "./blog/BlogForm";
import { BlogList } from "./blog/BlogList";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image_url?: string;
  created_at: string;
}

export const BlogSection = () => {
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {editingPost ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
        <BlogForm
          initialData={editingPost || undefined}
          onSuccess={() => setEditingPost(null)}
        />
      </section>
      
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Existing Blog Posts</h2>
        <BlogList onEdit={setEditingPost} />
      </section>
    </>
  );
};
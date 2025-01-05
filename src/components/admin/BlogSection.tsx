import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Save, X, ImagePlus } from "lucide-react";

export const BlogSection = () => {
  const { toast } = useToast();
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState<File | null>(null);
  
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

  const { data: blogPosts = [], refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: 1,
          title: "Getting Started with Web Development",
          category: "Development",
          excerpt: "Learn the basics of web development and start your journey...",
          date: "Mar 1, 2024",
          imageUrl: "/placeholder.svg"
        },
        {
          id: 2,
          title: "Design Principles for Modern Websites",
          category: "Design",
          excerpt: "Explore key design principles that make websites stand out...",
          date: "Mar 2, 2024",
          imageUrl: "/placeholder.svg"
        },
        {
          id: 3,
          title: "The Future of Technology",
          category: "Technology",
          excerpt: "Discover upcoming trends in technology and their impact...",
          date: "Mar 3, 2024",
          imageUrl: "/placeholder.svg"
        },
      ];
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setBlogImage(e.target.files[0]);
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const handleAddBlogPost = () => {
    toast({
      title: "Success",
      description: "Blog post added successfully",
    });
    setBlogTitle("");
    setBlogCategory("");
    setBlogContent("");
    setBlogImage(null);
    refetch();
  };

  const startEditing = (post: any) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditCategory(post.category);
    setEditExcerpt(post.excerpt);
    setEditImage(null);
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditCategory("");
    setEditExcerpt("");
    setEditImage(null);
  };

  const handleSaveEdit = (postId: number) => {
    toast({
      title: "Success",
      description: "Blog post updated successfully",
    });
    setEditingPost(null);
    refetch();
  };

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Add New Blog Post</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              value={blogCategory}
              onChange={(e) => setBlogCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="min-h-[200px]"
              placeholder="Write your blog post content..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {blogImage && (
                <img
                  src={URL.createObjectURL(blogImage)}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              )}
            </div>
          </div>
          <Button onClick={handleAddBlogPost}>Add Blog Post</Button>
        </div>
      </section>
      
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Existing Blog Posts</h2>
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="p-6 border rounded-lg space-y-4">
              {editingPost === post.id ? (
                <div className="space-y-4">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  <Input
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Edit category"
                  />
                  <Textarea
                    value={editExcerpt}
                    onChange={(e) => setEditExcerpt(e.target.value)}
                    placeholder="Edit excerpt"
                    className="min-h-[100px]"
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Update Image</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageChange}
                        className="flex-1"
                      />
                      {editImage ? (
                        <img
                          src={URL.createObjectURL(editImage)}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded"
                        />
                      ) : (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleSaveEdit(post.id)}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={cancelEditing}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.category}</p>
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <p className="mt-2">{post.excerpt}</p>
                      </div>
                    </div>
                    <Button variant="ghost" onClick={() => startEditing(post)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
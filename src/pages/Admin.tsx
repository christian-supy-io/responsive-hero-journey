import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Save, X } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  
  // About section states
  const [story, setStory] = useState("Founded in 2024, ModernTech has been at the forefront of creating innovative digital solutions.");
  const [mission, setMission] = useState("We strive to empower businesses and individuals with cutting-edge technology solutions that drive growth and success.");
  
  // Blog post states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogContent, setBlogContent] = useState("");
  
  // Edit states
  const [editingPost, setEditingPost] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editExcerpt, setEditExcerpt] = useState("");

  // Simulated blog posts data
  const { data: blogPosts = [], refetch } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: 1,
          title: "Getting Started with Web Development",
          category: "Development",
          excerpt: "Learn the basics of web development and start your journey...",
          date: "Mar 1, 2024",
        },
        {
          id: 2,
          title: "Design Principles for Modern Websites",
          category: "Design",
          excerpt: "Explore key design principles that make websites stand out...",
          date: "Mar 2, 2024",
        },
        {
          id: 3,
          title: "The Future of Technology",
          category: "Technology",
          excerpt: "Discover upcoming trends in technology and their impact...",
          date: "Mar 3, 2024",
        },
      ];
    },
  });

  const handleSaveAbout = () => {
    toast({
      title: "Success",
      description: "About section updated successfully",
    });
  };

  const handleAddBlogPost = () => {
    toast({
      title: "Success",
      description: "Blog post added successfully",
    });
    setBlogTitle("");
    setBlogCategory("");
    setBlogContent("");
    refetch();
  };

  const startEditing = (post: any) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
    setEditCategory(post.category);
    setEditExcerpt(post.excerpt);
  };

  const cancelEditing = () => {
    setEditingPost(null);
    setEditTitle("");
    setEditCategory("");
    setEditExcerpt("");
  };

  const handleSaveEdit = (postId: number) => {
    // Here you would typically make an API call to update the blog post
    toast({
      title: "Success",
      description: "Blog post updated successfully",
    });
    setEditingPost(null);
    refetch();
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Admin Panel</h1>
        
        {/* About Section Management */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Edit About Section</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Story</label>
              <Textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mission Statement</label>
              <Textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <Button onClick={handleSaveAbout}>Save About Section</Button>
          </div>
        </section>
        
        {/* Blog Management */}
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
            <Button onClick={handleAddBlogPost}>Add Blog Post</Button>
          </div>
        </section>
        
        {/* Existing Blog Posts */}
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
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.category}</p>
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <p className="mt-2">{post.excerpt}</p>
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
      </div>
    </div>
  );
};

export default Admin;
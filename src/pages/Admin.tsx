import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Admin = () => {
  const { toast } = useToast();
  
  // About section states
  const [story, setStory] = useState("Founded in 2024, ModernTech has been at the forefront of creating innovative digital solutions.");
  const [mission, setMission] = useState("We strive to empower businesses and individuals with cutting-edge technology solutions that drive growth and success.");
  
  // Blog post states
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogContent, setBlogContent] = useState("");
  
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
    // Here you would typically make an API call to save the about content
    toast({
      title: "Success",
      description: "About section updated successfully",
    });
  };

  const handleAddBlogPost = () => {
    // Here you would typically make an API call to add a new blog post
    toast({
      title: "Success",
      description: "Blog post added successfully",
    });
    setBlogTitle("");
    setBlogCategory("");
    setBlogContent("");
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
              <div key={post.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.category}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;

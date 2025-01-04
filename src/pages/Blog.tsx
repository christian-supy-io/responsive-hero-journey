import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Simulated API call - in a real app, this would fetch from your backend
const fetchBlogPosts = async () => {
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
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts = [], isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: fetchBlogPosts,
  });

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
          <div className="text-center text-red-500">
            Error loading blog posts. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="text-sm text-primary font-medium mb-2">
                  {post.category}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">{post.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
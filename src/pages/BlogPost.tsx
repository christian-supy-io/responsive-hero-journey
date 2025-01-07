import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  content: string;
  image_url?: string;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as BlogPost;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            Error loading blog post. Please try again later.
          </div>
          <Button
            onClick={() => navigate('/blog')}
            className="mt-4 mx-auto block"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          onClick={() => navigate('/blog')}
          variant="ghost"
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <article className="prose prose-lg mx-auto">
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8"
            />
          )}
          <div className="text-sm text-primary font-medium mb-2">
            {post.category}
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-8">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/uploadHelpers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogFormProps {
  onSuccess: () => void;
  initialData?: {
    id: string;
    title: string;
    category: string;
    content: string;
    excerpt: string;
    image_url?: string;
  };
}

export const BlogForm = ({ onSuccess, initialData }: BlogFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let imageUrl = initialData?.image_url;

      if (image) {
        imageUrl = await uploadImage(image);
      }

      if (initialData?.id) {
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title,
            category,
            content,
            excerpt,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title,
            category,
            content,
            excerpt,
            image_url: imageUrl,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: initialData ? "Blog post updated successfully" : "Blog post created successfully",
      });
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Content</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
          placeholder="Write your blog post content..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Excerpt</label>
        <Textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="min-h-[100px]"
          placeholder="Write a short excerpt..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
        />
        {(initialData?.image_url || image) && (
          <img
            src={image ? URL.createObjectURL(image) : initialData?.image_url}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Post" : "Create Post"}
      </Button>
    </div>
  );
};
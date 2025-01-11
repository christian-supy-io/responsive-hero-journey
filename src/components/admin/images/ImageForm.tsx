import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/utils/uploadHelpers";

interface ImageFormData {
  title: string;
  description?: string;
  image_url?: FileList;
}

interface ImageFormProps {
  initialData?: {
    id: string;
    title: string;
    description?: string;
    image_url: string;
  };
  onSuccess: () => void;
}

export const ImageForm = ({ initialData, onSuccess }: ImageFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ImageFormData>({
    defaultValues: {
      title: "hero",
      description: initialData?.description || "",
    },
  });

  const onSubmit = async (data: ImageFormData) => {
    try {
      setIsLoading(true);
      let imageUrl = initialData?.image_url;

      // Check if a new file was uploaded
      if (data.image_url && data.image_url.length > 0) {
        imageUrl = await uploadImage(data.image_url[0]);
      }

      if (initialData) {
        const { error } = await supabase
          .from('images')
          .update({
            title: "hero",
            description: data.description,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        if (!imageUrl) {
          toast({
            title: "Error",
            description: "Please select an image to upload",
            variant: "destructive",
          });
          return;
        }

        const { error } = await supabase
          .from('images')
          .insert({
            title: "hero",
            description: data.description,
            image_url: imageUrl,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Hero image ${initialData ? "updated" : "added"} successfully`,
      });
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: `Failed to ${initialData ? "update" : "add"} hero image`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value="hero"
          disabled
          className="mt-1 bg-gray-100"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          className="mt-1"
          placeholder="Enter image description..."
        />
      </div>

      <div>
        <Label htmlFor="image">Hero Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          {...register("image_url")}
          className="mt-1"
        />
      </div>

      {initialData?.image_url && (
        <div className="mt-4">
          <img
            src={initialData.image_url}
            alt="Current hero image"
            className="max-w-xs rounded-lg"
          />
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Hero Image" : "Add Hero Image"}
      </Button>
    </form>
  );
};
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utils/uploadHelpers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";

interface TeamFormProps {
  onSuccess: () => void;
  initialData?: {
    id: string;
    name: string;
    position: string;
    image_url?: string;
  };
}

export const TeamForm = ({ onSuccess, initialData }: TeamFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(initialData?.name || "");
  const [position, setPosition] = useState(initialData?.position || "");
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
          .from('team_members')
          .update({
            name,
            position,
            image_url: imageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert({
            name,
            position,
            image_url: imageUrl,
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: initialData ? "Team member updated successfully" : "Team member added successfully",
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
        <label className="block text-sm font-medium mb-2">Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Position</label>
        <Input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Enter position"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Profile Image</label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && setImage(e.target.files[0])}
            className="flex-1"
          />
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={image ? URL.createObjectURL(image) : initialData?.image_url}
              alt="Preview"
            />
            <AvatarFallback>
              <ImagePlus className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update Member" : "Add Member"}
      </Button>
    </div>
  );
};
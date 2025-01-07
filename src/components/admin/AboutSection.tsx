import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const AboutSection = () => {
  const { toast } = useToast();
  const [story, setStory] = useState("");
  const [mission, setMission] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      const { data, error } = await supabase
        .from('about_section')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching about section:', error);
        return;
      }

      if (data) {
        setStory(data.story);
        setMission(data.mission);
      }
    };

    fetchAboutData();
  }, []);

  const handleSaveAbout = async () => {
    try {
      setIsLoading(true);
      const { data: existing } = await supabase
        .from('about_section')
        .select('id')
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('about_section')
          .update({ story, mission, updated_at: new Date().toISOString() })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_section')
          .insert({ story, mission });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "About section updated successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">Edit About Section</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Company Story</label>
          <Textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="min-h-[100px]"
            placeholder="Enter your company's story..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mission Statement</label>
          <Textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            className="min-h-[100px]"
            placeholder="Enter your mission statement..."
          />
        </div>
        <Button onClick={handleSaveAbout} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save About Section"}
        </Button>
      </div>
    </section>
  );
};
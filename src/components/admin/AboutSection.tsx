import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const AboutSection = () => {
  const { toast } = useToast();
  const [story, setStory] = useState("Founded in 2024, ModernTech has been at the forefront of creating innovative digital solutions.");
  const [mission, setMission] = useState("We strive to empower businesses and individuals with cutting-edge technology solutions that drive growth and success.");

  const handleSaveAbout = () => {
    toast({
      title: "Success",
      description: "About section updated successfully",
    });
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
  );
};
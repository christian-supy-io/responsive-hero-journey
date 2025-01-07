import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AboutSection {
  mission: string;
  story: string;
}

const About = () => {
  const { data: aboutData, isLoading, error } = useQuery({
    queryKey: ['about-section'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_section')
        .select('*')
        .maybeSingle();

      if (error) throw error;
      return data as AboutSection;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
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
          <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
          <div className="text-center text-red-500">
            Error loading about section. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
          <div className="text-center text-gray-500">
            No about section content available.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <div className="prose max-w-none">
            {aboutData.mission.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <div className="prose max-w-none">
            {aboutData.story.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
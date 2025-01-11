import { ArrowRight, Microscope, Beaker, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const features = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: "Advanced Imaging",
    description: "State-of-the-art optical imaging techniques for translational research",
  },
  {
    icon: <Beaker className="w-6 h-6" />,
    title: "Alternative Models",
    description: "Developing innovative translational models for better research outcomes",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Nano Health",
    description: "Exploring nanotechnology applications in healthcare and research",
  },
];

const Home = () => {
  const { data: heroImage } = useQuery({
    queryKey: ['heroImage'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('title', 'hero')
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Alternative Translational Models
              </h1>
              <p className="text-xl mb-8">
                Advancing research through innovative approaches in nano health and optical imaging
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Connect With Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            {heroImage && (
              <div className="flex-1 animate-fade-up">
                <img
                  src={heroImage.image_url}
                  alt="Hero"
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Research Focus</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Research Community</h2>
          <p className="text-gray-600 mb-8">
            Collaborate with us in advancing translational research and nano health innovations
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Get In Touch
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
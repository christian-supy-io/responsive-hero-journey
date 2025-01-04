import { ArrowRight, Monitor, Lock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: "Modern Design",
    description: "Clean and intuitive interfaces that engage users",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Secure",
    description: "Enterprise-grade security for peace of mind",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Optimized performance for the best experience",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Something Amazing
            </h1>
            <p className="text-xl mb-8">
              Create stunning websites with our modern platform
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied customers building amazing websites
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
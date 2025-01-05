import { AboutSection } from "@/components/admin/AboutSection";
import { BlogSection } from "@/components/admin/BlogSection";
import { TeamSection } from "@/components/admin/TeamSection";

const Admin = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Admin Panel</h1>
        <AboutSection />
        <BlogSection />
        <TeamSection />
      </div>
    </div>
  );
};

export default Admin;
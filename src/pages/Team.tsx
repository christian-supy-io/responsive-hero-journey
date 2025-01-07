import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url?: string;
}

const Team = () => {
  const { data: teamMembers = [], isLoading, error } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as TeamMember[];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
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
          <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
          <div className="text-center text-red-500">
            Error loading team members. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition-shadow"
            >
              {member.image_url ? (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4" />
              )}
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No team members found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
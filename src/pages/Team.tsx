import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
}

const Team = () => {
  const { data: teamMembers = [] } = useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, name: "John Doe", position: "CEO", imageUrl: "/placeholder.svg" },
        { id: 2, name: "Jane Smith", position: "CTO", imageUrl: "/placeholder.svg" },
        { id: 3, name: "Mike Johnson", position: "Lead Developer", imageUrl: "/placeholder.svg" },
      ];
    },
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-xl text-gray-600">Meet the amazing people behind ModernTech</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={member.imageUrl} alt={member.name} />
                <AvatarFallback>
                  <Users className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
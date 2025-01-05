import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Edit2, Trash2, Save, X } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
}

export const TeamSection = () => {
  const { toast } = useToast();
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");

  const { data: teamMembers = [], refetch } = useQuery({
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

  const handleAddMember = () => {
    if (!newName || !newPosition) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Team member added successfully",
    });
    setNewName("");
    setNewPosition("");
    refetch();
  };

  const startEditing = (member: TeamMember) => {
    setEditingMember(member.id);
    setEditName(member.name);
    setEditPosition(member.position);
  };

  const cancelEditing = () => {
    setEditingMember(null);
    setEditName("");
    setEditPosition("");
  };

  const handleSaveEdit = (memberId: number) => {
    if (!editName || !editPosition) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Team member updated successfully",
    });
    setEditingMember(null);
    refetch();
  };

  const handleDelete = (memberId: number) => {
    toast({
      title: "Success",
      description: "Team member deleted successfully",
    });
    refetch();
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
      
      <div className="space-y-6 mb-8">
        <h3 className="text-lg font-medium">Add New Team Member</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Name"
          />
          <Input
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            placeholder="Position"
          />
        </div>
        <Button onClick={handleAddMember}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="p-6 border rounded-lg">
            {editingMember === member.id ? (
              <div className="space-y-4">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Edit name"
                />
                <Input
                  value={editPosition}
                  onChange={(e) => setEditPosition(e.target.value)}
                  placeholder="Edit position"
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveEdit(member.id)}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={cancelEditing}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => startEditing(member)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(member.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
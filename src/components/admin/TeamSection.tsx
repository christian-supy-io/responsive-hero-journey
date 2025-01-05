import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Edit2, Trash2, Save, X, ImagePlus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const [newImage, setNewImage] = useState<File | null>(null);
  const [editingMember, setEditingMember] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

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

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setEditImage(e.target.files[0]);
    }
  };

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
    setNewImage(null);
    refetch();
  };

  const startEditing = (member: TeamMember) => {
    setEditingMember(member.id);
    setEditName(member.name);
    setEditPosition(member.position);
    setEditImage(null);
  };

  const cancelEditing = () => {
    setEditingMember(null);
    setEditName("");
    setEditPosition("");
    setEditImage(null);
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
        <div className="grid gap-4">
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
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleNewImageChange}
                className="flex-1"
              />
              {newImage && (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={URL.createObjectURL(newImage)} alt="Preview" />
                  <AvatarFallback>
                    <ImagePlus className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
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
                <div>
                  <label className="block text-sm font-medium mb-2">Update Profile Image</label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleEditImageChange}
                      className="flex-1"
                    />
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        src={editImage ? URL.createObjectURL(editImage) : member.imageUrl}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        <ImagePlus className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
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
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={member.imageUrl} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
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
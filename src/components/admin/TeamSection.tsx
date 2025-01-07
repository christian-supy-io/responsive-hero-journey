import { useState } from "react";
import { TeamForm } from "./team/TeamForm";
import { TeamList } from "./team/TeamList";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url?: string;
  created_at: string;
}

export const TeamSection = () => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {editingMember ? "Edit Team Member" : "Add New Team Member"}
        </h2>
        <TeamForm
          initialData={editingMember || undefined}
          onSuccess={() => setEditingMember(null)}
        />
      </section>
      
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Team Members</h2>
        <TeamList onEdit={setEditingMember} />
      </section>
    </>
  );
};
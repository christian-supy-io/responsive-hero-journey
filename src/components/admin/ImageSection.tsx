import { useState } from "react";
import { ImageForm } from "./images/ImageForm";
import { ImageList } from "./images/ImageList";

interface Image {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  created_at: string;
}

export const ImageSection = () => {
  const [editingImage, setEditingImage] = useState<Image | null>(null);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          {editingImage ? "Edit Image" : "Add New Image"}
        </h2>
        <ImageForm
          initialData={editingImage || undefined}
          onSuccess={() => setEditingImage(null)}
        />
      </section>
      
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Image Gallery</h2>
        <ImageList onEdit={setEditingImage} />
      </section>
    </>
  );
};
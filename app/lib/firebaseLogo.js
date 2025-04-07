// app/lib/firebaseLogo.js
import { db } from "@/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const handleSaveLogo = async (userId, newLogoData) => {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    logos: arrayUnion({
      id: Date.now().toString(),
      title: newLogoData.title,
      description: newLogoData.description,
      imageUrl: newLogoData.imageUrl,
      createdAt: new Date(),
    }),
  });
};

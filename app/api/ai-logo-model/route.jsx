import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);

    const responseText = await AiPromptResult.response.text();  // Important fix
    const parsedResponse = JSON.parse(responseText);
    const AiPrompt = parsedResponse.prompt;

    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      AiPrompt,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    // Saving to Firestore
    try {
      await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
        image: base64ImageWithMime,
        title: title,
        desc: desc,
        createdAt: new Date(),
      });
    } catch (firestoreError) {
      console.error("Error saving to Firestore:", firestoreError);
    }

    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    console.error("Error in /api/ai-logo-model:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

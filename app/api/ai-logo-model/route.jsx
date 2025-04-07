import { AILogoPrompt } from "@/configs/AiModel";
import { db } from "@/configs/FirebaseConfig";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt, email, title, desc } = await req.json();

  try {
    // Generate AI Prompt
    const AiPromptResult = await AILogoPrompt.sendMessage(prompt);
    const responseText = await AiPromptResult.response.text();
    const parsedResponse = JSON.parse(responseText);
    const AiPrompt = parsedResponse.prompt;

    // Call HuggingFace API with 40 seconds timeout
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
      AiPrompt,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
        timeout: 40000, // 40 seconds timeout bro
      }
    );

    // Convert Buffer to Base64 Image
    const buffer = Buffer.from(response.data, "binary");
    const base64Image = buffer.toString("base64");
    const base64ImageWithMime = `data:image/png;base64,${base64Image}`;

    // Save Logo Data To Firestore
    await setDoc(doc(db, "users", email, "logos", Date.now().toString()), {
      image: base64ImageWithMime,
      title: title,
      desc: desc,
      createdAt: new Date(),
    });

    // Send Response to Frontend
    return NextResponse.json({ image: base64ImageWithMime });
  } catch (error) {
    console.error("Error in /api/ai-logo-model:", error);

    // Timeout Error Handle
    if (error.code === 'ECONNABORTED') {
      return NextResponse.json(
        { error: "Request Timeout. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

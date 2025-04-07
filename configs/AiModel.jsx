const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const AIDesignIdea = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "'Based on Logo of type Modern Mascot Logos Generate a text prompt to create Logo for Logo title/Brand name : indian spice with decription: indian restaurent and refering to prompt: A vibrant logo featuring a friendly, animated character with a playful expression. The character is dressed in a classic uniform, complete with a distinctive accessory that adds personality. In one hand, they hold a signature item that represents the brand, while the other elements of the design—such as small decorative touches or natural accents—enhance the overall look. The background consists of a bold, circular design with subtle accents to highlight the character. Below, the brand name is displayed in bold, stylized lettering, with a slight curve and complementary decorative lines. The overall style is fun, welcoming, and full of character. Give me 4/5 Suggestion of logo idea (each idea with maximum 4-5 words), Result in JSON format with ideas field"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"ideas\": [\n    \"Chef Elephant Holding Spices\",\n    \"Smiling Tiger Spice Grinder\",\n    \"Happy Cow Serving Curry\",\n    \"Dancing Peacock with Saffron\",\n    \"Friendly Elephant Chef Mascot\"\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  export const AILogoPrompt = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a text prompt to create Logo for Logo Title/Brand name : expense tracker ,with description: expense tracker site, with Color combination of Soft Purples, also include the Retro Coin Stack Illustration and include Vintage Custom Logos design idea and Referring to this Logo Prompt:Generate a vintage, hand-drawn logo in a circular format. The logo should feature a central illustration, such as a symbol, icon, or image related to the brands identity. The illustration should be detailed and stylized, with a focus on linework and shading. The logo should also include the brand name, written in a vintage, decorative font. The overall aesthetic should be retro and nostalgic, evoking a sense of tradition and quality.  Give me result in JSON portal with prompt field only"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"prompt\": \"Create a vintage, hand-drawn logo in a circular format for an 'expense tracker' site. The illustration should be a detailed and stylized retro coin stack, with linework and shading. The brand name 'expense tracker' should be incorporated using a vintage, decorative font. The overall aesthetic should be retro and nostalgic, evoking a sense of tradition and quality. Use a color combination of Soft Purples. This design should embody Vintage Custom Logos ideals.\"\n}\n```\n"},
        ],
      },
    ],
  });

  // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // console.log(result.response.text());



import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from ".";
const apiKey = config.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const reportModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
Generate a well-structured MDX document about the given topic with the following sections:
1. Title (H1)
2. Key Sections (H2)
3. Bullet Points
4. Bold Text for key terms
5. Discuss different aspects of the topic
Format everything in Markdown. Use - for bullets.
Also use the same for indentation in bullets.
Never use * for bullets.
Please don't use the section titles given here, use your own
Make sure that the content is relevant  to the topic and as detailed as possible and is plagiary free
`,
});

export { reportModel };

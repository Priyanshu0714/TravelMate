import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    "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",
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function recommendation_ai(departure, destination) {
  const prompt = `Provide a list of nearby locations in an array between "${departure}" and "${destination}" for travelers. The output should ONLY be a JSON-formatted array of place names without any extra text, explanation, or punctuation. For example: ["Place1", "Place2", "Place3"]`;

  const completion = await openai.chat.completions.create({
    model: "meta/llama3-70b-instruct",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
    top_p: 1,
    max_tokens: 1024,
    stream: true,
  });

  let responseText = "";
  for await (const chunk of completion) {
    responseText += chunk.choices[0]?.delta?.content || "";
  }

  // Extracting the JSON array from the response
  const arrayStart = responseText.indexOf("[");
  const arrayEnd = responseText.indexOf("]") + 1;
  const locationsArray = JSON.parse(responseText.slice(arrayStart, arrayEnd));

  return locationsArray;
}

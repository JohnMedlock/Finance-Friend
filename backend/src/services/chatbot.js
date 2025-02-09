// chat.js
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function chat(
  bankStatementText,
  personality = 'snoop dog',
) {
  const systemContent = `
  You are a helpful financial assistant with the personality of snoop dog.
  You must refer to the user in second person.
  The user will provide the text from a monthly bank statement (OCR extracted).

  Your task is to:
    1) Provide lots of commentary about the statement overall.
    2) Parse the statement to derive account balance over time and spending categories.

  You must return a single JSON object with the following structure:

  {
    "commentary": "string commentary",
    "parsedData": {
      "accountBalanceOverTime": [
        { "date": "YYYY-MM-DD", "balance": 123.45 },
        ...
      ],
      "spendingCategories": [
        { "category": "string", "amount": 123.45 },
        ...
      ]
    }
  }

  **IMPORTANT**:
  - Do NOT wrap the JSON in backticks or markdown.
  - Return ONLY valid JSON, nothing else.
  - Do not prepend or append any extra text or lines.
`;

  const userContent = `
    Below is the extracted text from a PDF monthly bank statement:

    ${bankStatementText}

    Please generate the JSON as specified above.
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o', // or whichever model you use
    messages: [
      { role: 'system', content: systemContent },
      { role: 'user', content: userContent },
    ],
    store: true,
  });
  return completion.choices[0].message.content;
}

import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';


const anthropic = new Anthropic({
    apiKey: "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", // defaults to process.env["ANTHROPIC_API_KEY"]
  });

export async function POST(request) {
  const { messages } = await request.json();
  const options = {
    resumeDetails: {
      // Provide the resume details object here
    },
    language: "English",
    writingStyle: "Professional",
    tone: "Confident",
    atsKeywords: ["Project Management", "Leadership", "Technical Skills"],
  };

  const resumeDetailsString = JSON.stringify(options.resumeDetails, null, 2);
  const atsKeywordsString = options.atsKeywords.join(", ");

  const prompt = `You are an expert resume writer tasked with crafting a compelling professional summary for a client's resume. Here are the key details from the client's resume to consider when generating the summary:

<resume_details>
${resumeDetailsString}
</resume_details>

Please generate the resume summary in ${options.language} and use a ${options.writingStyle} writing style. The summary should have a ${options.tone} tone and incorporate the following ATS keywords if relevant to the client's background:
${atsKeywordsString}

The summary should be between 40 to 50 words in length. Keep it concise yet impactful. Do not begin the summary with a quotation. Avoid cliches or overly generic statements.

Before generating the summary, carefully review the provided resume details. Consider the client's unique value proposition, key strengths, and most relevant experiences and accomplishments.

Inside <scratchpad> tags, write out your thought process and approach for crafting this particular client's resume summary based on the details provided. 

<scratchpad>
Your thought process here
</scratchpad>

Finally, output the generated resume summary inside <resume_summary> tags. Remember, the summary should compellingly capture the client's professional brand and entice employers to read further.

<resume_summary>
The generated 40-50 word resume summary here
</resume_summary>`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    return NextResponse.json(msg);
  } catch (error) {
    console.error("Error connecting to Anthropic API:", error);
    return NextResponse.json({ error: "Connection error." }, { status: 500 });
  }
}

// src/ai/ai-resume-rewrite.ts
'use server';

/**
 * @fileOverview Provides AI-powered resume rewriting, paraphrasing, and summarization.
 *
 * - aiResumeRewrite - Function to rewrite, paraphrase, or summarize a section of a resume using AI.
 * - AiResumeRewriteInput - Input type for the aiResumeRewrite function, including the text to modify and the desired action.
 * - AiResumeRewriteOutput - Output type for the aiResumeRewrite function, containing the modified text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiResumeRewriteInputSchema = z.object({
  text: z.string().describe('The text from a resume section to be rewritten.'),
  action: z
    .enum(['rewrite', 'paraphrase', 'summarize'])
    .describe('The desired action: rewrite, paraphrase, or summarize.'),
});
export type AiResumeRewriteInput = z.infer<typeof AiResumeRewriteInputSchema>;

const AiResumeRewriteOutputSchema = z.object({
  modifiedText: z.string().describe('The rewritten, paraphrased, or summarized text.'),
});
export type AiResumeRewriteOutput = z.infer<typeof AiResumeRewriteOutputSchema>;

export async function aiResumeRewrite(input: AiResumeRewriteInput): Promise<AiResumeRewriteOutput> {
  return aiResumeRewriteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResumeRewritePrompt',
  input: {schema: AiResumeRewriteInputSchema},
  output: {schema: AiResumeRewriteOutputSchema},
  prompt: `You are a resume expert. A user wants to {{action}} the following resume text: {{{text}}}. Provide the modified text. Be concise and professional.`,
});

const aiResumeRewriteFlow = ai.defineFlow(
  {
    name: 'aiResumeRewriteFlow',
    inputSchema: AiResumeRewriteInputSchema,
    outputSchema: AiResumeRewriteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {modifiedText: output!.modifiedText};
  }
);

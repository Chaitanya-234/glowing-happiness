'use server';

import { generateStructuredContent } from '../../actions/gemini-structured';

export type CareerPathInput = {
  jobDescription: string;
  currentSkills: string[];
  experienceLevel: string;
  learningStyle: string;
  timeAvailability: string;
  githubData?: string;
};

export async function generateCareerPath(input: CareerPathInput) {
  const prompt = `
    You are an expert Career Coach and Technical Mentor. Your goal is to create a personalized learning roadmap for a developer based on a target job description and their current skills.

    **Target Job Description:**
    ${input.jobDescription}

    **User Profile:**
    - Current Skills: ${input.currentSkills.join(', ')}
    - Experience Level: ${input.experienceLevel}
    - Learning Style: ${input.learningStyle}
    - Time Availability: ${input.timeAvailability}
    ${input.githubData ? `- GitHub Profile Analysis: ${input.githubData}` : ''}

    **Instructions:**

    1. **Job Analysis**: Extract required skills, experience level, and domain knowledge from the job description. Identify must-have vs nice-to-have skills.
    2. **Gap Analysis**: Compare the user's current skills against the job requirements. Identify gaps, weaknesses, and strengths.
    3. **Learning Roadmap**: Create a week-by-week learning plan (12-16 weeks) to bridge the gaps.
       - Phases: Foundation, Application, Advanced, Integration.
       - Each week: Theme, Objectives, Resources (Free/Paid), Practice.
    4. **Portfolio Projects**: Suggest 3-5 impressive projects that demonstrate the required skills and help get hired.

    **Quality Standards:**
    - Be realistic with time estimates.
    - Suggest high-quality, up-to-date resources (documentation, freeCodeCamp, etc.).
    - Projects should be portfolio-worthy.

    Generate the output strictly according to the schema.
  `;

  return generateStructuredContent(prompt, 'career_path');
}

//Users/mohsinal/airesume-5/components/ai/ResumeAi.js

import { sendOpenAi } from '../../libs/gpt';

const writingStyle = 'Optimistic';

const getLanguageInstruction = (language) => {
  switch(language.toLowerCase()) {
    case 'spanish':
      return 'Responde únicamente en español. No uses ningún otro idioma.';
    case 'english':
      return 'Respond only in English. Do not use any other language.';
    case 'arabic':
      return 'الرجاء الرد باللغة العربية فقط. لا تستخدم أي لغة أخرى.';
    default:
      return `Respond only in ${language}. Do not use any other language.`;
  }
};

const extractAtsKeywords = async (jobDescription, language) => {
  const languageInstruction = getLanguageInstruction(language);
  const messages = [
    { role: "system", content: `You are a professional resume writer. ${languageInstruction}` },
    {
      role: "user",
      content: `Extract the top 20 ATS keywords from the following job description. Immediately start listing the keywords separated by commas for the Job Description. ${languageInstruction}
      Job Description: ${jobDescription}`
    },
  ];

  let atsKeywordsContent = '';
  try {
    await sendOpenAi(messages, "your_user_id", (content) => {
      atsKeywordsContent += content;
    });

    return atsKeywordsContent.split('\n').map(keyword => keyword.replace(/^\d+\.\s*/, '')).join(', ');
  } catch (error) {
    console.error("Error extracting ATS keywords:", error);
    return '';
  }
};

const generateContent = async (messages, callback) => {
  let content = '';
  await sendOpenAi(messages, "your_user_id", (responseContent) => {
    content += responseContent;
    callback(content);
  });
};

const cleanBulletPoints = (bulletPointsContent) => {
  return bulletPointsContent
    .split('\n')
    .filter(point => point.trim() !== '')
    .map(point => point.replace(/^\d+[.)\s]*|^[*]*\s*/, '').trim());
};

const generateHobbies = async (setResume, tone, setGeneratingSection, language) => {
  setGeneratingSection('Hobbies');
  const languageInstruction = getLanguageInstruction(language);
  const hobbiesMessages = [
    { role: "system", content: `You are a professional resume writer. ${languageInstruction}` },
    {
      role: "user",
      content: `Generate 5 hobbies that might be of interest. Each hobby should be concise and no more than three words (max of 25 characters), proceed each item with a star symbol, no dash or other symbols. Provide the hobbies in the style of ${writingStyle}. Tone: ${tone}. ${languageInstruction}`
    },
  ];

  await generateContent(hobbiesMessages, (hobbiesContent) => {
    const hobbiesArray = cleanBulletPoints(hobbiesContent);
    setResume((prevResume) => ({
      ...prevResume,
      hobbies: hobbiesArray,
    }));
  });

  setGeneratingSection(null);
};

const generateSoftware = async (setResume, jobDescription, setGeneratingSection, language) => {
  setGeneratingSection('Software');
  const softwareMessages = [
    { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
    {
      role: "user",
      content: `Generate 5 software related to the following job description. Each software should be concise and no more than three words (max of 25 characters). If the job description is not provided, generate software that is generally useful for a professional resume, add dashes instead of numbering the software list. Provide the software list only in ${language} for:
      Job Description: ${jobDescription}`
    },
  ];

  await generateContent(softwareMessages, (softwareContent) => {
    const softwareArray = cleanBulletPoints(softwareContent);
    setResume((prevResume) => ({
      ...prevResume,
      software: softwareArray,
    }));
  });

  setGeneratingSection(null);
};

const generateLanguages = async (setResume, setGeneratingSection, jobDescription, language) => {
  setGeneratingSection('Languages');
  const languagesMessages = [
    { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
    {
      role: "user",
      content: `Generate 3 languages that are valuable in a professional setting. Each language should be concise and no more than two words (max of 15 characters).
      Languages should be suitable for a professional resume based on Job Description: ${jobDescription}. Add numbering instead of dashes for the languages list. Provide the languages only in ${language} and in the style of ${writingStyle}`
    },
  ];

  await generateContent(languagesMessages, (languagesContent) => {
    const languagesArray = cleanBulletPoints(languagesContent);
    setResume((prevResume) => ({
      ...prevResume,
      languages: languagesArray,
    }));
  });

  setGeneratingSection(null);
};

const generateCertificates = async (setResume, jobDescription, setGeneratingSection, language) => {
  setGeneratingSection('Certificates');
  const certificatesMessages = [
    { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
    {
      role: "user",
      content: `Generate 3 certificates that are relevant to the following job description. Each certificate should be concise and (max of 35 characters). If the job description is not provided, generate certificates that are generally valuable for a professional resume. Provide the certificates only in ${language} and in the style of ${writingStyle}:
      Job Description: ${jobDescription}`
    },
  ];

  await generateContent(certificatesMessages, (certificatesContent) => {
    const certificatesArray = cleanBulletPoints(certificatesContent);
    setResume((prevResume) => ({
      ...prevResume,
      certificates: certificatesArray.map(cert => ({ name: cert, year: new Date().getFullYear() })),
    }));
  });

  setGeneratingSection(null);
};

const generateExtraSections = async (setResume, setGeneratingSection, language) => {
  setGeneratingSection('Extra Sections');
  const extraSectionMessages = [
    { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
    {
      role: "user",
      content: `Generate 3 unique and creative extra sections that will make my resume stand out. Each section should be concise and no more than three words (max of 15 characters). Provide the sections only in ${language} and in the style of ${writingStyle}.`
    },
  ];

  await generateContent(extraSectionMessages, (extraSectionContent) => {
    const extraSectionArray = cleanBulletPoints(extraSectionContent);
    setResume((prevResume) => ({
      ...prevResume,
      extraSection: extraSectionArray,
    }));
  });

  setGeneratingSection(null);
};

const generateExtraDetailedSections = async (setResume, setGeneratingSection, language) => {
  setGeneratingSection('Extra Detailed Sections');
  const extraDetailedSectionMessages = [
    { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
    {
      role: "user",
      content: `Generate 3 unique and creative extra detailed sections that will make my resume stand out. Each section should be concise and (max of 45 characters). Each section should include a title and 3 detailed bullet points. Provide the sections only in ${language} and in the style of ${writingStyle}.`
    },
  ];

  await generateContent(extraDetailedSectionMessages, (extraDetailedSectionContent) => {
    const sections = extraDetailedSectionContent.split('\n\n').map(section => {
      const [title, ...details] = section.split('\n').filter(line => line.trim() !== '');
      return { title, details: cleanBulletPoints(details.join('\n')) };
    });

    setResume((prevResume) => ({
      ...prevResume,
      extraDetailedSection: sections,
    }));
  });

  setGeneratingSection(null);
};

export const generateSummaryAndBulletPoints = async (resume, setResume, keywords, jobDescription, tone, specificInstructions, setGeneratingSection, atskeywords, setAtsKeywords, language, sectionsVisibility) => {
  const userId = "your_user_id";
  const languageInstruction = getLanguageInstruction(language);

  try {
    console.log("Starting generateSummaryAndBulletPoints in language:", language);

    let generatedAtsKeywords = atskeywords;
    if (!generatedAtsKeywords) {
      setGeneratingSection('Extracting ATS Keywords');
      console.log("Extracting ATS keywords in", language);
      generatedAtsKeywords = await extractAtsKeywords(jobDescription, language);
      setAtsKeywords(generatedAtsKeywords);
      
      setResume((prevResume) => ({
        ...prevResume,
        aiGeneration: {
          ...prevResume.aiGeneration,
          atsKeywords: generatedAtsKeywords,
        },
      }));
      
      console.log("ATS Keywords generated and saved in", language, ":", generatedAtsKeywords);
    }

    setGeneratingSection('Summary');
    console.log("Generating summary in", language);
    const summaryMessages = [
      { role: "system", content: `You are a professional resume writer. ${languageInstruction}` },
      {
        role: "user",
        content: `Generate a professional summary for my resume with the following details. Keep it concise, professional, and between 40 and 60 words, start writing the summary immediately (no need to write things like: here's the summary or similar). Provide the summary in the style of ${writingStyle}. ${languageInstruction}
      
        ATS Keywords: ${generatedAtsKeywords},
        Tone: ${tone}`
      },
    ];

    let summaryContent = '';
    await sendOpenAi(summaryMessages, userId, (content) => {
      summaryContent += content;
      setResume((prevResume) => ({
        ...prevResume,
        summary: summaryContent,
      }));
    });

    console.log("Summary generated in", language);
    setGeneratingSection(null);

    // Create a set to store used action verbs
    const usedActionVerbs = new Set();

    console.log("Generating experience bullet points in", language);
    for (let i = 0; i < resume.experiences.length; i++) {
      const experience = resume.experiences[i];
      setGeneratingSection(`Experience-${i}`);
      
      // Specific instructions for Spanish
      const spanishInstructions = language.toLowerCase() === 'spanish' 
        ? "Es crucial que generes estos puntos ÚNICAMENTE en español. No incluyas ninguna traducción al inglés ni uses palabras en inglés."
        : "";

      const expMessages = [
        { 
          role: "system", 
          content: `You are a professional resume writer. ${languageInstruction} ${spanishInstructions}`
        },
        {
          role: "user",
          content: `Generate 5 detailed bullet points for my experience with the following details: Each bullet point should be professional and thoughtful. ${languageInstruction} ${spanishInstructions}
          
          Position: ${experience.position}
          Keywords: ${keywords}
          ATS Keywords: ${generatedAtsKeywords}
          Job Description: ${jobDescription}
          Tone: ${tone}
          Specific Instructions: ${specificInstructions}
          Used Action Verbs: ${Array.from(usedActionVerbs).join(', ')}

          Each bullet point should:
          - Always start with an action verb that has not been used in previous experiences
          - Be of normal resume bullet point length
          - Include metrics related to the job description or position
          - Avoid exaggerating achievements
          - Use clear and concise language
          - Begin each bullet point with U+2022.

          Remember, the entire response must be in ${language}. Do not include any text in other languages.`
        },
      ];

      let bulletPointsContent = '';
      await sendOpenAi(expMessages, userId, (content) => {
        bulletPointsContent += content;
        // Additional check for Spanish content
        if (language.toLowerCase() === 'spanish' && !/^[áéíóúüñÁÉÍÓÚÜÑa-zA-Z\s.,;:()•-]+$/.test(content)) {
          console.error("Generated content contains non-Spanish characters:", content);
          return;
        }
        const cleanBulletPointsContent = cleanBulletPoints(bulletPointsContent);
        
        // Extract and store new action verbs
        cleanBulletPointsContent.forEach(bulletPoint => {
          const actionVerb = bulletPoint.split(' ')[0].toLowerCase();
          usedActionVerbs.add(actionVerb);
        });
        
        setResume((prevResume) => {
          const newExperiences = [...prevResume.experiences];
          newExperiences[i].responsibilities = cleanBulletPointsContent;
          return { ...prevResume, experiences: newExperiences };
        });
      });

      setGeneratingSection(null);
    }
    console.log("Experience bullet points generated in", language);

    setGeneratingSection('Skills');
    console.log("Generating skills in", language);
    const skillsMessages = [
      { role: "system", content: `You are a professional resume writer. Always respond in ${language} only.` },
      {
        role: "user",
        content: `Generate 10 professional skills related to the following job description. Each skill should be concise and no more than three words (max of 25 characters) and starts with dash (-), no other symbols should be written. Provide the skills only in ${language} and in the style of ${writingStyle}:
        Job Description: ${jobDescription}`
      },
    ];

    await generateContent(skillsMessages, (skillsContent) => {
      const skillsArray = cleanBulletPoints(skillsContent);
      setResume((prevResume) => ({
        ...prevResume,
        skills: skillsArray,
      }));
    });

    setGeneratingSection(null);
    console.log("Skills generated in", language);

    // Generate additional sections if visible
    if (resume.sectionsVisibility.hobbies) {
      setGeneratingSection('Hobbies');
      await generateHobbies(setResume, tone, setGeneratingSection, language);
    }
    if (resume.sectionsVisibility.software) {
      await generateSoftware(setResume, jobDescription, setGeneratingSection, language);
    }
    if (resume.sectionsVisibility.languages) {
      await generateLanguages(setResume, setGeneratingSection, jobDescription, language);
    }
    if (resume.sectionsVisibility.certificates) {
      await generateCertificates(setResume, jobDescription, setGeneratingSection, language);
    }
    if (resume.sectionsVisibility.extraSection) {
      await generateExtraSections(setResume, setGeneratingSection, language);
    }
if (resume.sectionsVisibility.extraDetailedSection) {
      await generateExtraDetailedSections(setResume, setGeneratingSection, language);
    }

    console.log("All sections generated in language:", language);

    // Final update to ensure ATS keywords are saved
    setResume((prevResume) => ({
      ...prevResume,
      aiGeneration: {
        ...prevResume.aiGeneration,
        atsKeywords: generatedAtsKeywords,
        lastGeneratedAt: new Date().toISOString(),
      },
    }));

    console.log("generateSummaryAndBulletPoints completed in", language);
  } catch (error) {
    console.error("Error generating resume content:", error);
  }
};

export default generateSummaryAndBulletPoints;
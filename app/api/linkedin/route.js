import axios from 'axios';
import connectMongo from "@/libs/mongoose";
import Resume from "@/models/Resume";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";

export const POST = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not signed in" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await connectMongo();

  const { linkedinProfileUrl, resumeId } = await req.json();
  const apiKey = 'mWwqDkkKgrY9tWsG9RkzOw'; // Hard-coded API key

  if (!linkedinProfileUrl) {
    return new Response(JSON.stringify({ error: "LinkedIn Profile URL is required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.get('https://nubela.co/proxycurl/api/v2/linkedin', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      params: {
        linkedin_profile_url: linkedinProfileUrl,
        extra: 'include',
      },
    });

    const data = response.data;

    // Helper function to safely get nested properties
    const safeGet = (obj, path, defaultValue = '') => {
      return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : defaultValue, obj);
    };

    // Helper function to format date
    const formatDate = (dateObj) => {
      if (!dateObj) return '';
      const year = dateObj.year || '';
      const month = (dateObj.month || 1).toString().padStart(2, '0');
      const day = (dateObj.day || 1).toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const resumeData = {
      fullName: safeGet(data, 'full_name'),
      professionalTitle: safeGet(data, 'occupation'),
      location: `${safeGet(data, 'city')}, ${safeGet(data, 'state')}, ${safeGet(data, 'country')}`,
      summary: safeGet(data, 'summary'),
      experiences: (data.experiences || []).map(exp => ({
        position: safeGet(exp, 'title'),
        company: safeGet(exp, 'company'),
        location: safeGet(exp, 'location'),
        duration: `${formatDate(exp.starts_at)} to ${exp.ends_at ? formatDate(exp.ends_at) : 'Present'}`,
        responsibilities: [
          "bullet points will be generated",
          "bullet points will be generated",
          "bullet points will be generated"
        ],
        starts_at: exp.starts_at,
        ends_at: exp.ends_at,
        company_linkedin_profile_url: safeGet(exp, 'company_linkedin_profile_url'),
        logo_url: safeGet(exp, 'logo_url'),
      })),
      education: (data.education || []).map(edu => ({
        institution: safeGet(edu, 'school'),
        year: `${safeGet(edu, 'starts_at.year')}-${safeGet(edu, 'ends_at.year')}`,
        degree: safeGet(edu, 'degree_name'),
        field_of_study: safeGet(edu, 'field_of_study'),
        school_linkedin_profile_url: safeGet(edu, 'school_linkedin_profile_url'),
        logo_url: safeGet(edu, 'logo_url'),
      })),
    };

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, user: session.user.id },
      { $set: resumeData },
      { new: true, upsert: true }
    );

    return new Response(JSON.stringify({ data: updatedResume }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch LinkedIn profile", details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
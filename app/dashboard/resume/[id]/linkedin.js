import axios from 'axios';

export const fetchLinkedInProfile = async (linkedinProfileUrl) => {
  try {
    const response = await axios.post('/api/linkedin', { linkedinProfileUrl });
    return response.data;
  } catch (error) {
    console.error("Error fetching LinkedIn profile:", error);
    throw error;
  }
};

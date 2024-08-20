// lib/utils/resumeUtils.js
export const handleInputChange = (e, setResumeData) => {
  const { name, value } = e.target;
  setResumeData(prevData => ({ ...prevData, [name]: value }));
};

export const handleExperienceChange = (index, field, value, setResumeData, resumeData) => {
  const newExperiences = [...resumeData.experiences];
  newExperiences[index][field] = value;
  setResumeData(prevData => ({ ...prevData, experiences: newExperiences }));
};

export const handleResponsibilityChange = (index, resIndex, value, setResumeData, resumeData) => {
  const newExperiences = [...resumeData.experiences];
  newExperiences[index].responsibilities[resIndex] = value;
  setResumeData(prevData => ({ ...prevData, experiences: newExperiences }));
};

// Add the definition for removeResponsibility
export const removeResponsibility = (index, resIndex, setResumeData, resumeData) => {
  const newExperiences = [...resumeData.experiences];
  newExperiences[index].responsibilities.splice(resIndex, 1);
  setResumeData(prevData => ({ ...prevData, experiences: newExperiences }));
};

export const handleEducationChange = (index, field, value, setResumeData, resumeData) => {
  const newEducation = [...resumeData.education];
  newEducation[index][field] = value;
  setResumeData(prevData => ({ ...prevData, education: newEducation }));
};

export const handleSkillChange = (index, value, setResumeData, resumeData) => {
  const newSkills = [...resumeData.skills];
  newSkills[index] = value;
  setResumeData(prevData => ({ ...prevData, skills: newSkills }));
};

export const handleHobbyChange = (index, value, setResumeData, resumeData) => {
  const newHobbies = [...resumeData.hobbies];
  newHobbies[index] = value;
  setResumeData(prevData => ({ ...prevData, hobbies: newHobbies }));
};

export const handleSoftwareChange = (index, value, setResumeData, resumeData) => {
  const newSoftware = [...resumeData.software];
  newSoftware[index] = value;
  setResumeData(prevData => ({ ...prevData, software: newSoftware }));
};

export const handleLanguageChange = (index, value, setResumeData, resumeData) => {
  const newLanguages = [...resumeData.languages];
  newLanguages[index] = value;
  setResumeData(prevData => ({ ...prevData, languages: newLanguages }));
};

export const handleCertificateChange = (index, field, value, setResumeData, resumeData) => {
  const newCertificates = [...resumeData.certificates];
  newCertificates[index][field] = value;
  setResumeData(prevData => ({ ...prevData, certificates: newCertificates }));
};

export const handleExtraSectionChange = (index, value, setResumeData, resumeData) => {
  const newExtraSection = [...resumeData.extraSection];
  newExtraSection[index] = value;
  setResumeData(prevData => ({ ...prevData, extraSection: newExtraSection }));
};

export const handleExtraDetailedSectionChange = (index, field, value, setResumeData, resumeData) => {
  const newExtraDetailedSection = [...resumeData.extraDetailedSection];
  newExtraDetailedSection[index][field] = value;
  setResumeData(prevData => ({ ...prevData, extraDetailedSection: newExtraDetailedSection }));
};

export const handleExtraDetailedSectionDetailChange = (index, detailIndex, value, setResumeData, resumeData) => {
  const newExtraDetailedSection = [...resumeData.extraDetailedSection];
  newExtraDetailedSection[index].details[detailIndex] = value;
  setResumeData(prevData => ({ ...prevData, extraDetailedSection: newExtraDetailedSection }));
};

// Add the definition for addExtraDetailedSectionDetail
export const addExtraDetailedSectionDetail = (index, setResumeData, resumeData) => {
  const newExtraDetailedSection = [...resumeData.extraDetailedSection];
  newExtraDetailedSection[index].details.push("");
  setResumeData(prevData => ({ ...prevData, extraDetailedSection: newExtraDetailedSection }));
};

export const addResponsibility = (index, setResumeData, resumeData) => {
  const newExperiences = [...resumeData.experiences];
  newExperiences[index].responsibilities.push("");
  setResumeData(prevData => ({ ...prevData, experiences: newExperiences }));
};

export const removeExperience = (index, setResumeData, resumeData) => {
  if (window.confirm("Are you sure you want to delete this experience?")) {
      const newExperiences = [...resumeData.experiences];
      newExperiences.splice(index, 1);
      setResumeData(prevData => ({ ...prevData, experiences: newExperiences }));
  }
};

export const removeEducation = (index, setResumeData, resumeData) => {
  const newEducation = [...resumeData.education];
  newEducation.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, education: newEducation }));
};

export const removeSkill = (index, setResumeData, resumeData) => {
  const newSkills = [...resumeData.skills];
  newSkills.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, skills: newSkills }));
};

export const removeHobby = (index, setResumeData, resumeData) => {
  const newHobbies = [...resumeData.hobbies];
  newHobbies.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, hobbies: newHobbies }));
};

export const removeSoftware = (index, setResumeData, resumeData) => {
  const newSoftware = [...resumeData.software];
  newSoftware.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, software: newSoftware }));
};

export const removeLanguage = (index, setResumeData, resumeData) => {
  const newLanguages = [...resumeData.languages];
  newLanguages.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, languages: newLanguages }));
};

export const removeCertificate = (index, setResumeData, resumeData) => {
  const newCertificates = [...resumeData.certificates];
  newCertificates.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, certificates: newCertificates }));
};

export const removeExtraSection = (index, setResumeData, resumeData) => {
  const newExtraSection = [...resumeData.extraSection];
  newExtraSection.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, extraSection: newExtraSection }));
};

export const removeExtraDetailedSection = (index, setResumeData, resumeData) => {
  const newExtraDetailedSection = [...resumeData.extraDetailedSection];
  newExtraDetailedSection.splice(index, 1);
  setResumeData(prevData => ({ ...prevData, extraDetailedSection: newExtraDetailedSection }));
};

export const removeExtraDetailedSectionDetail = (expIndex, resIndex, setResumeData, resumeData) => {
  const newExtraDetailedSection = [...resumeData.extraDetailedSection];
  newExtraDetailedSection[expIndex].details.splice(resIndex, 1);
  setResumeData(prevData => ({ ...prevData, extraDetailedSection: newExtraDetailedSection }));
};

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faExchangeAlt, faRobot, faTimes, faSpinner, faChevronDown, faChevronUp, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import ThemeButton from "@/components/ThemeButton";
import { generateSummaryAndBulletPoints } from '../../components/ai/ResumeAi';
import ResumeSideNavContent from './ResumeSideNavContent';
import { useLanguage } from '../../contexts/LanguageContext';
import { resumeTranslations } from '../../locales/resumeTranslations';
import Notification from './Notification';

const SideNavWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  background-color: #fff;
  margin-right: 20px;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 60px;
    padding-bottom: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgba(98, 0, 238, 0.8);
    padding: 0px 0;
    margin: 5px 7px 10px 7px;
    z-index: 1000;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
  width: 100%;
  background-color: transparent;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    color: white;
    font-size: 0.8rem;

    svg {
      width: 24px;
      height: 24px;
      margin-right: 0;
      margin-bottom: 5px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const AIButton = styled(NavButton)`
  color: #6e8efb;
  font-weight: bold;

  @media (max-width: 768px) {
    color: white;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: flex-end;
  }
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 500px;
  height: 100%;
  padding: 2rem;
  overflow-y: auto;
  transform: translateX(${props => props.show ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    max-width: 100%;
    height: 50%;
    transform: translateY(${props => props.show ? '0' : '100%'});
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #333;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 1001;
`;

const PanelTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const AIConfigWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GenerateButton = styled.button`
  background-color: #6e8efb;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #5c7cfa;
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  resize: none;
  overflow-y: auto;
  min-height: 50px;
  max-height: 300px;
  transition: height 0.2s ease;

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    border-color: #6e8efb;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  background-color: white;

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    border-color: #6e8efb;
    outline: none;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  color: #333;
  font-size: 0.9rem;
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CollapsibleInputGroup = styled(InputGroup)`
  overflow: hidden;
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  transition: max-height 0.3s ease-in-out;
  opacity: ${props => props.isOpen ? '1' : '0'};
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #6e8efb;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-top: 1rem;

  svg {
    margin-left: 0.5rem;
  }
`;

const LinkedInDropdown = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-top: 0.5rem;
`;

const LinkedInInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const LinkedInExample = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 0.5rem;
  background-color: #0077b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #006097;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResumeSideNav = ({ resume, setResume, theme, setTheme }) => {
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;
  const [activeModal, setActiveModal] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);
  const [showSpecificInstructions, setShowSpecificInstructions] = useState(false);
  const [tone, setTone] = useState('');
  const [keywords, setKeywords] = useState('');
  const [positions, setPositions] = useState('');
  const [atskeywords, setAtsKeywords] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [specificInstructions, setSpecificInstructions] = useState('');
  const [generatingSection, setGeneratingSection] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showLinkedInDropdown, setShowLinkedInDropdown] = useState(false);
  const [linkedinProfileUrl, setLinkedinProfileUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActiveModal(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = (modal) => {
    setActiveModal(activeModal === modal ? null : modal);
  };

  const toggleSection = (section) => {
    setExpandedSections(expandedSections.includes(section)
      ? expandedSections.filter(s => s !== section)
      : [...expandedSections, section]
    );
  };

  const handleChange = (e) => {
    setResume((prevResume) => ({
      ...prevResume,
      [e.target.name]: e.target.value
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...resume.experiences];
    newExperiences[index][field] = value;
    setResume(prevResume => ({ ...prevResume, experiences: newExperiences }));
  };

  const handleResponsibilityChange = (expIndex, resIndex, value) => {
    const newExperiences = [...resume.experiences];
    newExperiences[expIndex].responsibilities[resIndex] = value;
    setResume(prevResume => ({ ...prevResume, experiences: newExperiences }));
  };

  const addResponsibility = (index) => {
    const newExperiences = [...resume.experiences];
    newExperiences[index].responsibilities.push('');
    setResume(prevResume => ({ ...prevResume, experiences: newExperiences }));
  };

  const addExperience = () => {
    setResume(prevResume => ({
      ...prevResume,
      experiences: [...prevResume.experiences, { position: "", company: "", location: "", duration: "", responsibilities: [""] }]
    }));
  };

  const removeExperience = (index) => {
    const newExperiences = [...resume.experiences];
    newExperiences.splice(index, 1);
    setResume(prevResume => ({ ...prevResume, experiences: newExperiences }));
  };

  const removeResponsibility = (expIndex, resIndex) => {
    const newExperiences = [...resume.experiences];
    newExperiences[expIndex].responsibilities.splice(resIndex, 1);
    setResume(prevResume => ({ ...prevResume, experiences: newExperiences }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...resume.education];
    newEducation[index][field] = value;
    setResume(prevResume => ({ ...prevResume, education: newEducation }));
  };

  const addEducation = () => {
    setResume((prevResume) => ({
      ...prevResume,
      education: [...(prevResume.education || []), { institution: "", year: "", gpa: "", degree: "" }]
    }));
  };

  const removeEducation = (index) => {
    const newEducation = [...(resume.education || [])];
    newEducation.splice(index, 1);
    setResume((prevResume) => ({
      ...prevResume,
      education: newEducation
    }));
  };

  const updateAtsKeywords = (newKeywords) => {
    setAtsKeywords(newKeywords);
    setResume(prevResume => ({
      ...prevResume,
      aiGeneration: {
        ...prevResume.aiGeneration,
        atsKeywords: newKeywords,
      },
    }));
  };
  
  const handleSkillChange = (index, value) => {
    const newSkills = [...(resume.skills || [])];
    newSkills[index] = value;
    setResume((prevResume) => ({
      ...prevResume,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setResume((prevResume) => ({
      ...prevResume,
      skills: [...(prevResume.skills || []), ""]
    }));
  };

  const removeSkill = (index) => {
    const newSkills = [...(resume.skills || [])];
    newSkills.splice(index, 1);
    setResume((prevResume) => ({
      ...prevResume,
      skills: newSkills
    }));
  };

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleLinkedInImport = async () => {
    setIsImporting(true);
    try {
      if (!resume || !resume.id) {
        throw new Error(t.errors.resumeDataNotAvailable);
      }
      const data = await fetchLinkedInProfile(linkedinProfileUrl, resume.id);
      if (!data) {
        throw new Error(t.errors.noDataReceived);
      }
      setResume((prevResume) => {
        if (!prevResume) {
          throw new Error(t.errors.previousResumeUndefined);
        }
        const newResume = {
          ...prevResume,
          fullName: data.full_name || prevResume.fullName,
          professionalTitle: data.occupation || prevResume.professionalTitle,
          location: data.city && data.state && data.country ? `${data.city}, ${data.state}, ${data.country}` : prevResume.location,
          summary: data.summary || prevResume.summary,
          experiences: data.experiences && data.experiences.length ? data.experiences.map(exp => ({
            position: exp.title || "",
            company: exp.company || "",
            location: exp.location || "",
            duration: exp.starts_at ? `${exp.starts_at.year || ''}-${exp.starts_at.month || ''}-${exp.starts_at.day || ''}${exp.ends_at ? ` to ${exp.ends_at.year || ''}-${exp.ends_at.month || ''}-${exp.ends_at.day || ''}` : ' to Present'}` : "",
            responsibilities: [],
          })) : prevResume.experiences,
          education: data.education && data.education.length ? data.education.map(edu => ({
            institution: edu.school || "",
            year: edu.starts_at && edu.ends_at ? `${edu.starts_at.year || ''}-${edu.ends_at.year || ''}` : "",
            degree: edu.degree_name || "",
          })) : prevResume.education,
          skills: data.skills && data.skills.length ? data.skills : prevResume.skills,
          linkedin: linkedinProfileUrl
        };
        return newResume;
      });
      await saveResume({ ...resume, linkedin: linkedinProfileUrl });
      setShowLinkedInDropdown(false);
      addNotification(t.toasts.linkedinImportSuccess, 'success');
    } catch (error) {
      console.error("Error importing LinkedIn profile:", error);
      addNotification(error.message || t.toasts.linkedinImportError, 'error');
    } finally {
      setIsImporting(false);
    }
  };

  const fetchLinkedInProfile = async (linkedinProfileUrl, resumeId) => {
    try {
      const response = await axios.post('/api/linkedin', { linkedinProfileUrl, resumeId });
      return response.data;
    } catch (error) {
      console.error("Error fetching LinkedIn profile:", error);
      throw new Error("Failed to fetch LinkedIn profile data");
    }
  };

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    setActiveModal(null);
    addNotification(t.toasts.generatingContent, 'info');
    try {
      console.log("Starting content generation");
  
      await generateSummaryAndBulletPoints(
        resume,
        setResume,
        keywords,
        jobDescription,
        tone,
        specificInstructions,
        setGeneratingSection,
        atskeywords,
        setAtsKeywords,
        language,
        resume.sectionsVisibility 
      );
  
      console.log("Content generated, preparing to save");
  
      const currentResume = await new Promise(resolve => setResume(prevResume => {
        resolve(prevResume);
        return prevResume;
      }));
  
      console.log("Current resume state:", JSON.stringify(currentResume, null, 2));
  
      const updatedResume = {
        ...currentResume,
        aiGeneration: {
          ...currentResume.aiGeneration,
          keywords,
          jobDescription,
          tone,
          specificInstructions,
          atsKeywords: currentResume.aiGeneration?.atsKeywords || atskeywords,
          lastGeneratedAt: new Date().toISOString(),
        },
      };
  
      console.log("Updated resume data to be saved:", JSON.stringify(updatedResume, null, 2));
  
      const savedResume = await saveResume(updatedResume);
  
      console.log("Resume saved to database:", JSON.stringify(savedResume, null, 2));
  
      setResume(savedResume);
  
      addNotification(t.toasts.contentGeneratedAndSaved, 'success');
    } catch (error) {
      console.error("Error generating content:", error);
      addNotification(t.toasts.contentGenerationError, 'error');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const saveResume = async (updatedResume) => {
    try {
      console.log("Sending PUT request to save resume:", JSON.stringify(updatedResume, null, 2));
      const response = await axios.put(`/api/resumes/${updatedResume._id}`, updatedResume, { withCredentials: true });
      console.log("Response from server:", JSON.stringify(response.data, null, 2));
      return response.data.data;
    } catch (error) {
      console.error("Error saving resume:", error);
      console.error("Error response:", error.response?.data);
      throw error;
    }
  };

  useEffect(() => {
    if (resume && resume.aiGeneration) {
      setTone(resume.aiGeneration.tone || '');
      setKeywords(resume.aiGeneration.keywords || '');
      setJobDescription(resume.aiGeneration.jobDescription || '');
      setSpecificInstructions(resume.aiGeneration.specificInstructions || '');
      setAtsKeywords(resume.aiGeneration.atsKeywords || '');
    }
  }, [resume]);
  
  const handleButtonClick = (modalType) => {
    toggleModal(modalType);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollBy({
          top: 200,
          left: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const tones = [t.tones.professional, t.tones.friendly, t.tones.casual, t.tones.formal, t.tones.humorous, t.tones.serious];

  return (
    <SideNavWrapper>
      <ButtonGroup>
        <NavButton onClick={() => handleButtonClick('content')}>
          <FontAwesomeIcon icon={faFileAlt} />
          <span>{t.buttons.myContent}</span>
        </NavButton>
        <NavButton onClick={() => handleButtonClick('templates')}>
          <FontAwesomeIcon icon={faExchangeAlt} />
          <span>{t.buttons.switchTemplate}</span>
        </NavButton>
        <AIButton onClick={() => handleButtonClick('ai')}>
          <FontAwesomeIcon icon={faRobot} />
          <span>{t.buttons.aiAssistant}</span>
        </AIButton>
      </ButtonGroup>

      <Modal show={activeModal !== null}>
        <ModalContent ref={modalRef} show={activeModal !== null}>
          <CloseButton onClick={() => setActiveModal(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          {activeModal === 'content' && (
            <>
              <PanelTitle>{t.panels.myContentTitle}</PanelTitle>
              <ResumeSideNavContent
                resume={resume}
                setResume={setResume}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                handleChange={handleChange}
                handleExperienceChange={handleExperienceChange}
                handleResponsibilityChange={handleResponsibilityChange}
                addResponsibility={addResponsibility}
                removeExperience={removeExperience}
                addExperience={addExperience}
                removeResponsibility={removeResponsibility}
                handleEducationChange={handleEducationChange}
                addEducation={addEducation}
                removeEducation={removeEducation}
                handleSkillChange={handleSkillChange}
                addSkill={addSkill}
                removeSkill={removeSkill}
                generatingSection={generatingSection}
                generateSummaryAndBulletPoints={generateSummaryAndBulletPoints}
                keywords={keywords}
                positions={positions}
                atskeywords={atskeywords}
                jobDescription={jobDescription}
                tone={tone}
                specificInstructions={specificInstructions}
                setGeneratingSection={setGeneratingSection}
                setAtsKeywords={setAtsKeywords}
              />
            </>
          )}
          {activeModal === 'templates' && (
            <>
              <PanelTitle>{t.panels.switchTemplateTitle}</PanelTitle>
              <ThemeButton theme={theme} setTheme={setTheme} />
            </>
          )}
          {activeModal === 'ai' && (
            <>
              <PanelTitle>{t.panels.resumeConfigurationTitle}</PanelTitle>
              <AIConfigWrapper>
                <GenerateButton onClick={handleGenerateContent} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <SpinnerIcon icon={faSpinner} />
                      {t.buttons.generating}
                    </>
                  ) : (
                    t.buttons.generateSummaryAndBulletPoints
                  )}
                </GenerateButton>
                <InputGroup>
                  <Label>{t.labels.jobDescription}</Label>
                  <TextArea
                    placeholder={t.placeholders.jobDescription}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </InputGroup>
                
                <MoreOptionsButton onClick={() => setShowMoreOptions(!showMoreOptions)}>
                  {showMoreOptions ? t.buttons.lessOptions : t.buttons.moreOptions}
                  <FontAwesomeIcon icon={showMoreOptions ? faChevronUp : faChevronDown} />
                </MoreOptionsButton>

                <CollapsibleInputGroup isOpen={showMoreOptions}>
                  <InputGroup>
                    <Label>{t.labels.atsKeywords}</Label>
                    <TextArea
                      placeholder={t.placeholders.atsKeywords}
                      value={atskeywords}
                      readOnly
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.keywords}</Label>
                    <TextArea
                      placeholder={t.placeholders.keywords}
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.positions}</Label>
                    <TextArea
                      placeholder={t.placeholders.positions}
                      value={positions}
                      onChange={(e) => setPositions(e.target.value)}
                    />
                  </InputGroup>
                  <CheckboxLabel>
                    <Checkbox
                      id="specificInstructions"
                      checked={showSpecificInstructions}
                      onChange={() => setShowSpecificInstructions(!showSpecificInstructions)}
                    />
                    {t.labels.specificInstructions}
                  </CheckboxLabel>
                  {showSpecificInstructions && (
                    <TextArea
                      placeholder={t.placeholders.specificInstructions}
                      value={specificInstructions}
                      onChange={(e) => setSpecificInstructions(e.target.value)}
                    />
                  )}
                  <InputGroup>
                    <Label>{t.labels.tone}</Label>
                    <Select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                    >
                      <option value="" disabled>{t.placeholders.selectTone}</option>
                      {tones.map((toneOption, index) => (
                        <option key={index} value={toneOption}>{toneOption}</option>
                      ))}
                    </Select>
                  </InputGroup>
                </CollapsibleInputGroup>
              </AIConfigWrapper>
            </>
          )}
        </ModalContent>
      </Modal>

      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </SideNavWrapper>
  );
};

export default ResumeSideNav;
//Users/mohsinal/airesume-5/app/dashboard/ResumeSideNavContent.js


import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { resumeTranslations } from '../../locales/resumeTranslations';


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  border-radius: 8px;
  overflow: hidden;
  ${props => props.generating && `
    border: 2px solid #6e8efb;
  `}
`;

const SectionHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;

  background-color: #c7d2fe;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SectionContent = styled.div`
  padding: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 0.9rem;

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    border-color: #6e8efb;
    outline: none;
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 0.9rem;
  resize: vertical;

  &:hover {
    border-color: #bbb;
  }

  &:focus {
    border-color: #6e8efb;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #6e8efb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #5c7cfa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  }
`;

const RemoveButton = styled(Button)`
  background-color: #ff6b6b;

  &:hover {
    background-color: #ff5252;
  }
`;

const ResumeSideNavContent = ({
  resume,
  setResume,
  expandedSections,
  toggleSection,
  handleChange,
  handleExperienceChange,
  handleResponsibilityChange,
  addResponsibility,
  removeExperience,
  addExperience,
  removeResponsibility,
  handleEducationChange,
  addEducation,
  removeEducation,
  handleSkillChange,
  addSkill,
  removeSkill,
  generatingSection,
  generateSummaryAndBulletPoints,
  keywords,
  positions,
  jobDescription,
  tone,
  specificInstructions,
  setGeneratingSection
}) => {
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;

  const sections = [
    t.sections.basicInfo,
    t.sections.socialInfo,
    t.sections.summary,
    t.sections.experience,
    t.sections.education,
    t.sections.skills
  ];

   return (
    <ContentWrapper>
      {sections.map((section) => (
        <Section key={section} generating={generatingSection === section}>
          <SectionHeader onClick={() => toggleSection(section)}>
            <span>{section}</span>
            <FontAwesomeIcon icon={expandedSections.includes(section) ? faChevronUp : faChevronDown} />
          </SectionHeader>
          {expandedSections.includes(section) && (
            <SectionContent>
              {section === t.sections.basicInfo && (
                <>
                  <InputGroup>
                    <Label>{t.labels.fullName}</Label>
                    <Input
                      name="fullName"
                      value={resume.fullName || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.professionalTitle}</Label>
                    <Input
                      name="professionalTitle"
                      value={resume.professionalTitle || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </>
              )}
              {section === t.sections.socialInfo && (
                <>
                  <InputGroup>
                    <Label>{t.labels.linkedinUrl}</Label>
                    <Input
                      name="linkedin"
                      value={resume.linkedin || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.location}</Label>
                    <Input
                      name="location"
                      value={resume.location || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.phoneNumber}</Label>
                    <Input
                      name="phone"
                      value={resume.phone || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label>{t.labels.emailAddress}</Label>
                    <Input
                      name="email"
                      value={resume.email || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </>
              )}
              {section === t.sections.summary && (
                <>
                  <InputGroup>
                    <Label>{t.labels.summary}</Label>
                    <TextArea
                      name="summary"
                      value={resume.summary || ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </>
              )}
              {section === t.sections.experience && (
                <>
                  {resume.experiences.map((exp, index) => (
                    <div key={index}>
                      <InputGroup>
                        <Label>{t.labels.position}</Label>
                        <Input
                          value={exp.position || ""}
                          onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.company}</Label>
                        <Input
                          value={exp.company || ""}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.location}</Label>
                        <Input
                          value={exp.location || ""}
                          onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.duration}</Label>
                        <Input
                          value={exp.duration || ""}
                          onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.responsibilities}</Label>
                        {exp.responsibilities.map((resp, resIndex) => (
                          <Input
                            key={resIndex}
                            value={resp || ""}
                            onChange={(e) => handleResponsibilityChange(index, resIndex, e.target.value)}
                          />
                        ))}
                        <Button onClick={() => addResponsibility(index)}>
                          {t.buttons.addResponsibility}
                        </Button>
                      </InputGroup>
                      <RemoveButton onClick={() => removeExperience(index)}>
                        {t.buttons.removeExperience}
                      </RemoveButton>
                    </div>
                  ))}
                  <Button onClick={addExperience}>
                    {t.buttons.addExperience}
                  </Button>
                </>
              )}
              {section === t.sections.education && (
                <>
                  {resume.education.map((edu, index) => (
                    <div key={index}>
                      <InputGroup>
                        <Label>{t.labels.institution}</Label>
                        <Input
                          value={edu.institution || ""}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.year}</Label>
                        <Input
                          value={edu.year || ""}
                          onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.gpa}</Label>
                        <Input
                          value={edu.gpa || ""}
                          onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                        />
                      </InputGroup>
                      <InputGroup>
                        <Label>{t.labels.degree}</Label>
                        <Input
                          value={edu.degree || ""}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        />
                      </InputGroup>
                      <RemoveButton onClick={() => removeEducation(index)}>
                        {t.buttons.removeEducation}
                      </RemoveButton>
                    </div>
                  ))}
                  <Button onClick={addEducation}>
                    {t.buttons.addEducation}
                  </Button>
                </>
              )}
              {section === t.sections.skills && (
                <>
                  {resume.skills?.map((skill, index) => (
                    <InputGroup key={index}>
                      <Input
                        placeholder={t.placeholders.skill}
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                      />
                      <RemoveButton onClick={() => removeSkill(index)}>
                        {t.buttons.remove}
                      </RemoveButton>
                    </InputGroup>
                  ))}
                  <Button onClick={addSkill}>
                    {t.buttons.addMoreSkills}
                  </Button>
                </>
              )}
            </SectionContent>
          )}
        </Section>
      ))}
    </ContentWrapper>
  );
};

export default ResumeSideNavContent;
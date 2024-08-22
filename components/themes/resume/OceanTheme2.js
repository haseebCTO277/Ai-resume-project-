
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { sendOpenAi } from '../../../libs/gpt';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa'; 

import {
  handleInputChange,
  handleExperienceChange,
  handleResponsibilityChange,
  handleEducationChange,
  handleSkillChange,
  handleHobbyChange,
  handleSoftwareChange,
  handleLanguageChange,
  handleCertificateChange,
  handleExtraSectionChange,
  handleExtraDetailedSectionChange,
  handleExtraDetailedSectionDetailChange,
  addResponsibility,
  removeExperience,
  removeEducation,
  removeSkill,
  removeHobby,
  removeSoftware,
  removeLanguage,
  removeCertificate,
  removeExtraSection,
  removeExtraDetailedSection,
  addExtraDetailedSectionDetail,
  removeResponsibility,
  removeExtraDetailedSectionDetail,
} from '../../../lib/utils/resumeUtils';
import { useResumeDataEffect, useClickOutside, useTextareaResize, useTextareaAutoResize } from '../../../lib/hooks/useResumeHooks';
import { useLanguage } from '../../../contexts/LanguageContext';
import { displayedresumeThemesTranslations } from '../../../locales/displayedresumeThemesTranslations';

export default function OceanTheme({ resumeData, setResumeData, fullNameColor, fontFamily, sectionsVisibility, summaryRef: passedSummaryRef }) {
  const { language } = useLanguage();
  const t = displayedresumeThemesTranslations[language] || displayedresumeThemesTranslations.en;
  const isRTL = language === 'ar';

  const resumeRef = useRef(null);
  const defaultSummaryRef = useRef(null);
  const summaryRef = passedSummaryRef || defaultSummaryRef;

  const [hoveredExperience, setHoveredExperience] = useState(null);
  const [hoveredResponsibility, setHoveredResponsibility] = useState({ expIndex: null, resIndex: null });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredEducation, setHoveredEducation] = useState(null);
  const [regenerateFields, setRegenerateFields] = useState({});
  const [moreOptionsFields, setMoreOptionsFields] = useState({});
  const [summaryRegenerate, setSummaryRegenerate] = useState(false);
  const [summaryKeywords, setSummaryKeywords] = useState('');
  const [summarySpecificInstructions, setSummarySpecificInstructions] = useState('');
  const [generatingSection, setGeneratingSection] = useState(null);

  const [hoveredHobby, setHoveredHobby] = useState(null);
  const [hoveredSoftware, setHoveredSoftware] = useState(null);
  const [hoveredLanguage, setHoveredLanguage] = useState(null);
  const [hoveredCertificate, setHoveredCertificate] = useState(null);
  const [hoveredExtra, setHoveredExtra] = useState(null);
  const [hoveredExtraDetailedSection, setHoveredExtraDetailedSection] = useState(null);
  const [hoveredExtraDetailedSectionDetail, setHoveredExtraDetailedSectionDetail] = useState({ expIndex: null, resIndex: null });

  useResumeDataEffect(resumeData, setResumeData, fontFamily);
  useClickOutside(hoveredExperience, summaryRegenerate, setRegenerateFields, setMoreOptionsFields, setSummaryRegenerate);
  useTextareaResize(resumeData, summaryRef);
  useTextareaAutoResize(resumeData);

  const generateSummary = async () => {
    const userId = "your_user_id";
    let summaryContent = '';

    setGeneratingSection('summary');
    await sendOpenAi(
      [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Generate a professional summary for my resume with the following details:
        Keywords: ${summaryKeywords},
        Specific Instructions: ${summarySpecificInstructions}` },
      ],
      userId,
      (content) => {
        summaryContent += content;
        setResumeData(prevData => ({
          ...prevData,
          summary: summaryContent
        }));
      }
    );

    toast.success("Summary generated");
    setGeneratingSection(null);
  };

  if (!resumeData) return <div>Loading...</div>;

  function darkenColor(color, amount) {
    let usePound = false;
  
    if (color[0] === "#") {
      color = color.slice(1);
      usePound = true;
    }
  
    const num = parseInt(color, 16);
  
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;
  
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
  
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
  
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
  
    return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }
  const darkenedColor = darkenColor(fullNameColor, -1);

  const rtlStyle = isRTL ? { direction: 'rtl', textAlign: 'right' } : {};
  const ltrStyle = isRTL ? { direction: 'ltr', textAlign: 'left' } : {};
  
  return (
    <div ref={resumeRef} style={{ padding: '0', margin: '0', fontFamily: fontFamily, ...rtlStyle }}>
      <main className="w-full max-w-[800px] h-max flex text-black" style={{ backgroundColor: 'white', boxShadow: '0 0 10px rgba(0.9, 0.9, 0.9, 0.7)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <section className="text-white w-[30%] h-full pt-2 pb-10" style={{ backgroundColor: 'white', ...rtlStyle }}>
          <div className="px-3">
            <textarea
              className="text-3xl font-semibold bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
              name="fullName"
              placeholder={t.fullName}
              value={resumeData.fullName || ""}
              onChange={(e) => handleInputChange(e, setResumeData)}
              rows={1}
              style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
            />
            <textarea
              className="opacity-80 bg-transparent border-none outline-none text-[20px] font-semibold w-11/12 resize-none overflow-hidden"
              name="professionalTitle"
              placeholder={t.professionalTitle}
              value={resumeData.professionalTitle || ""}
              onChange={(e) => handleInputChange(e, setResumeData)}
              rows={1}
              style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
            />
          </div>

          {/* Personal Info */}
          <section className="mt-3" style={rtlStyle}>
            <h1 className="text-[15px] py-1 px-3 font-medium"
              style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
            >
              {t.personalInfo}
            </h1>
            <ul className="mt-2 px-3 max-w-[70%] flex flex-col gap-2" style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}>
              <li className="text-[13px]">
                <span className="font-medium opacity-80">{t.address}</span>
                <input
                  className="text-[12px] flex flex-col bg-transparent border-none outline-none"
                  name="location"
                  placeholder={t.location}
                  value={resumeData.location || ""}
                  onChange={(e) => handleInputChange(e, setResumeData)}
                  rows={1}
                  style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                />
              </li>
              <li className="text-[13px]">
                <span className="font-medium opacity-80">{t.phoneNumber}</span>
                <input
                  className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none"
                  name="phone"
                  placeholder={t.phoneNumber}
                  value={resumeData.phone || ""}
                  onChange={(e) => handleInputChange(e, setResumeData)}
                  rows={1}
                  style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                />
              </li>
              <li className="text-[13px]">
                <span className="font-medium opacity-80">{t.email}</span>
                <input
                  className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none"
                  name="email"
                  placeholder={t.email}
                  value={resumeData.email || ""}
                  onChange={(e) => handleInputChange(e, setResumeData)}
                  rows={1}
                  style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                />
              </li>
              <li className="text-[13px]">
                <span className="font-medium opacity-80">{t.linkedin}</span>
                <input
                  className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none"
                  name="linkedin"
                  placeholder={t.linkedin}
                  value={resumeData.linkedin || ""}
                  onChange={(e) => handleInputChange(e, setResumeData)}
                  rows={1}
                  style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                />
              </li>
            </ul>
          </section>

          {/* Skills */}
          <section className={`mt-1 relative group ${generatingSection === 'skills' ? 'generating' : ''}`} style={rtlStyle}>
            <h1 className="text-[15px] py-1 px-3 font-medium"
              style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
            >
              {t.skills}
            </h1>
            <ul className="mt-1 px-2 w-[100%] flex flex-col gap-2" style={rtlStyle}>
              {resumeData.skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-[12px] opacity-80 flex justify-between relative group"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <input
                    className="bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
                    placeholder={t.skill}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value, setResumeData, resumeData)}
                    rows={1}
                    style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                  />
                  {hoveredSkill === index && (
                    <button
                      onClick={() => removeSkill(index, setResumeData, resumeData)}
                      className="absolute bottom-[5px] right-[5px] text-red-500"
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setResumeData(prevData => ({
                ...prevData,
                skills: [...prevData.skills, ""]
              }))}
              className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-[95%]"
            >
              {t.addMoreSkills}
            </button>
          </section>

          {/* Conditionally rendered sections */}
          {/* HOBBIES */}
          {sectionsVisibility.hobbies && (
            <section className={`mt-1 relative group ${generatingSection === 'hobbies' ? 'generating' : ''}`} style={rtlStyle}>
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
              >
                {t.hobbies}
              </h1>
              <ul className="mt-1 px-2 w-[100%] flex flex-col gap-2" style={rtlStyle}>
                {resumeData.hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="text-[12px] opacity-80 flex justify-between relative group"
                    onMouseEnter={() => setHoveredHobby(index)}
                    onMouseLeave={() => setHoveredHobby(null)}
                  >
                    <input
                      className="bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
                      placeholder={t.hobby}
                      value={hobby}
                      onChange={(e) => handleHobbyChange(index, e.target.value, setResumeData, resumeData)}
                      rows={1}
                      style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                    />
                    {hoveredHobby === index && (
                      <button
                        onClick={() => removeHobby(index, setResumeData, resumeData)}
                        className="absolute bottom-[5px]right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    hobbies: [...prevData.hobbies, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-[95%]"
                >
                  {t.addMoreHobbies}
                </button>
              </section>
            )}
  
            {/* SOFTWARE */}
            {sectionsVisibility.software && (
              <section className="mt-3 relative group" style={rtlStyle}>
                <h1 className="text-[15px] py-1 px-3 font-medium"
                  style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
                >
                  {t.software}
                </h1>
                <ul className="mt-1 px-2 w-[100%] flex flex-col gap-2" style={rtlStyle}>
                  {resumeData.software.map((software, index) => (
                    <li
                      key={index}
                      className="text-[12px] opacity-80 flex justify-between relative group"
                      onMouseEnter={() => setHoveredSoftware(index)}
                      onMouseLeave={() => setHoveredSoftware(null)}
                    >
                      <input
                        className="bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
                        placeholder={t.software}
                        value={software}
                        onChange={(e) => handleSoftwareChange(index, e.target.value, setResumeData, resumeData)}
                        rows={1}
                        style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                      />
                      {hoveredSoftware === index && (
                        <button
                          onClick={() => removeSoftware(index, setResumeData, resumeData)}
                          className="absolute bottom-[5px] right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    software: [...prevData.software, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-[95%]"
                >
                  {t.addMoreSoftware}
                </button>
              </section>
            )}
  
            {/* LANGUAGES */}
            {sectionsVisibility.languages && (
              <section className={`mt-1 relative group ${generatingSection === 'languages' ? 'generating' : ''}`} style={rtlStyle}>
                <h1 className="text-[15px] py-1 px-3 font-medium"
                  style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
                >
                  {t.languages}
                </h1>
                <ul className="mt-1 px-2 w-[100%] flex flex-col gap-2" style={rtlStyle}>
                  {resumeData.languages.map((language, index) => (
                    <li
                      key={index}
                      className="text-[12px] opacity-80 flex justify-between relative group"
                      onMouseEnter={() => setHoveredLanguage(index)}
                      onMouseLeave={() => setHoveredLanguage(null)}
                    >
                      <input
                        className="bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
                        placeholder={t.language}
                        value={language}
                        onChange={(e) => handleLanguageChange(index, e.target.value, setResumeData, resumeData)}
                        rows={1}
                        style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                      />
                      {hoveredLanguage === index && (
                        <button
                          onClick={() => removeLanguage(index, setResumeData, resumeData)}
                          className="absolute bottom-[5px] right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    languages: [...prevData.languages, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-[95%]"
                >
                  {t.addMoreLanguages}
                </button>
              </section>
            )}
  
            {/* EXTRA SECTIONS */}
            {sectionsVisibility.extraSection && (
              <section className={`mt-1 relative group ${generatingSection === 'extraSection' ? 'generating' : ''}`} style={rtlStyle}>
                <h1 className="text-[15px] py-1 px-3 font-medium"
                  style={{ color: fullNameColor, borderBottom: `2px solid ${darkenedColor}`, ...rtlStyle }}
                >
                  {t.extraSections}
                </h1>
                <ul className="mt-1 px-2 w-[100%] flex flex-col gap-2" style={rtlStyle}>
                  {resumeData.extraSection.map((extra, index) => (
                    <li
                      key={index}
                      className="text-[12px] opacity-80 flex justify-between relative group"
                      onMouseEnter={() => setHoveredExtra(index)}
                      onMouseLeave={() => setHoveredExtra(null)}
                    >
                      <input
                        className="bg-transparent border-none outline-none w-11/12 resize-none overflow-hidden"
                        placeholder={t.extraSection}
                        value={extra}
                        onChange={(e) => handleExtraSectionChange(index, e.target.value, setResumeData, resumeData)}
                        rows={1}
                        style={{ color: fullNameColor, whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", ...rtlStyle }}
                      />
                      {hoveredExtra === index && (
                        <button
                          onClick={() => removeExtraSection(index, setResumeData, resumeData)}
                          className="absolute bottom-[5px] right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    extraSection: [...prevData.extraSection, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-[95%]"
                >
                  {t.addMoreExtraSections}
                </button>
              </section>
            )}
          </section>
  
          {/* RIGHT COLUMN */}
          <aside className="w-[70%] flex flex-col gap-1 px-4 py-4" style={{ backgroundColor: fullNameColor, ...rtlStyle }}>
            {/* SUMMARY */}
            <section className={`relative group ${generatingSection === 'summary' ? 'generating' : ''}`} style={rtlStyle}>
              <textarea
                ref={summaryRef}
                className="text-[13px] border-b-2 w-full resize-none overflow-hidden bg-transparent border-none outline-none text-white"
                name="summary"
                placeholder={t.summary}
                value={resumeData.summary || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
                rows={1}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight + 20}px`;
                }}
                style={rtlStyle}
              />
              <button
                onClick={() => setSummaryRegenerate(!summaryRegenerate)}
                className="hidden group-hover:block absolute top-[15px] right-[5px] bg-white border border-blue-500 text-blue-500 px-2 py-1 rounded z-50"
              >
                {t.regenerate}
              </button>
              {summaryRegenerate && (
                <div id="summary-regenerate" className="absolute top-[40px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96">
                  <div className="flex items-center mb-2">
                    <label className="w-1/3 text-sm">{t.keywords}</label>
                    <input type="text" placeholder={t.keywords} className="w-2/3 border px-2 py-1 rounded" value={summaryKeywords} onChange={(e) => setSummaryKeywords(e.target.value)} />
                  </div>
                  <div className="flex items-center mb-2">
                    <label className="w-1/3 text-sm">{t.specificInstructions}</label>
                    <textarea placeholder={t.specificInstructions} className="w-2/3 border px-2 py-1 rounded" value={summarySpecificInstructions} onChange={(e) => setSummarySpecificInstructions(e.target.value)} />
                  </div>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={generateSummary}>
                    {t.generate}
                  </button>
                  <button
                    onClick={() => setSummaryRegenerate(false)}
                    className="text-gray-500 mt-2"
                  >
                    {t.close}
                  </button>
                </div>
              )}
            </section>
  
            {/* EXPERIENCE */}
            <section className={`mt-5 relative group ${generatingSection && generatingSection.startsWith('experience') ? 'generating' : ''}`} style={rtlStyle}>
              <h1 className="font-bold border-b-2 border-b-black text-white">{t.experience}</h1>
              <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                {(resumeData.experiences || []).map((experience, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setHoveredExperience(index)}
                    onMouseLeave={() => setHoveredExperience(null)}
                    className={`relative transition-all duration-300 ${hoveredExperience === index ? 'mt-10 mb-10' : 'mt-1 mb-1'}`}
                  >
                    <div className={`flex items-center gap-1 font-bold text-[13px] ${hoveredExperience === index ? 'pt-4 pb-4' : 'pt-1 pb-1'}`} style={{ maxWidth: '95%' }}>
                      <input
                        className="font-bold bg-transparent border-none outline-none text-white"
                        placeholder={t.position}
                        value={experience.position || ""}
                        onChange={(e) => handleExperienceChange(index, 'position', e.target.value, setResumeData, resumeData)}
                        style={rtlStyle}
                      />
                      <p>|</p>
                      <input
                        className="font-bold bg-transparent border-none outline-none text-white"
                        placeholder={t.company}
                        value={experience.company || ""}
                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value, setResumeData, resumeData)}
                        style={{ maxWidth: '22%', ...rtlStyle }}
                      />
                      <p>|</p>
                      <input
                        className="font-bold bg-transparent border-none outline-none text-white"
                        placeholder={t.location}
                        value={experience.location || ""}
                        onChange={(e) => handleExperienceChange(index, 'location', e.target.value, setResumeData, resumeData)}
                        style={rtlStyle}
                      />
                      <p>|</p>
                      <input
                        className="font-bold bg-transparent border-none outline-none text-white"
                        placeholder={t.duration}
                        value={experience.duration || ""}
                        onChange={(e) => handleExperienceChange(index, 'duration', e.target.value, setResumeData, resumeData)}
                        style={{ maxWidth: '25%', ...rtlStyle }}
                      />
                    </div>
                    <div className="ml-5 text-[13px]/[17px] mt-1 relative text-white" style={{ listStyleType: 'none', paddingLeft: '0' }}>
                      <textarea
                        className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
                        placeholder={t.responsibilities}
                        value={(experience.responsibilities || []).join('\n')}
                        onChange={(e) => {
                          const newResponsibilities = e.target.value.split('\n');
                          handleExperienceChange(index, 'responsibilities', newResponsibilities, setResumeData, resumeData);
                        }}
                        rows={5}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight + 20}px`;
                        }}
                        style={{ maxWidth: '100%', ...rtlStyle }}
                      />
                    </div>
                    {hoveredExperience === index && (
                      <>
                        <button
                          onClick={() => removeExperience(index, setResumeData, resumeData)}
                          className="absolute bottom-[35px] right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => setRegenerateFields(prevState => ({ ...prevState, [index]: !prevState[index] }))}
                          className="absolute top-[-25px] right-[5px] bg-white border border-blue-500 text-blue-500 px-2 py-1 rounded"
                        >
                          {t.regenerate}
                        </button>
                        {regenerateFields[index] && (
                          <div id={`regenerate-${index}`} className="absolute top-[10px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96">
                            <div className="flex items-center mb-2">
                              <label className="w-1/3 text-sm">{t.keywords}</label>
                              <input type="text" placeholder={t.keywords} className="w-2/3 border px-2 py-1 rounded" />
                          </div>
                          <div className="flex items-center mb-2">
                            <label className="w-1/3 text-sm">{t.specificInstructions}</label>
                            <textarea placeholder={t.specificInstructions} className="w-2/3 border px-2 py-1 rounded" />
                          </div>
                          <button className="bg-blue-500 text-white px-2 py-1 rounded">{t.generate}</button>
                          <button
                            onClick={() => setRegenerateFields(prevState => ({ ...prevState, [index]: false }))}
                            className="text-gray-500 mt-2"
                          >
                            {t.close}
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => setMoreOptionsFields(prevState => ({ ...prevState, [index]: !prevState[index] }))}
                        className="absolute top-[-25px] left-[5px] bg-white border border-green-500 text-green-500 px-2 py-1 rounded"
                      >
                        {t.moreOptions}
                      </button>
                      {moreOptionsFields[index] && (
                        <div id={`more-options-${index}`} className="absolute top-[10px] left-0 bg-white border border-green-500 p-2 rounded shadow-lg w-96">
                          <div className="flex items-center mb-2">
                            <label className="w-1/3 text-sm">{t.bulletPointLength}</label>
                            <input type="text" placeholder={t.bulletPointLength} className="w-2/3 border px-2 py-1 rounded" />
                          </div>
                          <div className="flex items-center mb-2">
                            <label className="w-1/3 text-sm">{t.specificActionVerbs}</label>
                            <input type="text" placeholder={t.specificActionVerbs} className="w-2/3 border px-2 py-1 rounded" />
                          </div>
                          <div className="flex items-center mb-2">
                            <label className="w-1/3 text-sm">{t.specificAchievements}</label>
                            <input type="text" placeholder={t.specificAchievements} className="w-2/3 border px-2 py-1 rounded" />
                          </div>
                          <button className="bg-green-500 text-white px-2 py-1 rounded">{t.save}</button>
                          <button
                            onClick={() => setMoreOptionsFields(prevState => ({ ...prevState, [index]: false }))}
                            className="text-gray-500 mt-2"
                          >
                            {t.close}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setResumeData(prevData => ({
                ...prevData,
                experiences: [...prevData.experiences, { position: "", company: "", location: "", duration: "", responsibilities: [""] }]
              }))}
              className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-1/2"
            >
              {t.addMoreExperience}
            </button>
          </section>

          {/* EDUCATION */}
          <section className={`mt-5 relative group ${generatingSection === 'education' ? 'generating' : ''}`} style={rtlStyle}>
            <h1 className="font-bold border-b-2 border-b-black text-white">{t.education}</h1>
            <ul className="max-w-[400px] text-[13px] ">
              {(resumeData.education || []).map((edu, index) => (
                <li key={index} onMouseEnter={() => setHoveredEducation(index)} onMouseLeave={() => setHoveredEducation(null)} className="relative">
                  <div className="w-full flex items-center justify-between ">
                    <input
                      className="text-[13px] border-b-2 w-full resize-none overflow-hidden bg-transparent border-none outline-none text-white"
                      placeholder={t.institution}
                      value={edu.institution || ""}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value, setResumeData, resumeData)}
                      style={rtlStyle}
                    />
                    <input
                      className="w-1/4 bg-transparent border-none outline-none text-white"
                      placeholder={t.year}
                      value={edu.year || ""}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value, setResumeData, resumeData)}
                      style={rtlStyle}
                    />
                    {hoveredEducation === index && (
                      <button
                        onClick={() => removeEducation(index, setResumeData, resumeData)}
                        className="absolute bottom-[5px] right-[5px] text-red-500"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <input
                    className="ml-2 w-full bg-transparent border-none outline-none text-white"
                    placeholder={t.degree}
                    value={edu.degree || ""}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value, setResumeData, resumeData)}
                    style={rtlStyle}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={() => setResumeData(prevData => ({
                ...prevData,
                education: [...prevData.education, { institution: "", year: "", gpa: "", degree: "" }]
              }))}
              className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-1/2"
            >
              {t.addMoreEducation}
            </button>
          </section>

          {/* Certificates */}
          {sectionsVisibility.certificates && (
            <section className={`mt-5 relative group ${generatingSection === 'certificates' ? 'generating' : ''}`} style={rtlStyle}>
              <h1 className="font-bold border-b-2 border-b-black text-white">{t.certificates}</h1>
              <ul className="text-[13px] border-b-2 w-full resize-none overflow-hidden bg-transparent border-none outline-none text-white">
                {(resumeData.certificates || []).map((certificate, index) => (
                  <li key={index} onMouseEnter={() => setHoveredCertificate(index)} onMouseLeave={() => setHoveredCertificate(null)} className="relative">
                    <div className="w-full flex items-center justify-between ">
                      <input
                        className="font-bold w-1/2 bg-transparent"
                        placeholder={t.certificate}
                        value={certificate.name || ""}
                        onChange={(e) => handleCertificateChange(index, 'name', e.target.value, setResumeData, resumeData)}
                        style={rtlStyle}
                      />
                      <input
                        className="w-1/4 bg-transparent"
                        placeholder={t.year}
                        value={certificate.year || ""}
                        onChange={(e) => handleCertificateChange(index, 'year', e.target.value, setResumeData, resumeData)}
                        style={rtlStyle}
                      />
                      {hoveredCertificate === index && (
                        <button
                          onClick={() => removeCertificate(index, setResumeData, resumeData)}
                          className="absolute bottom-[5px] right-[5px] text-red-500"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setResumeData(prevData => ({
                  ...prevData,
                  certificates: [...prevData.certificates, { name: "", year: "" }]
                }))}
                className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-1/2"
              >
                {t.addMoreCertificates}
              </button>
            </section>
          )}

          {/* EXTRA DETAILED SECTIONS */}
          {sectionsVisibility.extraDetailedSection && (
            <section className={`mt-5 relative group ${generatingSection === 'extraDetailedSection' ? 'generating' : ''}`} style={rtlStyle}>
              <h1 className="font-bold border-b-2 border-b-black text-white">{t.extraDetailedSections}</h1>
              <ul>
                {(resumeData.extraDetailedSection || []).map((extraDetail, index) => (
                  <li key={index} onMouseEnter={() => setHoveredExtraDetailedSection(index)} onMouseLeave={() => setHoveredExtraDetailedSection(null)} className={`relative transition-all duration-300 ${hoveredExtraDetailedSection === index ? 'mt-10 mb-10' : 'mt-2 mb-2'}`}>
                    <div className={`flex items-center gap-1 font-bold text-[13px] ${hoveredExtraDetailedSection === index ? 'pt-4 pb-4' : 'pt-1 pb-1'}`} style={{ maxWidth: '95%' }}>
                      <input
                        className="font-bold bg-transparent border-none outline-none text-white"
                        placeholder={t.extraDetailedSection}
                        value={extraDetail.title || ""}
                        onChange={(e) => handleExtraDetailedSectionChange(index, 'title', e.target.value, setResumeData, resumeData)}
                        style={rtlStyle}
                      />
                    </div>
                    <ul className="ml-5 list-disc text-[13px]/[17px] mt-1 relative w-full text-white">
                      {(extraDetail.details || []).map((detail, resIndex) => (
                        <li key={resIndex} className="relative group w-full" onMouseEnter={() => setHoveredExtraDetailedSectionDetail({ expIndex: index, resIndex })} onMouseLeave={() => setHoveredExtraDetailedSectionDetail({ expIndex: null, resIndex: null })}>
                          {hoveredExtraDetailedSectionDetail.expIndex === index && hoveredExtraDetailedSectionDetail.resIndex === resIndex && (
                            <button
                              onClick={() => removeExtraDetailedSectionDetail(index, resIndex, setResumeData, resumeData)}
                              className="absolute left-[-25px] text-red-500"
                            >
                              <FaTrash className="w-4 h-4"/>
                            </button>
                          )}
                          <textarea
                            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
                            placeholder={t.detail}
                            value={detail || ""}
                            onChange={(e) => handleExtraDetailedSectionDetailChange(index, resIndex, e.target.value, setResumeData, resumeData)}
                            rows={1}
                            onInput={(e) => {
                              e.target.style.height = 'auto';
                              e.target.style.height = `${e.target.scrollHeight + 20}px`;
                            }}
                            style={{ maxWidth: '100%', ...rtlStyle }}
                          />
                        </li>
                      ))}
                      {hoveredExtraDetailedSection === index && (
                        <button
                          onClick={() => addExtraDetailedSectionDetail(index, setResumeData, resumeData)}
                          className="inline-block text-green-500"
                        >
                          {t.addMoreBulletPoints}
                        </button>
                      )}
                    </ul>
                    {hoveredExtraDetailedSection === index && (
                      <button
                        onClick={() => removeExtraDetailedSection(index, setResumeData, resumeData)}
                        className="absolute bottom-[5px] right-[5px] text-red-500"
                      >
                        <FaTrash className="w-6 h-6"/>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setResumeData(prevData => ({
                  ...prevData,
                  extraDetailedSection: [...prevData.extraDetailedSection, { title: "", details: [""] }]
                }))}
                className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-1/2"
              >
                {t.addMoreExtraDetailedSections}
              </button>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
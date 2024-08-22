import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { sendOpenAi } from '../../../libs/gpt'; // Ensure the path is correct
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

import {
  handleInputChange,
  handleExperienceChange,
  handleEducationChange,
  handleSkillChange,
  handleHobbyChange,
  handleSoftwareChange,
  handleLanguageChange,
  handleCertificateChange,
  handleExtraSectionChange,
  handleExtraDetailedSectionChange,
  handleExtraDetailedSectionDetailChange,
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
  removeExtraDetailedSectionDetail,
} from '../../../lib/utils/resumeUtils';
import { useResumeDataEffect, useClickOutside, useTextareaResize, useTextareaAutoResize } from '../../../lib/hooks/useResumeHooks';
import { useLanguage } from '../../../contexts/LanguageContext';
import { displayedresumeThemesTranslations } from '../../../locales/displayedresumeThemesTranslations';

export default function WhiteAndBlue({
  resumeData,
  setResumeData,
  fullNameColor,
  fontFamily,
  sectionsVisibility,
  summaryRef: passedSummaryRef
}) {
  const { language } = useLanguage();
  const t = displayedresumeThemesTranslations[language] || displayedresumeThemesTranslations.en;
  const isRTL = language === 'ar';

  const resumeRef = useRef(null);
  const defaultSummaryRef = useRef(null);
  const summaryRef = passedSummaryRef || defaultSummaryRef;

  const [hoveredExperience, setHoveredExperience] = useState(null);
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
    const userId = "your_user_id"; // Replace with the actual user ID if needed
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

    toast.success(t.summaryGenerated);
    setGeneratingSection(null);
  };

  if (!resumeData) return <div>{t.loading}</div>;

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

  const darkenedColor = darkenColor(fullNameColor, -40); // Adjust the amount to get the desired darkness

  const rtlStyle = isRTL ? { direction: 'rtl', textAlign: 'right' } : {};
  const ltrStyle = isRTL ? { direction: 'ltr', textAlign: 'left' } : {};

  return (
    <div ref={resumeRef} style={{ padding: '0', margin: '0', fontFamily: fontFamily, minHeight: '100vh', display: 'flex', flexDirection: 'column', ...rtlStyle }}>
      <main className="w-full max-w-[800px] flex-grow flex text-black " style={{ backgroundColor: 'white', boxShadow: '0 0 10px rgba(0.9, 0.9, 0.9, 0.7)', fontFamily: fontFamily, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {/* LEFT COLUMN (previously RIGHT COLUMN) */}
        <section className="w-[70%] flex flex-col gap-0 px-4 py-2" style={{ fontFamily: fontFamily, backgroundColor: 'white', ...rtlStyle }}>
          {/* SUMMARY */}
          <section className={`relative group ${generatingSection === 'summary' ? 'generating' : ''}`}>
            <textarea
              ref={summaryRef}
              className="text-[13px] border-b-2 w-full resize-none overflow-hidden mt-1 mb-2"
              name="summary"
              placeholder={t.summary}
              value={resumeData.summary || ""}
              onChange={(e) => handleInputChange(e, setResumeData)}
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              style={{ fontFamily: fontFamily, ...rtlStyle }}
            />
            <button
              onClick={() => setSummaryRegenerate(!summaryRegenerate)}
              className="hidden group-hover:block absolute top-[15px] right-[5px] bg-white border border-blue-500 text-blue-500 px-2 py-1 rounded"
              style={{ fontFamily: fontFamily }}
            >
              {t.regenerate}
            </button>
            {summaryRegenerate && (
              <div id="summary-regenerate" className="absolute top-[40px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96" style={{ fontFamily: fontFamily }}>
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
          <section className={`mt-2 relative group ${generatingSection && generatingSection.startsWith('experience') ? 'generating' : ''}`}>
            <h1 className="font-bold border-b-2 border-b-black mb-1" style={{ color: fullNameColor, fontFamily: fontFamily, ...rtlStyle }}>{t.experience}</h1>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', fontFamily: fontFamily, ...rtlStyle }}>
              {(resumeData.experiences || []).map((experience, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredExperience(index)}
                  onMouseLeave={() => setHoveredExperience(null)}
                  className={`relative transition-all duration-300 ${hoveredExperience === index ? 'mt-5 mb-5' : 'mt-1 mb-1'}`}
                  style={{ fontFamily: fontFamily }}
                >
                  <div className={`flex items-center gap-1 font-bold text-[13px] ${hoveredExperience === index ? 'pt-2 pb-2' : 'pt-0 pb-0'}`} style={{ maxWidth: '95%', fontFamily: fontFamily }}>
                    <input
                      className="font-bold"
                      placeholder={t.position}
                      value={experience.position || ""}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value, setResumeData, resumeData)}
                      style={{ color: fullNameColor, maxWidth: '25%', fontFamily: fontFamily }}
                    />
                    <p>|</p>
                    <input
                      className="font-bold"
                      placeholder={t.company}
                      value={experience.company || ""}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value, setResumeData, resumeData)}
                      style={{ maxWidth: '25%', fontFamily: fontFamily }}
                    />
                    <p>|</p>
                    <input
                      className="font-bold"
                      placeholder={t.location}
                      value={experience.location || ""}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value, setResumeData, resumeData)}
                      style={{ color: fullNameColor, maxWidth: '25%', fontFamily: fontFamily }}
                    />
                    <p>|</p>
                    <input
                      className="font-bold"
                      placeholder={t.duration}
                      value={experience.duration || ""}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value, setResumeData, resumeData)}
                      style={{ maxWidth: '25%', fontFamily: fontFamily }}
                    />
                  </div>
      
                  <div className="ml-5 text-[13px]/[17px] mt-0 relative" style={{ paddingLeft: '0', fontFamily: fontFamily }}>
                    <textarea
                      className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
                      placeholder={t.responsibilities}
                      value={experience.responsibilities ? experience.responsibilities.join('\n') : ""}
                      onChange={(e) => {
                        const newResponsibilities = e.target.value.split('\n');
                        handleExperienceChange(index, 'responsibilities', newResponsibilities, setResumeData, resumeData);
                      }}
                      rows={4}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      style={{ fontFamily: fontFamily }}
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
                        style={{ fontFamily: fontFamily }}
                      >
                        {t.regenerate}
                      </button>
                      {regenerateFields[index] && (
                        <div id={`regenerate-${index}`} className="absolute top-[10px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96" style={{ fontFamily: fontFamily }}>
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
                          style={{ fontFamily: fontFamily }}
                        >
                          {t.moreOptions}
                        </button>
                        {moreOptionsFields[index] && (
                          <div id={`more-options-${index}`} className="absolute top-[10px] left-0 bg-white border border-green-500 p-2 rounded shadow-lg w-96" style={{ fontFamily: fontFamily }}>
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
                className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-1/2"
                style={{ fontFamily: fontFamily }}
              >
                {t.addMoreExperience}
              </button>
            </section>
  
            {/* EDUCATION */}
            <section className={`mt-2 relative group ${generatingSection === 'education' ? 'generating' : ''}`}>
              <h1 className="font-bold border-b-2 border-b-black mb-1" style={{ color: fullNameColor, fontFamily: fontFamily, ...rtlStyle }}>{t.education}</h1>
              <ul className="max-w-[400px] text-[13px]" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                {(resumeData.education || []).map((edu, index) => (
                  <li key={index} onMouseEnter={() => setHoveredEducation(index)} onMouseLeave={() => setHoveredEducation(null)} className="relative mb-1" style={{ fontFamily: fontFamily }}>
                    <div className="w-full flex items-center justify-between" style={{ fontFamily: fontFamily }}>
                      <input
                        className="font-bold w-1/2"
                        placeholder={t.institution}
                        value={edu.institution || ""}
                        onChange={(e) => handleEducationChange(index, 'institution', e.target.value, setResumeData, resumeData)}
                        style={{ fontFamily: fontFamily }}
                      />
                      <input
                        className="w-1/4"
                        placeholder={t.year}
                        value={edu.year || ""}
                        onChange={(e) => handleEducationChange(index, 'year', e.target.value, setResumeData, resumeData)}
                        style={{ color: fullNameColor, fontFamily: fontFamily }}
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
                      className="ml-2 w-full"
                      placeholder={t.degree}
                      value={edu.degree || ""}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value, setResumeData, resumeData)}
                      style={{ fontFamily: fontFamily }}
                    />
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setResumeData(prevData => ({
                  ...prevData,
                  education: [...prevData.education, { institution: "", year: "", degree: "" }]
                }))}
                className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-1/2"
                style={{ fontFamily: fontFamily }}
              >
                {t.addMoreEducation}
              </button>
            </section>
  
            {/* Certificates */}
            {sectionsVisibility.certificates && (
              <section className={`mt-2 relative group ${generatingSection === 'certificates' ? 'generating' : ''}`}>
                <h1 className="font-bold border-b-2 border-b-black mb-1" style={{ color: fullNameColor, fontFamily: fontFamily, ...rtlStyle }}>{t.certificates}</h1>
                <ul className="max-w-[400px] text-[13px]" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                  {(resumeData.certificates || []).map((certificate, index) => (
                    <li key={index} onMouseEnter={() => setHoveredCertificate(index)} onMouseLeave={() => setHoveredCertificate(null)} className="relative mb-1" style={{ fontFamily: fontFamily }}>
                      <div className="w-full flex items-center justify-between" style={{ fontFamily: fontFamily }}>
                        <input
                          className="font-bold w-1/2"
                          placeholder={t.certificate}
                          value={certificate.name || ""}
                          onChange={(e) => handleCertificateChange(index, 'name', e.target.value, setResumeData, resumeData)}
                          style={{ fontFamily: fontFamily }}
                        />
                        <input
                          className="w-1/4"
                          placeholder={t.year}
                          value={certificate.year || ""}
                          onChange={(e) => handleCertificateChange(index, 'year', e.target.value, setResumeData, resumeData)}
                          style={{ color: fullNameColor, fontFamily: fontFamily }}
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
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-1/2"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreCertificates}
                </button>
              </section>
            )}
  
            {/* EXTRA DETAILED SECTIONS */}
            {sectionsVisibility.extraDetailedSection && (
              <section className={`mt-2 relative group ${generatingSection === 'extraDetailedSection' ? 'generating' : ''}`}>
                <h1 className="font-bold border-b-2 border-b-black mb-1" style={{ color: fullNameColor, fontFamily: fontFamily, ...rtlStyle }}>{t.extraDetailedSections}</h1>
                <ul style={{ fontFamily: fontFamily, ...rtlStyle }}>
                  {(resumeData.extraDetailedSection || []).map((extraDetail, index) => (
                    <li key={index} onMouseEnter={() => setHoveredExtraDetailedSection(index)} onMouseLeave={() => setHoveredExtraDetailedSection(null)} className={`relative transition-all duration-300 ${hoveredExtraDetailedSection === index ? 'mt-5 mb-5' : 'mt-1 mb-1'}`} style={{ fontFamily: fontFamily }}>
                      <div className={`flex items-center gap-1 font-bold text-[13px] ${hoveredExtraDetailedSection === index ? 'pt-2 pb-2' : 'pt-0 pb-0'}`} style={{ maxWidth: '95%', fontFamily: fontFamily }}>
                        <input
                          className="font-bold"
                          placeholder={t.extraDetailedSection}
                          value={extraDetail.title || ""}
                          onChange={(e) => handleExtraDetailedSectionChange(index, 'title', e.target.value, setResumeData, resumeData)}
                          style={{ color: fullNameColor, maxWidth: '100%', fontFamily: fontFamily }}
                        />
                      </div>
                      <textarea
                        className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
                        placeholder={t.details}
                        value={extraDetail.details ? extraDetail.details.join('\n') : ""}
                        onChange={(e) => {
                          const newDetails = e.target.value.split('\n');
                          handleExtraDetailedSectionChange(index, 'details', newDetails, setResumeData, resumeData);
                        }}
                        rows={4}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                        style={{ fontFamily: fontFamily }}
                      />
                      {hoveredExtraDetailedSection === index && (
                        <button
                          onClick={() => removeExtraDetailedSection(index, setResumeData, resumeData)}
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
                    extraDetailedSection: [...prevData.extraDetailedSection, { title: "", details: [""] }]
                  }))}
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-1/2"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreExtraDetailedSections}
                </button>
              </section>
            )}
          </section>
  
          {/* RIGHT COLUMN (previously LEFT COLUMN) */}
          <aside className="text-white w-[30%] flex flex-col gap-0 py-2" style={{ backgroundColor: fullNameColor, fontFamily: fontFamily, minHeight: '100%', ...rtlStyle }}>
            <div className="px-3">
              <textarea
                className="text-3xl font-semibold bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                name="fullName"
                placeholder={t.fullName}
                value={resumeData.fullName || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
                rows={1}
                style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
              />
              <textarea
                className="opacity-80 bg-transparent border-none outline-none text-white"
                name="professionalTitle"
                placeholder={t.professionalTitle}
                value={resumeData.professionalTitle || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
                rows={1}
                style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
              />
            </div>
  
            {/* Personal Info */}
            <section className="mt-2">
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
              >
                {t.personalInfo}
              </h1>
              <ul className="mt-1 px-3 max-w-[70%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                <li className="text-[13px]">
                  <span className="font-medium">{t.address}</span>
                  <input
                    className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none text-white"
                    name="location"
                    placeholder={t.location}
                    value={resumeData.location || ""}
                    onChange={(e) => handleInputChange(e, setResumeData)}
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
                  />
                </li>
                <li className="text-[13px]">
                  <span className="font-medium">{t.phoneNumber}</span>
                  <input
                    className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none text-white"
                    name="phone"
                    placeholder={t.phoneNumber}
                    value={resumeData.phone || ""}
                    onChange={(e) => handleInputChange(e, setResumeData)}
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
                  />
                </li>
                <li className="text-[13px]">
                  <span className="font-medium">{t.email}</span>
                  <input
                    className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none text-white"
                    name="email"
                    placeholder={t.email}
                    value={resumeData.email || ""}
                    onChange={(e) => handleInputChange(e, setResumeData)}
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
                  />
                </li>
                <li className="text-[13px]">
                  <span className="font-medium">{t.linkedin}</span>
                <input
                  className="text-[12px] opacity-80 flex flex-col bg-transparent border-none outline-none text-white"
                  name="linkedin"
                  placeholder={t.linkedin}
                  value={resumeData.linkedin || ""}
                  onChange={(e) => handleInputChange(e, setResumeData)}
                  style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", padding: "0", width: "100%", fontFamily: fontFamily, ...rtlStyle }}
                />
              </li>
            </ul>
          </section>

          {/* Skills */}
          <section className={`mt-1 relative group ${generatingSection === 'skills' ? 'generating' : ''}`}>
            <h1 className="text-[15px] py-1 px-3 font-medium"
              style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
            >
              {t.skills}
            </h1>
            <ul className="mt-1 px-2 w-[100%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
              {resumeData.skills.map((skill, index) => (
                <li
                  key={index}
                  className="text-[12px] opacity-80 flex justify-between relative group"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ fontFamily: fontFamily }}
                >
                  <input
                    className="bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                    placeholder={t.skill}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value, setResumeData, resumeData)}
                    style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
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
              className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-[95%]"
              style={{ fontFamily: fontFamily }}
            >
              {t.addMoreSkills}
            </button>
          </section>

          {/* Conditionally rendered sections */}
          {/* HOBBIES */}
          {sectionsVisibility.hobbies && (
            <section className={`mt-1 relative group ${generatingSection === 'hobbies' ? 'generating' : ''}`}>
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
              >
                {t.hobbies}
              </h1>
              <ul className="mt-1 px-2 w-[100%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                {resumeData.hobbies.map((hobby, index) => (
                  <li
                    key={index}
                    className="text-[12px] opacity-80 flex justify-between relative group"
                    onMouseEnter={() => setHoveredHobby(index)}
                    onMouseLeave={() => setHoveredHobby(null)}
                    style={{ fontFamily: fontFamily }}
                  >
                    <input
                      className="bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                      placeholder={t.hobby}
                      value={hobby}
                      onChange={(e) => handleHobbyChange(index, e.target.value, setResumeData, resumeData)}
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
                    />
                    {hoveredHobby === index && (
                      <button
                        onClick={() => removeHobby(index, setResumeData, resumeData)}
                        className="absolute bottom-[5px] right-[5px] text-red-500"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </li>
                ))}
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    hobbies: [...prevData.hobbies, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-[95%]"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreHobbies}
                </button>
              </ul>
            </section>
          )}

          {/* SOFTWARE */}
          {sectionsVisibility.software && (
            <section className="mt-1 relative group">
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
              >
                {t.software}
              </h1>
              <ul className="mt-1 px-2 w-[100%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                {resumeData.software.map((software, index) => (
                  <li
                    key={index}
                    className="text-[12px] opacity-80 flex justify-between relative group"
                    onMouseEnter={() => setHoveredSoftware(index)}
                    onMouseLeave={() => setHoveredSoftware(null)}
                    style={{ fontFamily: fontFamily }}
                  >
                    <input
                      className="bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                      placeholder={t.software}
                      value={software}
                      onChange={(e) => handleSoftwareChange(index, e.target.value, setResumeData, resumeData)}
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
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
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    software: [...prevData.software, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-[95%]"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreSoftware}
                </button>
              </ul>
            </section>
          )}

          {/* LANGUAGES */}
          {sectionsVisibility.languages && (
            <section className={`mt-1 relative group ${generatingSection === 'languages' ? 'generating' : ''}`}>
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
              >
                {t.languages}
              </h1>
              <ul className="mt-1 px-2 w-[100%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                {resumeData.languages.map((language, index) => (
                  <li
                    key={index}
                    className="text-[12px] opacity-80 flex justify-between relative group"
                    onMouseEnter={() => setHoveredLanguage(index)}
                    onMouseLeave={() => setHoveredLanguage(null)}
                    style={{ fontFamily: fontFamily }}
                  >
                    <input
                      className="bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                      placeholder={t.language}
                      value={language}
                      onChange={(e) => handleLanguageChange(index, e.target.value, setResumeData, resumeData)}
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
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
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    languages: [...prevData.languages, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-[95%]"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreLanguages}
                </button>
              </ul>
            </section>
          )}

          {/* EXTRA SECTIONS */}
          {sectionsVisibility.extraSection && (
            <section className={`mt-1 relative group ${generatingSection === 'extraSection' ? 'generating' : ''}`}>
              <h1 className="text-[15px] py-1 px-3 font-medium"
                style={{ backgroundColor: darkenedColor, fontFamily: fontFamily, ...rtlStyle }}
              >
                {t.extraSections}
              </h1>
              <ul className="mt-1 px-2 w-[100%] flex flex-col gap-1" style={{ fontFamily: fontFamily, ...rtlStyle }}>
                {resumeData.extraSection.map((extra, index) => (
                  <li
                    key={index}
                    className="text-[12px] opacity-80 flex justify-between relative group"
                    onMouseEnter={() => setHoveredExtra(index)}
                    onMouseLeave={() => setHoveredExtra(null)}
                    style={{ fontFamily: fontFamily }}
                  >
                    <input
                      className="bg-transparent border-none outline-none text-white w-11/12 resize-none overflow-hidden"
                      placeholder={t.extraSection}
                      value={extra}
                      onChange={(e) => handleExtraSectionChange(index, e.target.value, setResumeData, resumeData)}
                      style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", margin: "0", fontFamily: fontFamily, ...rtlStyle }}
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
                <button
                  onClick={() => setResumeData(prevData => ({
                    ...prevData,
                    extraSection: [...prevData.extraSection, ""]
                  }))}
                  className="hidden group-hover:block mx-auto mt-2 mb-2 bg-green-500 text-white font-bold py-1 px-2 rounded w-[95%]"
                  style={{ fontFamily: fontFamily }}
                >
                  {t.addMoreExtraSections}
                </button>
              </ul>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
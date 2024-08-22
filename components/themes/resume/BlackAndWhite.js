//Users/mohsinal/airesume-5/components/themes/resume/BlackAndWhite.js

import React, { useRef, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
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
} from "../../../lib/utils/resumeUtils";
import {
  useResumeDataEffect,
  useClickOutside,
  useTextareaResize,
  useTextareaAutoResize,
} from "../../../lib/hooks/useResumeHooks";
// import { useResumeDataEffect, useClickOutside, useTextareaResize, useTextareaAutoResize } from '../../../lib/hooks/useResumeHooks';
import { useLanguage } from "../../../contexts/LanguageContext";
import { displayedresumeThemesTranslations } from "../../../locales/displayedresumeThemesTranslations";

export default function BlackAndWhite({
  resumeData,
  setResumeData,
  fullNameColor, 
  fontFamily,
  sectionsVisibility,
  summaryRef: passedSummaryRef,
  setPassResumeData,
  print,
}) {
  useEffect(() => {
    document.title = "resume";
  }, []);
  console.log(fontFamily);

  const { language } = useLanguage();
  const t =
    displayedresumeThemesTranslations[language] ||
    displayedresumeThemesTranslations.en;
  const isRTL = language === "ar";
  const [hoveredStates, setHoveredStates] = useState({});
  const [regenerateFields, setRegenerateFields] = useState({});
  const [moreOptionsFields, setMoreOptionsFields] = useState({});
  const [summaryRegenerate, setSummaryRegenerate] = useState(false);
  const [regeneratingSummary, setRegeneratingSummary] = useState(false);

  const [summaryKeywords, setSummaryKeywords] = useState("");
  const [summarySpecificInstructions, setSummarySpecificInstructions] =
    useState("");
  const [generatingSection, setGeneratingSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const resumeRef = useRef(null);
  const defaultSummaryRef = useRef(null);
  const summaryRef = passedSummaryRef || defaultSummaryRef;

  useResumeDataEffect(resumeData, setResumeData, fontFamily);
  useClickOutside(
    hoveredStates.experience,
    summaryRegenerate,
    setRegenerateFields,
    setMoreOptionsFields,
    setSummaryRegenerate
  );
  useTextareaResize(resumeData, summaryRef);
  useTextareaAutoResize(resumeData);

  useEffect(() => {
    if (summaryRef.current) {
      adjustTextareaHeight(summaryRef.current);
    }
  }, [resumeData.summary]);

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".auto-expand");
    const adjustInputWidth = (input) => {
      input.style.width = "auto";
      input.style.width = `${input.scrollWidth}px`;
    };
    inputs.forEach((input) => {
      adjustInputWidth(input);
      input.addEventListener("input", () => adjustInputWidth(input));
    });
    return () =>
      inputs.forEach((input) =>
        input.removeEventListener("input", () => adjustInputWidth(input))
      );
  }, [resumeData]);

  const styles = {
    main: {
      width: "100%",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
      margin: "auto",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "10px",
      fontFamily: fontFamily,
      direction: isRTL ? "rtl" : "ltr", // Add RTL direction for Arabic
      textAlign: isRTL ? "right" : "left", // Align text to the right for RTL
    },
    generatingSection: {
      border: "2px solid green",
    },
    fullNameInput: {
      fontSize: "1.75rem",
      fontWeight: 500,
      display: "block",
      textAlign: "center",
      margin: "0 auto",
      marginTop: 0,
      paddingLeft: "10px",
      paddingRight: "10px",
      width: "70%",
    },
    professionalTitleInput: {
      fontSize: "1.25rem",
      display: "block",
      textAlign: "center",
      margin: "0 auto",
      marginTop: "0.25rem",
    },
    socialInfo: {
      display: "flex",
      alignItems: "center",
      gap: `${print ? "30px" : "0.25rem"}`,
      fontSize: "0.75rem",
      justifyContent: "center",
      fontWeight: 500,
      marginLeft: isRTL ? "0" : "5px",
      marginRight: isRTL ? "5px" : "0",
    },
    socialInfoItem: {
      display: "flex",
      alignItems: "center",
      width: `${print ? "fit-content" : "100%"}`,
      gap: `${print ? "10px" : "0%"}`,
      justifyContent: "center",
      backgroundColor: "white",
      marginBottom: "0.25rem",
      flexDirection: isRTL ? "row-reverse" : "row", // Reverse flex direction for RTL
    },
    autoExpand: {
      width: "auto",
      minWidth: "50px",
      maxWidth: "100%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      transition: "width 0.3s ease",
    },

    sectionTitle: {
      fontWeight: 700,
      borderBottom: "1px solid rgb(160, 159, 159)",
      marginBottom: "1px",
      paddingBottom: "2px",
    },
    summaryTextarea: {
      fontSize: "0.8rem",
      borderBottom: "1px solid rgb(212, 211, 211)",
      width: "100%",
      resize: "none",
      overflow: "hidden",
      marginBottom: "1px",
    },
    regenerateButton: {
      position: "absolute",
      top: "10px",
      right: "5px",
      backgroundColor: "white",
      border: "1px solid blue",
      color: "blue",
      padding: "2px 5px",
      borderRadius: "3px",
      fontSize: "0.7rem",
    },
    regenerateOptions: {
      position: "absolute",
      top: "30px",
      right: 0,
      backgroundColor: "white",
      border: "1px solid blue",
      padding: "5px",
      borderRadius: "3px",
      boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
      width: "250px",
      fontSize: "0.75rem",
    },
    experienceItem: {
      position: "relative",
      transition: "all 0.3s",
      marginBottom: "1px",
    },
    experienceItemContent: {
      display: "flex",
      alignItems: "center",
      gap: "0.25rem",
      fontWeight: 700,
      fontSize: "0.8rem",
      flexWrap: "wrap",
    },
    responsibilities: {
      marginLeft: "10px",
      fontSize: "0.75rem",
      lineHeight: "1.3",
      marginTop: "2px",
      paddingLeft: 0,
      position: "relative",
    },
    textarea: {
      width: "100%",
      fontSize: "0.75rem",
      lineHeight: "1.3",
      resize: "none",
      overflow: "hidden",
      minHeight: "20px",
      border: "none",
      padding: "0", // Ensure no padding adds extra space
    },
    addButton: {
      display: "block",
      margin: "10px auto",
      backgroundColor: "green",
      color: "white",
      fontWeight: 700,
      padding: "5px 10px",
      borderRadius: "3px",
      width: "40%",
      position: "relative",
      fontSize: "0.75rem",
    },
    removeButton: {
      position: "absolute",
      bottom: "2px",
      right: "2px",
      color: "red",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "2px",
    },
    skillItem: {
      padding: "2px 5px",
      border: `1px solid ${fullNameColor}`,
      borderRadius: "50px",
      background: "transparent",
      outline: "none",
      marginRight: "5px",
      marginTop: "2px",
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "nowrap",
      flexGrow: 1,
      boxSizing: "border-box",
      minWidth: "20px",
      maxWidth: "200px",
      fontSize: "0.75rem",
    },
    expandingInput: {
      minWidth: "20px",
      maxWidth: "300px",
      width: "auto",
      border: "none",
      background: "transparent",
      outline: "none",
      fontSize: "0.75rem",
    },
  };
  const generateSummary = () => {
    setRegeneratingSummary(true);
    // Simulating an API call or processing time
    setTimeout(() => {
      setResumeData((prevData) => ({
        ...prevData,
        summary: `Generated summary based on keywords: ${summaryKeywords} and instructions: ${summarySpecificInstructions}`,
      }));
      setRegeneratingSummary(false);
      setSummaryRegenerate(false);
    }, 2000);
  };

  const renderExpandingInput = (value, onChange, placeholder = "", style) => (
    <input
      style={{
        ...styles.expandingInput,
        ...style,
        textAlign: isRTL ? "right" : "left", // Align text to the right for RTL
      }}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      size={value ? value.length : placeholder.length}
    />
  );

  const renderExpandingExperienceInput = (
    value,
    onChange,
    placeholder = "",
    style
  ) => (
    <input
      style={{
        ...styles.expandingInput,
        ...style,
        minWidth: "20px",
        // maxWidth: style.maxWidth || "25%",
        width: style.maxWidth || "20%",
        textAlign: isRTL ? "right" : "left", // Align text to the right for RTL
        lineHeight: `${fontFamily === "Amiri Quran" ? "25px" : "inherit"}`,
      }}
      placeholder={placeholder}
      value={value || ""}
      onChange={onChange}
      size={value ? value.length : placeholder.length}
    />
  );

  const renderSection = (title, data, renderItem, addItem, sectionKey) => (
    <section
      style={{
        marginTop: "1px",
        position: "relative",
        paddingBottom: "2px",
        ...(hoveredSection === sectionKey
          ? {
              boxShadow: `0 0 5px ${fullNameColor}80`,
              border: `1px solid ${fullNameColor}`,
              borderRadius: "5px",
              padding: "5px",
            }
          : {}),
      }}
      onMouseEnter={() => setHoveredSection(sectionKey)}
      onMouseLeave={() => setHoveredSection(null)}
    >
      <h1
        style={{
          ...styles.sectionTitle,
          color: fullNameColor,
          fontSize: "1rem",
          marginBottom: "1px",
        }}
      >
        {title}
      </h1>
      <ul style={{ listStyleType: "none", paddingLeft: "0", margin: "0" }}>
        {data.map((item, index) => renderItem(item, index))}
      </ul>
      {hoveredSection === sectionKey && (
        <button
          onClick={addItem}
          style={{
            ...styles.addButton,
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            fontSize: "0.75rem",
            padding: "5px 10px",
          }}
        >
          {t.addMore} {title}
        </button>
      )}
    </section>
  );

  return (
    <div ref={resumeRef} style={{ padding: "1px" }}>
      <main
        style={{
          ...styles.main,
          ...(generatingSection ? styles.generatingSection : {}),
          height: `${print ? "1120px" : "fit-content"}`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          {!print ? (
            <>
              <input
                style={{ ...styles.fullNameInput, color: fullNameColor }}
                className="auto-expand"
                name="fullName"
                placeholder={t.fullName}
                value={resumeData.fullName || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
              />
              <input
                style={styles.professionalTitleInput}
                className={`auto-expand ${
                  fontFamily === "Amiri Quran" ? "h-[50px]" : ""
                }`}
                name="professionalTitle"
                placeholder={t.professionalTitle}
                value={resumeData.professionalTitle || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
              />
            </>
          ) : (
            <>
              <div
                style={{ ...styles.fullNameInput, color: fullNameColor }}
                // className="auto-expand"
              >
                {resumeData.fullName || ""}
              </div>
              <div style={styles.professionalTitleInput}>
                {resumeData.professionalTitle || ""}
              </div>
            </>
          )}{" "}
        </div>

        <div style={styles.socialInfo}>
          <div style={styles.socialInfoItem} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{
                width: "0.75rem",
                height: "0.75rem",
                flexShrink: 0,
                marginTop: "px",
              }}
              viewBox="0 0 24 24"
              className={fontFamily === "Amiri Quran" ? "mt-2" : "-mt-1"}
            >
              <path
                fill={fullNameColor}
                d="M22 3.47v17.06A1.47 1.47 0 0120.53 22H3.47A1.47 1.47 0 012 20.53V3.47A1.47 1.47 0 013.47 2h17.06A1.47 1.47 0 0122 3.47zM7.882 9.648h-2.94v9.412h2.94V9.647zm.265-3.235a1.694 1.694 0 00-1.682-1.706h-.053a1.706 1.706 0 000 3.412 1.694 1.694 0 001.735-1.653v-.053zm10.912 6.93c0-2.83-1.8-3.93-3.588-3.93a3.353 3.353 0 00-2.977 1.517h-.082V9.647H9.647v9.412h2.941v-5.006a1.953 1.953 0 011.765-2.106h.112c.935 0 1.63.588 1.63 2.07v5.042h2.94l.024-5.718z"
              ></path>
            </svg>
            {!print ? (
              <input
                style={styles.autoExpand}
                className="auto-expand"
                name="linkedin"
                placeholder={t.linkedinPlaceholder}
                value={
                  resumeData.linkedin
                    ? resumeData.linkedin.includes("linkedin.com")
                      ? "/in/" + resumeData.linkedin.split("/in/")[1]
                      : resumeData.linkedin
                    : ""
                }
                onChange={(e) => {
                  const value = e.target.value;
                  const newValue = value.startsWith("/in/")
                    ? "https://www.linkedin.com" + value
                    : value;
                  handleInputChange(
                    { target: { name: "linkedin", value: newValue } },
                    setResumeData
                  );
                }}
                onClick={(e) => {
                  if (
                    resumeData.linkedin &&
                    resumeData.linkedin.includes("linkedin.com")
                  ) {
                    e.preventDefault();
                    window.open(resumeData.linkedin, "_blank");
                  }
                }}
              />
            ) : (
              <div style={styles.autoExpand} className="auto-expan bg-white">
                {resumeData.linkedin
                  ? resumeData.linkedin.includes("linkedin.com")
                    ? "/in/" + resumeData.linkedin.split("/in/")[1]
                    : resumeData.linkedin
                  : ""}
              </div>
            )}
          </div>
          <div style={styles.socialInfoItem} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{
                width: "0.75rem",
                height: "0.75rem",
                flexShrink: 0,
                marginTop: "px",
              }}
              viewBox="0 0 24 24"
              className={fontFamily === "Amiri Quran" ? "mt-2" : "-mt-1"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                style={{ fill: fullNameColor }}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                style={{ fill: fullNameColor }}
              />
            </svg>
            {!print ? (
              <input
                style={styles.autoExpand}
                className="auto-expand"
                name="location"
                placeholder={t.locationPlaceholder}
                value={resumeData.location || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
              />
            ) : (
              <div style={styles.autoExpand} className="auto-expan bg-white">
                {resumeData.location || ""}
              </div>
            )}
          </div>
          <div style={styles.socialInfoItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{
                width: "0.75rem",
                height: "0.75rem",
                flexShrink: 0,
                marginTop: "px",
              }}
              viewBox="0 0 24 24"
              className={fontFamily === "Amiri Quran" ? "mt-2" : "-mt-1"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.970c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                style={{ fill: fullNameColor }}
              />
            </svg>
            {!print ? (
              <input
                style={styles.autoExpand}
                className="auto-expand"
                name="phone"
                placeholder={t.phonePlaceholder}
                value={resumeData.phone || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
              />
            ) : (
              <div style={styles.autoExpand} className="auto-expad">
                {resumeData.phone || ""}
              </div>
            )}
          </div>
          <div style={styles.socialInfoItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              style={{
                width: "0.75rem",
                height: "0.75rem",
                flexShrink: 0,
                marginTop: "px",
              }}
              viewBox="0 0 24 24"
              className={fontFamily === "Amiri Quran" ? "mt-2" : "-mt-1"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                style={{ fill: fullNameColor }}
              />
            </svg>
            {!print ? (
              <input
                style={styles.autoExpand}
                className="auto-expand"
                name="email"
                placeholder={t.emailPlaceholder}
                value={resumeData.email || ""}
                onChange={(e) => handleInputChange(e, setResumeData)}
              />
            ) : (
              <div style={styles.autoExpand} className="auto-expan">
                {resumeData.email || ""}
              </div>
            )}
          </div>
        </div>

        <section
          className={`relative group ${
            generatingSection === "summary" ? "generating" : ""
          }`}
          onMouseEnter={() => setHoveredSection("summary")}
          onMouseLeave={() => setHoveredSection(null)}
          style={{
            ...(hoveredSection === "summary"
              ? {
                  boxShadow: `0 0 10px ${fullNameColor}80`,
                  border: `1px solid ${fullNameColor}`,
                  borderRadius: "5px",
                  padding: "10px",
                }
              : {}),
          }}
        >
          <h1 style={{ ...styles.sectionTitle, color: fullNameColor }}>
            {t.summary}
          </h1>
          {!print ? (
            <textarea
              ref={summaryRef}
              style={styles.summaryTextarea}
              name="summary"
              // className="bg-red-300"
              placeholder={t.summaryPlaceholder}
              value={resumeData.summary || ""}
              onChange={(e) => {
                handleInputChange(e, setResumeData);
                adjustTextareaHeight(e.target);
              }}
              onInput={(e) => adjustTextareaHeight(e.target)}
            />
          ) : (
            <div style={styles.summaryTextarea} className="pb-2">
              {resumeData.summary || ""}
            </div>
          )}
          {hoveredSection === "summary" && (
            <button
              onClick={() => setSummaryRegenerate(!summaryRegenerate)}
              className="absolute top-[15px] right-[5px] bg-white border border-blue-500 text-blue-500 px-2 py-1 rounded"
            >
              {t.regenerate}
            </button>
          )}
          {summaryRegenerate && (
            <div
              id="summary-regenerate"
              className="absolute top-[40px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96"
            >
              <div className="flex items-center mb-2">
                <label className="w-1/3 text-sm">{t.keywords}</label>
                <input
                  type="text"
                  placeholder={t.keywords}
                  className="w-2/3 border px-2 py-1 rounded"
                  value={summaryKeywords}
                  onChange={(e) => setSummaryKeywords(e.target.value)}
                />
              </div>
              <div className="flex items-center mb-2">
                <label className="w-1/3 text-sm">
                  {t.specificInstructions}
                </label>

                {!print ? (
                  <textarea
                    placeholder={t.specificInstructions}
                    className="w-2/3 border px-2 py-1 rounded"
                    value={summarySpecificInstructions}
                    onChange={(e) =>
                      setSummarySpecificInstructions(e.target.value)
                    }
                  />
                ) : (
                  <div className="w-2/3 border px-2 py-1 rounded">
                    {summarySpecificInstructions}
                  </div>
                )}
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={generateSummary}
                disabled={regeneratingSummary}
              >
                {regeneratingSummary ? t.generating : t.generate}
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

        {renderSection(
          t.experience,
          resumeData.experiences || [],
          (experience, index) => (
            <li
              key={index}
              onMouseEnter={() =>
                setHoveredStates((prev) => ({ ...prev, experience: index }))
              }
              onMouseLeave={() =>
                setHoveredStates((prev) => ({ ...prev, experience: null }))
              }
              style={{
                ...styles.experienceItem,
                ...(hoveredStates.experience === index
                  ? {
                      boxShadow: `0 0 10px ${fullNameColor}80`,
                      border: `1px solid ${fullNameColor}`,
                      borderRadius: "5px",
                      padding: "5px",
                    }
                  : {}),
                marginTop: "0",
                marginBottom: "0",
                width: "100%",
                direction: isRTL ? "rtl" : "ltr", // Add RTL direction for Arabic
              }}
            >
              <div
                style={{
                  ...styles.experienceItemContent,
                  padding: "5px 0",
                }}
              >
                {renderExpandingExperienceInput(
                  experience.position,
                  (e) =>
                    handleExperienceChange(
                      index,
                      "position",
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.position,
                  { fontWeight: "bold", color: fullNameColor, maxWidth: "23%" }
                )}

                <p>|</p>

                {renderExpandingExperienceInput(
                  experience.company,
                  (e) =>
                    handleExperienceChange(
                      index,
                      "company",
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.company,
                  { fontWeight: "bold", maxWidth: "23%" }
                )}
                <p>|</p>

                {renderExpandingExperienceInput(
                  experience.location,
                  (e) =>
                    handleExperienceChange(
                      index,
                      "location",
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.location,
                  { fontWeight: "bold", color: fullNameColor, maxWidth: "23%" }
                )}
                <p>|</p>

                {renderExpandingExperienceInput(
                  experience.duration,
                  (e) =>
                    handleExperienceChange(
                      index,
                      "duration",
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.duration,
                  { fontWeight: "bold", maxWidth: "23%" }
                )}
              </div>
              <div
                style={{
                  ...styles.responsibilities,
                  marginTop: "0",
                  marginBottom: "0",
                }}
              >
                {!print ? (
                  <textarea
                    style={{
                      ...styles.textarea,
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                    placeholder={t.responsibilities}
                    value={
                      experience.responsibilities
                        ? experience.responsibilities.join("\n")
                        : ""
                    }
                    onChange={(e) => {
                      const newResponsibilities = e.target.value.split("\n");
                      handleExperienceChange(
                        index,
                        "responsibilities",
                        newResponsibilities,
                        setResumeData,
                        resumeData
                      );
                    }}
                    rows={4}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                ) : (
                  <div
                    style={{
                      ...styles.textarea,
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    {experience?.responsibilities?.map((item, index) => (
                      <>
                        {item}
                        <br />
                        {index === experience?.responsibilities?.length - 1 ? (
                          <>
                            <br />
                          </>
                        ) : null}
                      </>
                    ))}
                  </div>
                )}
              </div>
              {hoveredStates.experience === index && (
                <>
                  <button
                    onClick={() =>
                      removeExperience(index, setResumeData, resumeData)
                    }
                    style={{
                      ...styles.removeButton,
                      bottom: "5px",
                      right: "5px",
                    }}
                  >
                    <FaTrash style={{ width: "1rem", height: "1rem" }} />
                  </button>
                  <button
                    onClick={() =>
                      setRegenerateFields((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: "-25px",
                      right: "5px",
                      background: "white",
                      border: "1px solid blue",
                      color: "blue",
                      padding: "2px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {t.regenerate}
                  </button>
                  {regenerateFields[index] && (
                    <div
                      id={`regenerate-${index}`}
                      className="absolute top-[10px] right-0 bg-white border border-blue-500 p-2 rounded shadow-lg w-96"
                    >
                      <div className="flex items-center mb-2">
                        <label className="w-1/3 text-sm">{t.keywords}</label>
                        <input
                          type="text"
                          placeholder={t.keywords}
                          className="w-2/3 border px-2 py-1 rounded"
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <label className="w-1/3 text-sm">
                          {t.specificInstructions}
                        </label>

                        <textarea
                          placeholder={t.specificInstructions}
                          className="w-2/3 border px-2 py-1 rounded"
                        />
                      </div>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded">
                        {t.generate}
                      </button>
                      <button
                        onClick={() =>
                          setRegenerateFields((prevState) => ({
                            ...prevState,
                            [index]: false,
                          }))
                        }
                        className="text-gray-500 mt-2"
                      >
                        {t.close}
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() =>
                      setMoreOptionsFields((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }))
                    }
                    style={{
                      position: "absolute",
                      top: "-25px",
                      left: "5px",
                      background: "white",
                      border: "1px solid green",
                      color: "green",
                      padding: "2px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {t.moreOptions}
                  </button>
                  {moreOptionsFields[index] && (
                    <div
                      id={`more-options-${index}`}
                      className="absolute top-[10px] left-0 bg-white border border-green-500 p-2 rounded shadow-lg w-96"
                    >
                      <div className="flex items-center mb-2">
                        <label className="w-1/3 text-sm">
                          {t.bulletPointLength}
                        </label>
                        <input
                          type="text"
                          placeholder={t.bulletPointLength}
                          className="w-2/3 border px-2 py-1 rounded"
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <label className="w-1/3 text-sm">
                          {t.specificActionVerbs}
                        </label>
                        <input
                          type="text"
                          placeholder={t.specificActionVerbs}
                          className="w-2/3 border px-2 py-1 rounded"
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <label className="w-1/3 text-sm">
                          {t.specificAchievements}
                        </label>
                        <input
                          type="text"
                          placeholder={t.specificAchievements}
                          className="w-2/3 border px-2 py-1 rounded"
                        />
                      </div>
                      <button className="bg-green-500 text-white px-2 py-1 rounded">
                        {t.save}
                      </button>
                      <button
                        onClick={() =>
                          setMoreOptionsFields((prevState) => ({
                            ...prevState,
                            [index]: false,
                          }))
                        }
                        className="text-gray-500 mt-2"
                      >
                        {t.close}
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ),
          () =>
            setResumeData((prevData) => ({
              ...prevData,
              experiences: [
                ...prevData.experiences,
                {
                  position: "",
                  company: "",
                  location: "",
                  duration: "",
                  responsibilities: [],
                },
              ],
            })),
          "experience"
        )}

        {/* Education Section */}
        {renderSection(
          t.education,
          resumeData.education || [],
          (edu, index) => (
            <li
              key={index}
              onMouseEnter={() =>
                setHoveredStates((prev) => ({ ...prev, education: index }))
              }
              onMouseLeave={() =>
                setHoveredStates((prev) => ({ ...prev, education: null }))
              }
              style={{
                position: "relative",
                marginBottom: "1px",
                ...(hoveredStates.education === index
                  ? {
                      boxShadow: `0 0 10px ${fullNameColor}80`,
                      border: `1px solid ${fullNameColor}`,
                      borderRadius: "5px",
                      padding: "5px",
                    }
                  : {}),
                direction: isRTL ? "rtl" : "ltr", // Add RTL direction for Arabic
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1px",
                }}
              >
                <input
                  style={{
                    fontWeight: "bold",
                    width: "60%",
                  }}
                  placeholder={t.institution}
                  value={edu.institution || ""}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "institution",
                      e.target.value,
                      setResumeData,
                      resumeData
                    )
                  }
                />
                {!print ? (
                  <input
                    style={{ color: fullNameColor, marginLeft: "20px" }}
                    placeholder={t.year}
                    value={edu.year || ""}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        "year",
                        e.target.value,
                        setResumeData,
                        resumeData
                      )
                    }
                  />
                ) : null}
              </div>
              {!print ? (
                <input
                  style={{
                    fontStyle: "italic",
                    marginLeft: "10px",
                    width: "50%",
                  }}
                  placeholder={t.degree}
                  value={edu.degree || ""}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      "degree",
                      e.target.value,
                      setResumeData,
                      resumeData
                    )
                  }
                />
              ) : (
                <div
                  style={{
                    fontStyle: "italic",
                    marginLeft: "10px",
                    width: "fit-content",
                  }}
                >
                  {edu.degree || ""}
                </div>
              )}
              {hoveredStates.education === index && (
                <button
                  onClick={() =>
                    removeEducation(index, setResumeData, resumeData)
                  }
                  style={styles.removeButton}
                >
                  <FaTrash style={{ width: "1rem", height: "1rem" }} />
                </button>
              )}
            </li>
          ),
          () =>
            setResumeData((prevData) => ({
              ...prevData,
              education: [
                ...prevData.education,
                { institution: "", year: "", degree: "" },
              ],
            })),
          "education"
        )}

        {/* Skills Section */}
        {renderSection(
          t.skills,
          resumeData.skills,
          (skill, index) => (
            <div
              key={index}
              style={{
                ...styles.skillItem,
                ...(hoveredStates.skill === index
                  ? {
                      boxShadow: `0 0 5px ${fullNameColor}80`,
                      border: `1px solid ${fullNameColor}`,
                    }
                  : {}),
                direction: isRTL ? "rtl" : "ltr", // Add RTL direction for Arabic
                lineHeight: `${
                  fontFamily === "Amiri Quran" ? "30px" : "inherit"
                }`,
              }}
              onMouseEnter={() =>
                setHoveredStates((prev) => ({ ...prev, skill: index }))
              }
              onMouseLeave={() =>
                setHoveredStates((prev) => ({ ...prev, skill: null }))
              }
            >
              {renderExpandingInput(
                skill,
                (e) =>
                  handleSkillChange(
                    index,
                    e.target.value,
                    setResumeData,
                    resumeData
                  ),
                t.skill
              )}
              {hoveredStates.skill === index && (
                <button
                  onClick={() => removeSkill(index, setResumeData, resumeData)}
                  style={{
                    ...styles.removeButton,
                    position: "static",
                    marginLeft: "5px",
                  }}
                >
                  <FaTrash style={{ width: "0.75rem", height: "0.75rem" }} />
                </button>
              )}
            </div>
          ),
          () =>
            setResumeData((prevData) => ({
              ...prevData,
              skills: [...prevData.skills, ""],
            })),
          "skills"
        )}

        {sectionsVisibility.hobbies &&
          renderSection(
            t.hobbies,
            resumeData.hobbies || [],
            (hobby, index) => (
              <div
                key={index}
                style={{
                  ...styles.skillItem,
                  ...(hoveredStates.hobby === index
                    ? {
                        boxShadow: `0 0 5px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                      }
                    : {}),
                }}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({ ...prev, hobby: index }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, hobby: null }))
                }
              >
                {renderExpandingInput(
                  hobby || "",
                  (e) =>
                    handleHobbyChange(
                      index,
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.hobby
                )}
                {hoveredStates.hobby === index && (
                  <button
                    onClick={() =>
                      removeHobby(index, setResumeData, resumeData)
                    }
                    style={{
                      ...styles.removeButton,
                      position: "static",
                      marginLeft: "5px",
                    }}
                  >
                    <FaTrash style={{ width: "0.75rem", height: "0.75rem" }} />
                  </button>
                )}
              </div>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                hobbies: [...prevData.hobbies, ""],
              })),
            "hobbies"
          )}
        {sectionsVisibility.software &&
          renderSection(
            t.software,
            resumeData.software || [],
            (software, index) => (
              <div
                key={index}
                style={{
                  ...styles.skillItem,
                  ...(hoveredStates.software === index
                    ? {
                        boxShadow: `0 0 5px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                      }
                    : {}),
                }}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({ ...prev, software: index }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, software: null }))
                }
              >
                {renderExpandingInput(
                  software || "",
                  (e) =>
                    handleSoftwareChange(
                      index,
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.software
                )}
                {hoveredStates.software === index && (
                  <button
                    onClick={() =>
                      removeSoftware(index, setResumeData, resumeData)
                    }
                    style={{
                      ...styles.removeButton,
                      position: "static",
                      marginLeft: "5px",
                    }}
                  >
                    <FaTrash style={{ width: "0.75rem", height: "0.75rem" }} />
                  </button>
                )}
              </div>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                software: [...prevData.software, ""],
              })),
            "software"
          )}

        {sectionsVisibility.languages &&
          renderSection(
            t.languages,
            resumeData.languages || [],
            (language, index) => (
              <div
                key={index}
                style={{
                  ...styles.skillItem,
                  ...(hoveredStates.language === index
                    ? {
                        boxShadow: `0 0 5px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                      }
                    : {}),
                }}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({ ...prev, language: index }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, language: null }))
                }
              >
                {renderExpandingInput(
                  language || "",
                  (e) =>
                    handleLanguageChange(
                      index,
                      e.target.value,
                      setResumeData,
                      resumeData
                    ),
                  t.language
                )}
                {hoveredStates.language === index && (
                  <button
                    onClick={() =>
                      removeLanguage(index, setResumeData, resumeData)
                    }
                    style={{
                      ...styles.removeButton,
                      position: "static",
                      marginLeft: "5px",
                    }}
                  >
                    <FaTrash style={{ width: "0.75rem", height: "0.75rem" }} />
                  </button>
                )}
              </div>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                languages: [...prevData.languages, ""],
              })),
            "languages"
          )}

        {sectionsVisibility.certificates &&
          renderSection(
            t.certificates,
            resumeData.certificates || [],
            (certificate, index) => (
              <li
                key={index}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({ ...prev, certificate: index }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, certificate: null }))
                }
                style={{
                  position: "relative",
                  marginBottom: "1px",
                  ...(hoveredStates.certificate === index
                    ? {
                        boxShadow: `0 0 10px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                        borderRadius: "5px",
                        padding: "5px",
                      }
                    : {}),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1px",
                  }}
                >
                  {renderExpandingInput(
                    certificate.name || "",
                    (e) =>
                      handleCertificateChange(
                        index,
                        "name",
                        e.target.value,
                        setResumeData,
                        resumeData
                      ),
                    t.certificate
                  )}
                  <input
                    style={{ color: fullNameColor, marginLeft: "20px" }}
                    placeholder={t.year}
                    value={certificate.year || ""}
                    onChange={(e) =>
                      handleCertificateChange(
                        index,
                        "year",
                        e.target.value,
                        setResumeData,
                        resumeData
                      )
                    }
                  />
                </div>
                {hoveredStates.certificate === index && (
                  <button
                    onClick={() =>
                      removeCertificate(index, setResumeData, resumeData)
                    }
                    style={styles.removeButton}
                  >
                    <FaTrash style={{ width: "1rem", height: "1rem" }} />
                  </button>
                )}
              </li>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                certificates: [
                  ...prevData.certificates,
                  { name: "", year: "" },
                ],
              })),
            "certificates"
          )}

        {sectionsVisibility.extraSection &&
          renderSection(
            t.extraSections,
            resumeData.extraSection || [],
            (extra, index) => (
              <li
                key={index}
                style={{
                  position: "relative",
                  marginBottom: "1px",
                  ...(hoveredStates.extra === index
                    ? {
                        boxShadow: `0 0 10px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                        borderRadius: "5px",
                        padding: "5px",
                      }
                    : {}),
                }}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({ ...prev, extra: index }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, extra: null }))
                }
              >
                <input
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid #ccc",
                    outline: "none",
                  }}
                  placeholder={t.extraSection}
                  value={extra || ""}
                  onChange={(e) =>
                    handleExtraSectionChange(
                      index,
                      e.target.value,
                      setResumeData,
                      resumeData
                    )
                  }
                />
                {hoveredStates.extra === index && (
                  <button
                    onClick={() =>
                      removeExtraSection(index, setResumeData, resumeData)
                    }
                    style={styles.removeButton}
                  >
                    <FaTrash style={{ width: "1rem", height: "1rem" }} />
                  </button>
                )}
              </li>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                extraSection: [...prevData.extraSection, ""],
              })),
            "extraSection"
          )}

        {sectionsVisibility.extraDetailedSection &&
          renderSection(
            t.extraDetailedSections,
            resumeData.extraDetailedSection || [],
            (extraDetail, index) => (
              <li
                key={index}
                style={{
                  position: "relative",
                  marginBottom: "1px",
                  ...(hoveredStates.extraDetailed === index
                    ? {
                        boxShadow: `0 0 10px ${fullNameColor}80`,
                        border: `1px solid ${fullNameColor}`,
                        borderRadius: "5px",
                        padding: "10px",
                      }
                    : {}),
                }}
                onMouseEnter={() =>
                  setHoveredStates((prev) => ({
                    ...prev,
                    extraDetailed: index,
                  }))
                }
                onMouseLeave={() =>
                  setHoveredStates((prev) => ({ ...prev, extraDetailed: null }))
                }
              >
                <input
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    border: "none",
                    borderBottom: "1px solid #ccc",
                    outline: "none",
                    fontSize: "1rem",
                    marginBottom: "1px",
                  }}
                  placeholder={t.extraDetailedSectionTitle}
                  value={extraDetail.title || ""}
                  onChange={(e) =>
                    handleExtraDetailedSectionChange(
                      index,
                      "title",
                      e.target.value,
                      setResumeData,
                      resumeData
                    )
                  }
                />
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    marginTop: "1px",
                  }}
                >
                  {(extraDetail.details || []).map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      style={{ position: "relative", marginBottom: "1px" }}
                      onMouseEnter={() =>
                        setHoveredStates((prev) => ({
                          ...prev,
                          extraDetailedDetail: {
                            sectionIndex: index,
                            detailIndex,
                          },
                        }))
                      }
                      onMouseLeave={() =>
                        setHoveredStates((prev) => ({
                          ...prev,
                          extraDetailedDetail: null,
                        }))
                      }
                    >
                      {!print ? (
                        <textarea
                          style={{
                            width: "100%",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            outline: "none",
                            resize: "vertical",
                            minHeight: "24px",
                            fontSize: "0.9rem",
                          }}
                          placeholder={t.detail}
                          value={detail || ""}
                          onChange={(e) =>
                            handleExtraDetailedSectionDetailChange(
                              index,
                              detailIndex,
                              e.target.value,
                              setResumeData,
                              resumeData
                            )
                          }
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            outline: "none",
                            resize: "vertical",
                            minHeight: "24px",
                            fontSize: "0.9rem",
                          }}
                        >
                          {detail || ""}
                        </div>
                      )}

                      {hoveredStates.extraDetailedDetail &&
                        hoveredStates.extraDetailedDetail.sectionIndex ===
                          index &&
                        hoveredStates.extraDetailedDetail.detailIndex ===
                          detailIndex && (
                          <button
                            onClick={() =>
                              removeExtraDetailedSectionDetail(
                                index,
                                detailIndex,
                                setResumeData,
                                resumeData
                              )
                            }
                            style={{
                              position: "absolute",
                              right: "-25px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              color: "red",
                            }}
                          >
                            <FaTrash
                              style={{ width: "0.75rem", height: "0.75rem" }}
                            />
                          </button>
                        )}
                    </li>
                  ))}
                </ul>
                {hoveredStates.extraDetailed === index && (
                  <>
                    <button
                      onClick={() =>
                        addExtraDetailedSectionDetail(
                          index,
                          setResumeData,
                          resumeData
                        )
                      }
                      style={{
                        display: "block",
                        color: "green",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginTop: "1px",
                      }}
                    >
                      {t.addMoreDetails}
                    </button>
                    <button
                      onClick={() =>
                        removeExtraDetailedSection(
                          index,
                          setResumeData,
                          resumeData
                        )
                      }
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "red",
                      }}
                    >
                      <FaTrash style={{ width: "1rem", height: "1rem" }} />
                    </button>
                  </>
                )}
              </li>
            ),
            () =>
              setResumeData((prevData) => ({
                ...prevData,
                extraDetailedSection: [
                  ...prevData.extraDetailedSection,
                  { title: "", details: [""] },
                ],
              })),
            "extraDetailedSection"
          )}
      </main>
    </div>
  );
}

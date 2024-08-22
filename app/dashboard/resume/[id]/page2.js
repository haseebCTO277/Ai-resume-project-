//Users/mohsinal/airesume-5/app/dashboard/resume/[id]/page.js

'use client';

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from 'styled-components';
import { Button } from "@/components/ui/button";
import { FaDownload, FaLinkedin, FaSave } from 'react-icons/fa';
import BlackAndWhite from "@/components/themes/resume/BlackAndWhite";
import BlueAndWhite from "@/components/themes/resume/BlueAndWhite";
import WhiteAndBlue from "@/components/themes/resume/WhiteAndBlue";
import OceanTheme from "@/components/themes/resume/OceanTheme"; 
import EditorActions from "../../EditorActions";
import ResumeNav from "../../ResumeNav";
import ColorPicker from "@/components/ColorPicker";
import ResumeSideNav from "../../ResumeSideNav";
import ReactModal from 'react-modal';
import ButtonCheckout from "@/components/ButtonCheckout";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ThemePdf from "@/components/themes/resume/pdf";
import { useLanguage } from '../../../../contexts/LanguageContext';
import { resumeTranslations } from '../../../../locales/resumeTranslations';
import LanguageToggle from "@/components/LanguageToggle";


const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
  width: 100vw;
  padding-top: 70px; // Add padding to account for the fixed navbar
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  width: 100%;
  max-width: 250px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 100%;
    width: 200px;  // Set width to 200px on small screens
    flex-direction: column;  // Stack icon and text vertically
    padding: 0.5rem;  // Adjust padding for the new layout
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);

  &::after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #ffffff;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LinkedInDropdown = styled.div`
  position: absolute;
  top: 100%;
  width: 300px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 10;
`;

const LinkedInInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
`;

const LinkedInExample = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 1rem;
`;

const DropdownButton = styled(StyledButton)`
  margin-top: 0.5rem;
`;

const LinkedInButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 250px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 2rem;
  overflow-y: auto; // Enable vertical scrolling for content

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ResumeSideNavContainer = styled.div`
  width: 200px;
  margin-right: 2rem;
  order: -1; // This ensures it always stays on the left

  @media (max-width: 768px) {
    width: 1px;
    margin-right: 0;
    padding: 0;
  }
`;

const ResumeContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const MobileSideNav = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background: #fff;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    transform: translateX(-100%);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(0);
    }
  }
`;

const CloseButton = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    align-self: flex-end;
    margin: 1rem;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const CheckboxLabel = styled.label`
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
`;

const DropdownItemStyled = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const StatusMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => props.visible ? 1 : 0};
  background-color: ${props => props.type === 'success' ? '#4CAF50' : '#F44336'};
  color: white;
`;

const NavWrapper = styled.div`
  margin-bottom: 2px;
`;

export default function ResumePage({ params }) {
  const { id } = params;
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;

  const [resume, setResume] = useState({
    fullName: "Mohsin Alshammari",
    professionalTitle: "",
    linkedin: "",
    location: "",
    phone: "",
    email: "",
    summary: "",
    experiences: Array(1).fill({ position: "", company: "", location: "", duration: "", responsibilities: Array(5).fill('') }),
    education: Array(1).fill({ institution: "", graduationYear: "", degree: "" }),
    skills: Array(5).fill(""),
    hobbies: Array(1).fill(""),
    software: Array(1).fill(""),
    languages: Array(1).fill(""),
    certificates: Array(1).fill({ name: "", year: "" }),
    extraSection: Array(1).fill(""),
    extraDetailedSection: Array(1).fill({ title: "", details: Array(1).fill("") }),
    resumeColor: "#000000",
    fontFamily: "Times New Roman",
    age: 0,
    theme: "BlackAndWhite",
    sectionsVisibility: {
      hobbies: false,
      software: false,
      extraSection: false,
      certificates: false,
      languages: false,
      extraDetailedSection: false,
    },
  });
  const [showLinkedInDropdown, setShowLinkedInDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [linkedinProfileUrl, setLinkedinProfileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullNameColor, setFullNameColor] = useState('#000000');
  const [hoveredColor, setHoveredColor] = useState(resume.resumeColor);
  const [hoveredFont, setHoveredFont] = useState(resume.fontFamily);
  const [selectedFont, setSelectedFont] = useState(resume.fontFamily);
  const [selectedTheme, setSelectedTheme] = useState(resume.theme);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [mobileSideNavOpen, setMobileSideNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const resumeRef = useRef(null);
  const summaryRef = useRef(null);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '', visible: false });

  const colors = [
    "#8C1515", "#A41034", "#C70039", "#FF5733", "#900C3F",
    "#005430", "#33FF57", "#33FFA1", "#00FF7F", "#32CD32",
    "#002147", "#2774AE", "#3357FF", "#0000FF", "#87CEEB",
    "#FFD100", "#FFC300", "#FF851B", "#FFA500", "#FFD700",
    "#000000", "#333333", "#666666", "#999999", "#CCCCCC",
    "#581845", "#800080", "#A133FF", "#9370DB", "#D8BFD8"
  ];
  
  const fonts = [
    "Times New Roman", "Arial", "Verdana", 
    "Georgia", "Trebuchet MS", "Comic Sans MS",
    "Tahoma", "Alex Brush", "Arima", "Anton SC", "Amiri", "Zain"
  ];
  
  

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resumes/${id}`, { withCredentials: true });
        const resumeData = response.data.data;
        setResume(resumeData);
        setFullNameColor(resumeData.resumeColor || "#000000");
        setHoveredColor(resumeData.resumeColor || "#000000");
        setSelectedFont(resumeData.fontFamily || "Times New Roman");
        setHoveredFont(resumeData.fontFamily || "Times New Roman");
        setSelectedTheme(resumeData.theme || "BlackAndWhite");
        setSectionsVisibility(resumeData.sectionsVisibility || {
          hobbies: false,
          software: false,
          extraSection: false,
          certificates: false,
          languages: false,
          extraDetailedSection: false,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(t.error);
        setLoading(false);
      }
    };

    fetchResume();
  }, [id, t.error]);

  const handleChange = (e) => {
    saveToUndoStack();
    setIsDirty(true);
    setResume((prevResume) => {
      const newResume = { ...prevResume, [e.target.name]: e.target.value };
      updateColorsAndFonts(newResume);
      return newResume;
    });
  };

  const saveToUndoStack = () => {
    setUndoStack((prevStack) => [...prevStack, { ...resume }]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack.pop();
      setRedoStack((prevStack) => [resume, ...prevStack]);
      setResume(lastState);
      updateColorsAndFonts(lastState);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.shift();
      setUndoStack((prevStack) => [...prevStack, resume]);
      setResume(nextState);
      updateColorsAndFonts(nextState);
    }
  };

  const showStatusMessage = (text, type) => {
    setStatusMessage({ text: t.statusMessages[text] || text, type, visible: true });
    setTimeout(() => setStatusMessage(prev => ({ ...prev, visible: false })), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveResume(resume);
      setIsDirty(false);
      showStatusMessage("Resume saved successfully!", "success");
    } catch (error) {
      console.error("Error saving resume:", error);
      showStatusMessage("Failed to save resume. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const saveResume = async (updatedResume) => {
    try {
      const response = await axios.put(`/api/resumes/${id}`, updatedResume, { withCredentials: true });
      setResume(response.data.data);
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  };

  const handleColorChange = (color) => {
    saveToUndoStack();
    setIsDirty(true);
    setHoveredColor(color);
    setFullNameColor(color);
    setResume((prevResume) => {
      const newResume = { ...prevResume, resumeColor: color };
      updateColorsAndFonts(newResume);
      return newResume;
    });
  };

  const handleFontHover = (font) => {
    setHoveredFont(font);
  };

  const handleFontSelect = (font) => {
    saveToUndoStack();
    setIsDirty(true);
    setSelectedFont(font);
    setHoveredFont(font);
    setResume((prevResume) => {
      const newResume = { ...prevResume, fontFamily: font };
      updateColorsAndFonts(newResume);
      return newResume;
    });
  };

  const handleColorHover = (color) => {
    setHoveredColor(color);
  };

  const handleColorSelect = (color) => {
    saveToUndoStack();
    setIsDirty(true);
    setFullNameColor(color);
    setHoveredColor(color);
    setResume((prevResume) => {
      const newResume = { ...prevResume, resumeColor: color };
      updateColorsAndFonts(newResume);
      return newResume;
    });
  };

  const handleImport = async () => {
    setIsImporting(true);
    try {
      await handleLinkedInImport();
      setShowLinkedInDropdown(false);
      showStatusMessage("LinkedIn profile imported successfully!", "success");
    } catch (error) {
      showStatusMessage("Failed to import LinkedIn profile. Please try again.", "error");
    } finally {
      setIsImporting(false);
    }
  };

  const handleThemeSelect = (theme) => {
    saveToUndoStack();
    setIsDirty(true);
    setSelectedTheme(theme);
    setResume((prevResume) => {
      const newResume = { ...prevResume, theme: theme };
      updateColorsAndFonts(newResume);
      return newResume;
    });
  };

  const updateColorsAndFonts = (newResume) => {
    setFullNameColor(newResume.resumeColor);
    setHoveredColor(newResume.resumeColor);
    setSelectedFont(newResume.fontFamily);
    setHoveredFont(newResume.fontFamily);
    setSelectedTheme(newResume.theme);
  };

  const renderTheme = () => {
    switch (selectedTheme) {
      case "BlackAndWhite":
        return <BlackAndWhite resumeData={resume} setResumeData={setResume} fullNameColor={hoveredColor} fontFamily={hoveredFont} sectionsVisibility={sectionsVisibility} summaryRef={summaryRef} />;
      case "BlueAndWhite":
        return <BlueAndWhite resumeData={resume} setResumeData={setResume} fullNameColor={hoveredColor} fontFamily={hoveredFont} sectionsVisibility={sectionsVisibility} />;
      case "OceanTheme":
        return <OceanTheme resumeData={resume} setResumeData={setResume} fullNameColor={hoveredColor} fontFamily={hoveredFont} sectionsVisibility={sectionsVisibility} />;
      case "WhiteAndBlue":
        return <WhiteAndBlue resumeData={resume} setResumeData={setResume} fullNameColor={hoveredColor} fontFamily={hoveredFont} sectionsVisibility={sectionsVisibility} />;
      default:
        return <BlackAndWhite resumeData={resume} setResumeData={setResume} fullNameColor={hoveredColor} fontFamily={hoveredFont} sectionsVisibility={sectionsVisibility} summaryRef={summaryRef} />;
    }
  };

  const handleLinkedInImport = async () => {
    try {
      const data = await fetchLinkedInProfile(linkedinProfileUrl, id);
      setResume((prevResume) => {
        const newResume = {
          ...prevResume,
          fullName: data.full_name || prevResume.fullName,
          professionalTitle: data.occupation || prevResume.professionalTitle,
          location: `${data.city}, ${data.state}, ${data.country}` || prevResume.location,
          summary: data.summary || prevResume.summary,
          experiences: data.experiences && data.experiences.length ? data.experiences.map(exp => ({
            position: exp.title,
            company: exp.company,
            location: exp.location,
            duration: `${exp.starts_at?.year || ''}-${exp.starts_at?.month || 1}-${exp.starts_at?.day || 1} to ${exp.ends_at ? `${exp.ends_at.year}-${exp.ends_at.month || 1}-${exp.ends_at.day || 1}` : 'Present'}`,
            responsibilities: [],
          })) : prevResume.experiences,
          education: data.education && data.education.length ? data.education.map(edu => ({
            institution: edu.school,
            year: `${edu.starts_at?.year || ''}-${edu.ends_at?.year || ''}`,
            degree: edu.degree_name,
          })) : prevResume.education,
          skills: data.skills && data.skills.length ? data.skills : prevResume.skills,
          linkedin: linkedinProfileUrl
        };
        updateColorsAndFonts(newResume);
        return newResume;
      });
      await saveResume({ linkedin: linkedinProfileUrl });
    } catch (error) {
      console.error("Error importing LinkedIn profile:", error);
      throw error;
    }
  };

  const fetchLinkedInProfile = async (linkedinProfileUrl, resumeId) => {
    try {
      const response = await axios.post('/api/linkedin', { linkedinProfileUrl, resumeId });
      return response.data;
    } catch (error) {
      console.error("Error fetching LinkedIn profile:", error);
      throw error;
    }
  };

  const handleSectionVisibilityChange = (e) => {
    const { name, checked } = e.target;
    setSectionsVisibility((prev) => {
      const newVisibility = { ...prev, [name]: checked };
      setResume((prevResume) => ({
        ...prevResume,
        sectionsVisibility: newVisibility,
      }));
      return newVisibility;
    });
  };

  const [sectionsVisibility, setSectionsVisibility] = useState({
    hobbies: false,
    software: false,
    extraSection: false,
    certificates: false,
    languages: false,
    extraDetailedSection: false,
  });

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleLinkedInClick = () => {
    setModalIsOpen(true);
    setDropdownOpen(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLinkedInDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  if (loading) return <div>{t.loading}</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainContainer style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <StatusMessage visible={statusMessage.visible} type={statusMessage.type}>
        {statusMessage.text}
      </StatusMessage>
      <NavWrapper>
        <ResumeNav
          resume={resume}
          sectionsVisibility={sectionsVisibility}
          hoveredColor={hoveredColor}
          hoveredFont={hoveredFont}
          selectedTheme={selectedTheme}
          handleSave={handleSave}
          isSaving={isSaving}
        />
      </NavWrapper>
      <MobileSideNav className={mobileSideNavOpen ? 'open' : ''}>
        <ResumeSideNav 
          resume={resume}
          setResume={setResume}
          theme={selectedTheme}
          setTheme={handleThemeSelect}
        />
        <CloseButton onClick={() => setMobileSideNavOpen(false)}>✕</CloseButton>
      </MobileSideNav>
      <ContentContainer style={{ direction: 'ltr' }}>
        <ResumeSideNavContainer>
          <ResumeSideNav 
            resume={resume}
            setResume={setResume}
            theme={selectedTheme}
            setTheme={handleThemeSelect}
          />
        </ResumeSideNavContainer>
        <ResumeContainer>
          <DropdownContainer>
            {!modalIsOpen && (
              <DropdownContent show={dropdownOpen}>
                <DropdownItemStyled onClick={handleLinkedInClick}>Import from LinkedIn</DropdownItemStyled>
                <DropdownItemStyled>
                  <ButtonCheckout priceId="price_1M2jDkIEQZQ1iQDEIQQ6MwkJ" />
                </DropdownItemStyled>
                <DropdownItemStyled>More options</DropdownItemStyled>
              </DropdownContent>
            )}
          </DropdownContainer>
          <ButtonContainer>
        <LinkedInButtonWrapper ref={dropdownRef}>
          <StyledButton
            onClick={() => setShowLinkedInDropdown(!showLinkedInDropdown)}
            className="bg-blue-600 text-white px-2"
            disabled={isImporting}
          >
            {isImporting ? (
              <LoadingSpinner />
            ) : (
              <>
                <FaLinkedin />
                <span>{t.importLinkedIn}</span>
              </>
            )}
          </StyledButton>

          {showLinkedInDropdown && (
            <LinkedInDropdown>
              <LinkedInInput
                type="text"
                placeholder={t.linkedInPlaceholder}
                value={linkedinProfileUrl}
                onChange={(e) => setLinkedinProfileUrl(e.target.value)}
              />
              <LinkedInExample>{t.linkedInExample}</LinkedInExample>
              <DropdownButton
                onClick={handleImport}
                className="bg-blue-600 text-white px-2"
                disabled={isImporting}
              >
                {isImporting ? <LoadingSpinner /> : t.submit}
              </DropdownButton>
            </LinkedInDropdown>
          )}
        </LinkedInButtonWrapper>
      </ButtonContainer>
          <EditorActions
            onSelectColor={handleColorSelect}
            onHoverColor={handleColorHover}
            onSelectFont={handleFontSelect}
            onHoverFont={handleFontHover}
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
            colors={colors}
            fonts={fonts}
          />
       <CheckboxContainer>
        {Object.keys(sectionsVisibility).map((section) => (
          <CheckboxLabel key={section}>
            <input
              type="checkbox"
              name={section}
              checked={sectionsVisibility[section]}
              onChange={handleSectionVisibilityChange}
            />
            {t.sections[section]}
          </CheckboxLabel>
        ))}
      </CheckboxContainer>

          <div ref={resumeRef}>
            {renderTheme()}
          </div>
        </ResumeContainer>
      </ContentContainer>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Import from LinkedIn"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '100%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <h2>Import from LinkedIn</h2>
        <input
          type="text"
          placeholder="LinkedIn Profile URL"
          value={linkedinProfileUrl}
          onChange={(e) => setLinkedinProfileUrl(e.target.value)}
          style={{ margin: '20px 0', padding: '10px', width: '100%', color: 'black'}}
        />
        <Button
          onClick={handleLinkedInImport}
          className="py-4 px-12 text-lg m-4 bg-blue-600 text-white"
          style={{ width: '250px' }}
        >
          Submit
        </Button>
        <Button
          onClick={closeModal}
          className="py-4 px-12 text-lg m-4 bg-red-600 text-white"
          style={{ width: '250px' }}
        >
          Cancel
        </Button>
      </ReactModal>
    </MainContainer>
  );
}

// /lib/hooks/useResumeHooks.js
import { useEffect, useCallback } from 'react';

export const useResumeDataEffect = (resumeData, setResumeData, fontFamily) => {
  useEffect(() => {
    if (!resumeData) {
      setResumeData({
        fullName: '',
        professionalTitle: '',
        linkedin: '',
        location: '',
        phone: '',
        email: '',
        summary: '',
        experiences: [{ position: '', company: '', location: '', duration: '', responsibilities: [''] }],
        education: [{ institution: '', year: '', gpa: '', degree: '' }],
        skills: [''],
        hobbies: [''],
        software: [''],
        languages: [''],
        certificates: [{ name: '', year: '' }],
        extraSection: [''],
        extraDetailedSection: [{ title: '', details: [''] }],
        fontFamily: fontFamily || "Times New Roman", // Set the fontFamily based on the prop
      });
    } else {
      const fieldsToCheck = ['skills', 'experiences', 'education', 'hobbies', 'software', 'languages', 'certificates', 'extraSection', 'extraDetailedSection'];
      fieldsToCheck.forEach(field => {
        if (!resumeData[field] || resumeData[field].length === 0) {
          setResumeData(prevData => ({
            ...prevData,
            [field]: field === 'experiences' || field === 'education' || field === 'certificates' || field === 'extraDetailedSection'
              ? [{ position: '', company: '', location: '', duration: '', responsibilities: [''], institution: '', year: '', gpa: '', degree: '', name: '', details: [''] }]
              : ['']
          }));
        }
      });
    }
  }, [resumeData, setResumeData, fontFamily]);
};

export const useClickOutside = (hoveredExperience, summaryRegenerate, setRegenerateFields, setMoreOptionsFields, setSummaryRegenerate) => {
  const handleClickOutside = useCallback((e) => {
    if (hoveredExperience !== null) {
      const regenerateElement = document.getElementById(`regenerate-${hoveredExperience}`);
      const moreOptionsElement = document.getElementById(`more-options-${hoveredExperience}`);
      if (
        regenerateElement && !regenerateElement.contains(e.target) &&
        moreOptionsElement && !moreOptionsElement.contains(e.target)
      ) {
        setRegenerateFields({});
        setMoreOptionsFields({});
      }
    }
    if (summaryRegenerate) {
      const summaryElement = document.getElementById('summary-regenerate');
      if (summaryElement && !summaryElement.contains(e.target)) {
        setSummaryRegenerate(false);
      }
    }
  }, [hoveredExperience, summaryRegenerate, setRegenerateFields, setMoreOptionsFields, setSummaryRegenerate]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export const useTextareaResize = (resumeData, summaryRef) => {
  useEffect(() => {
    if (summaryRef.current) {
      summaryRef.current.style.height = 'auto';
      summaryRef.current.style.height = `${summaryRef.current.scrollHeight}px`;
    }
  }, [resumeData?.summary, summaryRef]);
};

export const useTextareaAutoResize = (resumeData) => {
  useEffect(() => {
    const resizeTextarea = (textarea) => {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 20}px`;
    };

    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(resizeTextarea);

    const observer = new MutationObserver(() => {
      textareas.forEach(resizeTextarea);
    });

    textareas.forEach(textarea => observer.observe(textarea, { childList: true, subtree: true }));

    return () => {
      observer.disconnect();
    };
  }, [resumeData]);
};

import React from 'react';
import { handleSkillChange, removeSkill } from '../../../../lib/utils/resumeUtils';

export default function SkillsSection({ resumeData, setResumeData, fullNameColor, generatingSection, hoveredSkill, setHoveredSkill, generateSkills }) {
  return (
    <>
      <h1 className="font-bold border-b-2 border-b-black" style={{ color: fullNameColor }}>SKILLS</h1>
      <div className="flex flex-wrap gap-2 text-[13px] mt-4">
        {(resumeData.skills || []).map((skill, index) => (
          <div key={index} className="relative group" onMouseEnter={() => setHoveredSkill(index)} onMouseLeave={() => setHoveredSkill(null)}>
            <input
              className="w-auto px-2 border rounded-full bg-transparent border-[0.5px] outline-none"
              placeholder="Skill"
              value={skill || ""}
              onChange={(e) => handleSkillChange(index, e.target.value, setResumeData, resumeData)}
              style={{
                minWidth: skill ? `${Math.max(50, skill.length * 10)}px` : '5px',
                borderColor: fullNameColor,
                transition: 'width 0.3s ease-in-out',
                backgroundColor: generatingSection === 'skills' ? 'lightgreen' : '',
              }}
              onInput={(e) => {
                e.target.style.width = 'auto';
                e.target.style.width = `${e.target.scrollWidth}px`;
              }}
            />
            {hoveredSkill === index && (
              <button
                onClick={() => removeSkill(index, setResumeData, resumeData)}
                className="absolute bottom-[5px] right-[5px] text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-6 h-6">
                  <path fillRule="evenodd" d="M9.75 3a.75.75 0 00-1.5 0v1.5H5.25a.75.75 0 000 1.5h13.5a.75.75 0 000-1.5H15.75V3a.75.75 0 00-1.5 0v1.5h-4.5V3zM4.5 6.75a.75.75 0 000 1.5h14.25a.75.75 0 100-1.5H4.5zm2.25 3a.75.75 0 00-.75.75v9.75A3 3 0 009 23.25h6a3 3 0 003-3V10.5a.75.75 0 00-1.5 0v9.75a1.5 1.5 0 01-1.5 1.5H9a1.5 1.5 0 01-1.5-1.5V10.5a.75.75 0 00-.75-.75z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => generateSkills('Your job description here')}
        className="hidden group-hover:block mx-auto mt-10 mb-10 bg-green-500 text-white font-bold py-2 px-4 rounded w-1/2"
      >
        Generate Skills
      </button>
    </>
  );
}

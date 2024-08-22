//Users/mohsinal/airesume-5/components/ResumePreviewPopup.js

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const ColorButton = ({ color, isSelected, onClick }) => (
  <button
    className={`w-8 h-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
    style={{ backgroundColor: color }}
    onClick={() => onClick(color)}
  >
    {isSelected && <Check className="text-white mx-auto" size={16} />}
  </button>
);

const RotatingThemes = ({ themes, onSelectTheme }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const rotate = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'left') {
        return prevIndex === 0 ? themes.length - 1 : prevIndex - 1;
      } else {
        return (prevIndex + 1) % themes.length;
      }
    });
  };

  const handleThemeClick = (clickedIndex) => {
    if (clickedIndex === currentIndex) {
      onSelectTheme(themes[clickedIndex].name);
    } else {
      const diff = clickedIndex - currentIndex;
      const rotations = diff > 0 ? diff : themes.length + diff;
      setCurrentIndex(clickedIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') rotate('left');
      if (e.key === 'ArrowRight') rotate('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full h-[260px] sm:h-[330px] lg:h-[400px] flex items-center justify-center">
      {themes.map((theme, index) => {
        let position = index - currentIndex;
        if (position < 0) position += themes.length;
        if (position > Math.floor(themes.length / 2)) position -= themes.length;

        return (
          <div
            key={theme.name}
            className="absolute transition-all duration-300 ease-in-out cursor-pointer"
            style={{
              transform: `translateX(${position * 70}%) scale(${1 - Math.abs(position) * 0.2})`,
              zIndex: position === 0 ? 2 : 1 - Math.abs(position),
              filter: position !== 0 ? 'blur(0.5px)' : 'none',
            }}
            onClick={() => handleThemeClick(index)}
          >
            {theme.component}
          </div>
        );
      })}
      <button
        className="absolute left-4 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:bg-gray-100"
        onClick={() => rotate('left')}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 z-10 bg-white rounded-full p-2 shadow-md transition-all duration-300 hover:bg-gray-100"
        onClick={() => rotate('right')}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const ResumePreviewPopup = ({ isOpen, onClose, onConfirm, initialFullNameColor = "#0000FF", userName = "John Doe" }) => {
  const [fullNameColor, setFullNameColor] = useState(initialFullNameColor);

  if (!isOpen) return null;

  const darkenColor = (color, amount) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  };

  const darkenedColor = darkenColor(fullNameColor, -40);

  const colors = [
    "#0000FF", "#FF0000", "#00FF00", "#FFFF00", "#FF00FF",
    "#00FFFF", "#800080", "#008080", "#808000", "#800000",
    "#008000", "#000080", "#FFA500", "#A52A2A", "#DDA0DD"
  ];

  const handleColorChange = (color) => {
    setFullNameColor(color);
  };

  const previewContainerStyle = {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  };

  const renderBlueAndWhitePreview = () => (
    <div style={previewContainerStyle} className="w-[170px] h-[240px] sm:w-[170px] sm:h-[240px] lg:w-[210px] lg:h-[297px]">
      <h3 className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold mb-[2px] sm:mb-[2px] text-center bg-gray-100 py-[2px] sm:py-[2px]">Blue and White</h3>
      <div className="flex h-[calc(100%-16px)] sm:h-[calc(100%-16px)] text-[3.5px] sm:text-[3.5px] lg:text-[5px]" style={{ backgroundColor: fullNameColor }}>
        {/* Left column */}
        <div className="w-[30%] text-white p-1 sm:p-1">
          <div className="px-[2px] sm:px-[2px]">
            <div className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold">{userName}</div>
            <div className="opacity-80">Software Developer</div>
          </div>
          <div className="mt-1 sm:mt-1">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ backgroundColor: darkenedColor }}>
              Personal Info
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-[2px] sm:px-[2px] max-w-[70%] flex flex-col gap-[1px] sm:gap-[1px]">
              <li><span className="font-medium">Address:</span> New York, NY</li>
              <li><span className="font-medium">Phone:</span> (555) 123-4567</li>
              <li><span className="font-medium">Email:</span> john@example.com</li>
              <li><span className="font-medium">LinkedIn:</span> linkedin.com/in/johndoe</li>
            </ul>
          </div>
          <div className="mt-[2px] sm:mt-[2px]">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ backgroundColor: darkenedColor }}>
              Skills
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-1 sm:px-1 w-full flex flex-col gap-[1px] sm:gap-[1px]">
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
            </ul>
          </div>
          <div className="mt-[2px] sm:mt-[2px]">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ backgroundColor: darkenedColor }}>
              Hobbies
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-1 sm:px-1 w-full flex flex-col gap-[1px] sm:gap-[1px]">
              <li>Photography</li>
              <li>Reading</li>
              <li>Cycling</li>
              <li>Traveling</li>
              <li>Cooking</li>
            </ul>
          </div>
        </div>
        {/* Right column */}
        <div className="w-[70%] bg-white p-1 sm:p-1 flex flex-col gap-0">
          <div className="border-b border-gray-300 mb-[2px] sm:mb-[2px]">
            Experienced software developer with a passion for creating efficient and scalable applications...
          </div>
          <div>
            <h1 className="font-bold border-b border-black mb-[2px] sm:mb-[2px]" style={{ color: fullNameColor }}>Experience</h1>
            <ul className="list-none p-0">
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span style={{ color: fullNameColor }}>Senior Developer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>Tech Solutions Inc.</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span style={{ color: fullNameColor }}>New York</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2019 - Present</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Led development team in creating new features<br/>
                  • Optimized database performance by 30%<br/>
                  • Implemented automated testing processes<br/>
                  • Collaborated with cross-functional teams<br/>
                  • Mentored junior developers<br/>
                </div>
              </li>
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span style={{ color: fullNameColor }}>Software Engineer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>Innovative Solutions</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span style={{ color: fullNameColor }}>Boston</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2016 - 2019</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Developed new features for client projects<br/>
                  • Maintained and improved existing codebases<br/>
                  • Automated deployment processes<br/>
                  • Enhanced security features<br/>
                  • Wrote comprehensive documentation<br/>
                </div>
              </li>
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span style={{ color: fullNameColor }}>Junior Developer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>WebStart Inc.</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span style={{ color: fullNameColor }}>San Francisco</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2014 - 2016</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Assisted in the development of web applications<br/>
                  • Performed testing and debugging<br/>
                  • Collaborated with senior developers<br/>
                  • Managed version control systems<br/>
                  • Participated in code reviews<br/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBlackAndWhitePreview = () => (
    <div style={previewContainerStyle} className="w-[170px] h-[240px] sm:w-[170px] sm:h-[240px] lg:w-[210px] lg:h-[297px]">
      <h3 className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold mb-[2px] sm:mb-[2px] text-center bg-gray-100 py-[2px] sm:py-[2px]">Black and White</h3>
      <div className="flex flex-col p-1 sm:p-1 h-[calc(100%-16px)] sm:h-[calc(100%-16px)] text-[3.5px] sm:text-[3.5px] lg:text-[5px] bg-white text-black">
        <div className="text-center">
          <div className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold" style={{ color: fullNameColor }}>{userName}</div>
          <div className="opacity-80">Software Developer</div>
        </div>
        <div className="flex justify-center gap-2 sm:gap-2 text-[3px] sm:text-[3px] lg:text-[4px]">
          <span>New York, NY</span> |
          <span>(555) 123-4567</span> |
          <span>john@example.com</span> |
          <span>linkedin.com/in/johndoe</span>
        </div>
        <div className="mt-1 sm:mt-1">
          <div className="font-medium border-b border-gray-300" style={{ color: fullNameColor }}>Summary</div>
          <p className="text-[3px] sm:text-[3px] lg:text-[4px]">Experienced software developer with a passion for creating efficient and scalable applications...</p>
        </div>
        <div className="mt-1 sm:mt-1">
          <div className="font-medium border-b border-gray-300" style={{ color: fullNameColor }}>Experience</div>
          <div className="mt-[1px] sm:mt-[1px]">
            <div className="font-semibold">Senior Developer | Tech Solutions Inc. | New York | 2019 - Present</div>
            <ul className="list-disc list-inside">
              <li>Led development team in creating new features</li>
              <li>Optimized database performance by 30%</li>
              <li>Implemented automated testing processes</li>
              <li>Collaborated with cross-functional teams</li>
              <li>Mentored junior developers</li>
            </ul>
          </div>
          <div className="mt-[1px] sm:mt-[1px]">
<div className="font-semibold">Software Engineer | Innovative Solutions | Boston | 2016 - 2019</div>
            <ul className="list-disc list-inside">
              <li>Developed new features for client projects</li>
              <li>Maintained and improved existing codebases</li>
              <li>Automated deployment processes</li>
              <li>Enhanced security features</li>
              <li>Wrote comprehensive documentation</li>
            </ul>
          </div>
          <div className="mt-[1px] sm:mt-[1px]">
            <div className="font-semibold">Junior Developer | WebStart Inc. | San Francisco | 2014 - 2016</div>
            <ul className="list-disc list-inside">
              <li>Assisted in the development of web applications</li>
              <li>Performed testing and debugging</li>
              <li>Collaborated with senior developers</li>
              <li>Managed version control systems</li>
              <li>Participated in code reviews</li>
            </ul>
          </div>
        </div>
        <div className="mt-1 sm:mt-1">
          <div className="font-medium border-b border-gray-300" style={{ color: fullNameColor }}>Skills</div>
          <div className="flex flex-wrap gap-1 sm:gap-1 mt-[1px] sm:mt-[1px]">
            <span className="bg-gray-200 px-1 sm:px-1 rounded">JavaScript</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">React</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Node.js</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Python</span>
          </div>
        </div>
        <div className="mt-1 sm:mt-1">
          <div className="font-medium border-b border-gray-300" style={{ color: fullNameColor }}>Hobbies</div>
          <div className="flex flex-wrap gap-1 sm:gap-1 mt-[1px] sm:mt-[1px]">
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Photography</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Reading</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Cycling</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Traveling</span>
            <span className="bg-gray-200 px-1 sm:px-1 rounded">Cooking</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOceanThemePreview = () => (
    <div style={previewContainerStyle} className="w-[170px] h-[240px] sm:w-[170px] sm:h-[240px] lg:w-[210px] lg:h-[297px]">
      <h3 className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold mb-[2px] sm:mb-[2px] text-center bg-gray-100 py-[2px] sm:py-[2px]">Ocean Theme</h3>
      <div className="flex h-[calc(100%-16px)] sm:h-[calc(100%-16px)] text-[3.5px] sm:text-[3.5px] lg:text-[5px]">
        {/* Left column */}
        <div className="w-[30%] p-1 sm:p-1" style={{ backgroundColor: 'white' }}>
          <div className="px-[2px] sm:px-[2px]">
            <div className="text-[6px] sm:text-[6px] lg:text-[8px] font-semibold" style={{ color: fullNameColor }}>{userName}</div>
            <div className="opacity-80" style={{ color: fullNameColor }}>Software Developer</div>
          </div>
          <div className="mt-1 sm:mt-1">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ color: fullNameColor, borderBottom: `1px solid ${darkenedColor}` }}>
              Personal Info
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-[2px] sm:px-[2px] max-w-[70%] flex flex-col gap-[1px] sm:gap-[1px]" style={{ color: fullNameColor }}>
              <li><span className="font-medium">Address:</span> New York, NY</li>
              <li><span className="font-medium">Phone:</span> (555) 123-4567</li>
              <li><span className="font-medium">Email:</span> john@example.com</li>
              <li><span className="font-medium">LinkedIn:</span> linkedin.com/in/johndoe</li>
            </ul>
          </div>
          <div className="mt-[2px] sm:mt-[2px]">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ color: fullNameColor, borderBottom: `1px solid ${darkenedColor}` }}>
              Skills
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-1 sm:px-1 w-full flex flex-col gap-[1px] sm:gap-[1px]" style={{ color: fullNameColor }}>
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Python</li>
            </ul>
          </div>
          <div className="mt-[2px] sm:mt-[2px]">
            <div className="py-[1px] sm:py-[1px] px-[2px] sm:px-[2px] font-medium" style={{ color: fullNameColor, borderBottom: `1px solid ${darkenedColor}` }}>
              Hobbies
            </div>
            <ul className="mt-[2px] sm:mt-[2px] px-1 sm:px-1 w-full flex flex-col gap-[1px] sm:gap-[1px]" style={{ color: fullNameColor }}>
              <li>Photography</li>
              <li>Reading</li>
              <li>Cycling</li>
              <li>Traveling</li>
              <li>Cooking</li>
            </ul>
          </div>
        </div>
        {/* Right column */}
        <div className="w-[70%] p-1 sm:p-1 flex flex-col gap-0 text-white" style={{ backgroundColor: fullNameColor }}>
          <div className="mb-[2px] sm:mb-[2px]">
            Experienced software developer with a passion for creating efficient and scalable applications...
          </div>
          <div>
            <h1 className="font-bold border-b border-white mb-[2px] sm:mb-[2px]">Experience</h1>
            <ul className="list-none p-0">
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span>Senior Developer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>Tech Solutions Inc.</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>New York</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2019 - Present</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Led development team in creating new features<br/>
                  • Optimized database performance by 30%<br/>
                  • Implemented automated testing processes<br/>
                  • Collaborated with cross-functional teams<br/>
                  • Mentored junior developers<br/>
                </div>
              </li>
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span>Software Engineer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>Innovative Solutions</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>Boston</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2016 - 2019</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Developed new features for client projects<br/>
                  • Maintained and improved existing codebases<br/>
                  • Automated deployment processes<br/>
                  • Enhanced security features<br/>
                  • Wrote comprehensive documentation<br/>
                </div>
              </li>
              <li className="mb-[2px] sm:mb-[2px]">
                <div className="flex items-center gap-0 font-bold">
                  <span>Junior Developer</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>WebStart Inc.</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>San Francisco</span>
                  <span className="mx-[1px] sm:mx-[1px]">|</span>
                  <span>2014 - 2016</span>
                </div>
                <div className="ml-[2px] sm:ml-[2px]">
                  • Assisted in the development of web applications<br/>
                  • Performed testing and debugging<br/>
                  • Collaborated with senior developers<br/>
                  • Managed version control systems<br/>
                  • Participated in code reviews<br/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const themes = [
    { name: 'BlueAndWhite', component: renderBlueAndWhitePreview() },
    { name: 'BlackAndWhite', component: renderBlackAndWhitePreview() },
    { name: 'OceanTheme', component: renderOceanThemePreview() },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Choose Your Resume Theme</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-1">
          <h3 className="text-base sm:text-lg font-semibold mb-1">Accent Color</h3>
          <div className="flex flex-wrap gap-1">
            {colors.map((color) => (
              <ColorButton
                key={color}
                color={color}
                isSelected={color === fullNameColor}
                onClick={handleColorChange}
              />
            ))}
          </div>
        </div>
        <RotatingThemes themes={themes} onSelectTheme={(themeName) => onConfirm(fullNameColor, themeName)} />
      </div>
    </div>
  );
};

export default ResumePreviewPopup;
// File: components/LanguageToggle.js
'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage, supportedLanguages } from '../contexts/LanguageContext';
import Image from 'next/image';

const LanguageFlag = ({ language }) => {
  const flagSvgs = {
    en: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" width="20" height="10">
        <rect width="7410" height="3900" fill="#b22234"/>
        <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300"/>
        <rect width="2964" height="2100" fill="#3c3b6e"/>
        <g fill="#fff">
          <g id="s18">
            <g id="s9">
              <g id="s5">
                <g id="s4">
                  <path id="s" d="M247,90 317.534230,307.082039 132.873218,172.917961H361.126782L176.465770,307.082039z"/>
                  <use href="#s" y="420"/>
                  <use href="#s" y="840"/>
                  <use href="#s" y="1260"/>
                </g>
                <use href="#s" y="1680"/>
              </g>
              <use href="#s4" x="247" y="210"/>
            </g>
            <use href="#s9" x="494"/>
          </g>
          <use href="#s18" x="988"/>
          <use href="#s9" x="1976"/>
          <use href="#s5" x="2470"/>
        </g>
      </svg>
    ),
    es: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="20" height="10">
        <rect width="750" height="500" fill="#c60b1e"/>
        <rect width="750" height="250" fill="#ffc400" y="125"/>
      </svg>
    ),
    fr: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="20" height="10">
        <rect width="900" height="600" fill="#ED2939"/>
        <rect width="600" height="600" fill="#fff"/>
        <rect width="300" height="600" fill="#002395"/>
      </svg>
    )
  };

  if (language === 'ar') {
    return (
      <Image
        src="/flags/sa.png"
        alt="Saudi Arabia flag"
        width={20}
        height={10}
        className="object-cover mx-2"
      />
    );
  }

  return (
    <div className="w-5 h-2.5 mx-2">
      {flagSvgs[language] || null}
    </div>
  );
};

const LanguageToggle = () => {
  const { language, changeLanguage, isInitialized } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('LanguageToggle rendered. isInitialized:', isInitialized, 'language:', language);
  }, [isInitialized, language]);

  const languageNames = {
    en: 'English',
    ar: 'عربي',
    es: 'Español',
    fr: 'Français'
  };

  const languageCodes = {
    en: 'EN',
    ar: 'AR',
    es: 'ES',
    fr: 'FR'
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    changeLanguage(e.target.value);
    setIsOpen(false);
  };

  if (!isInitialized) {
    return <div>Loading language...</div>;
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center items-center w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
        style={{ width: '60px' }}
      >
        <LanguageFlag language={language} />
        <span className="pr-2">{languageCodes[language]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-32 bg-white rounded-md shadow-lg" style={{ transform: 'translateX(20%)' }}>
          <ul className="py-1">
            {supportedLanguages.map((lang) => (
              <li key={lang}>
                <button
                  onClick={() => {
                    changeLanguage(lang);
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="w-5 flex-shrink-0">
                    <LanguageFlag language={lang} />
                  </div>
                  <span className="ml-3">{languageNames[lang]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;

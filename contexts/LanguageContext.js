"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { detectUserLanguage } from '../lib/geoLanguage';

const LanguageContext = createContext();

export const supportedLanguages = ['en', 'ar', 'es', 'fr'];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      console.log('Initializing language...');
      const savedLanguage = localStorage.getItem('language');
      let detectedLanguage;
      if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        detectedLanguage = savedLanguage;
        setLanguage(savedLanguage);
        console.log('Using saved language:', savedLanguage);
      } else {
        detectedLanguage = await detectUserLanguage();
        console.log('Detected language:', detectedLanguage);
        if (supportedLanguages.includes(detectedLanguage)) {
          setLanguage(detectedLanguage);
          localStorage.setItem('language', detectedLanguage);
        }
      }
      
      // Detect and save user's country and language
      const detectedCountry = await detectUserCountry();
      setCountry(detectedCountry);
      await saveUserInfo(detectedCountry, detectedLanguage);

      setIsInitialized(true);
      console.log('Language and country initialized');
    };

    initLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    console.log('Changing language to:', lang);
    if (supportedLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
      await saveUserInfo(country, lang);
    }
  };

  const detectUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return data.country_name;
    } catch (error) {
      console.error('Error detecting user country:', error);
      return '';
    }
  };

  const saveUserInfo = async (country, language) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country, language }),
      });
      if (!response.ok) {
        throw new Error('Failed to save user information');
      }
      const data = await response.json();
      console.log('User info saved:', data);
    } catch (error) {
      console.error('Error saving user information:', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, country, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
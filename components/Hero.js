"use client";

import React from 'react';
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const PulsingButtonWrapper = styled.div`
  display: inline-block;
  width: 90%;
  animation: ${pulse} 2s infinite;
`;

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <div className="overflow-x-hidden bg-gray-50" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <section className="pt-12 bg-gray-50 sm:pt-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="w-[90%] mx-auto text-center">
            <h1 className="px-6 text-lg text-gray-600 font-inter">{t.title}</h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
              {t.subtitle}
              <span className="relative inline-flex sm:inline">
                <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                <span className="relative text-blue-600"> {t.highlight}</span>
              </span>
              <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                {t.resumeText}
              </p>
            </p>
            
            <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
              <PulsingButtonWrapper>
                <ButtonSignin
                  extraStyle="inline-flex items-center justify-center w-full px-8 py-1 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 overflow-hidden text-overflow-ellipsis whitespace-nowrap"
                  buttonText={t.buttonText}
                  style={{
                    width: '100%',
                    padding: '8px 32px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#333',
                    border: '2px solid transparent',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                />
              </PulsingButtonWrapper>
            </div>
            
            <p className="mt-8 text-base text-gray-500 font-inter">{t.noCreditCard}</p>
          </div>
        </div>
        
        <div className="pb-12 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
            <div className="relative mx-auto">
              <div className="lg:max-w-6xl lg:mx-auto">
                <Image
                  src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
                  alt="Product Demo"
                  className="transform scale-110"
                  priority={true}
                  width={3540}
                  height={2360}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
// File: components/Footer.js
"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import ButtonSignin from "@/components/ButtonSignin";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="py-12 bg-gray-900 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="relative">
          <div className="absolute -inset-2">
            <div
              className="w-full h-full mx-auto opacity-30 blur-lg filter"
              style={{
                background:
                  "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)",
              }}
            ></div>
          </div>

          <div className="relative overflow-hidden text-center bg-gray-900 rounded-3xl lg:text-left">
            <div className="p-6 lg:py-8 lg:px-14">
              <div className="lg:flex lg:items-center lg:justify-between">
                <h5 className="max-w-md mx-auto text-3xl font-bold text-white xl:max-w-xl lg:mx-0 font-pj">
                  {t.cta}
                </h5>

                <div className="flex-1 mt-7 lg:mt-0 lg:ml-8">
                  <ButtonSignin
                    extraStyle="rounded-xl inline-flex px-8 py-3 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded :mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    buttonText={t.ctaButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16 mt-16 md:mt-24 md:grid-cols-4">
          {Object.entries(t.sections).map(([sectionKey, section]) => (
            <div key={sectionKey}>
              <h6 className="text-base font-bold text-white font-pj">{section.title}</h6>

              <ul className="mt-8 space-y-5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href} 
                      title={link.title} 
                      className="inline-flex text-sm font-normal text-white transition-all duration-300 transform font-pj hover:text-gray-300 hover:translate-x-1"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
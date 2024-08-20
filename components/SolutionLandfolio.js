// File: components/SolutionLandfolio.js
"use client";

import { useState } from "react";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import config from "@/config";

const SolutionLandfolio = () => {
  const [expanded, setExpanded] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].solution;

  return (
    <div className="bg-gray-50">
      <section className="relative py-12 sm:py-16 lg:pb-40" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="absolute bottom-0 right-0 overflow-hidden">
          <Image 
            className="w-full h-auto origin-bottom-right transform scale-150 lg:w-auto lg:mx-auto lg:object-cover lg:scale-75" 
            src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/background-pattern.png" 
            alt={t.backgroundAlt}
            layout="fill"
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-4 lg:items-center lg:grid-cols-2 xl:grid-cols-2">
            <div className="text-center xl:col-span-1 lg:text-left md:px-16 lg:px-0 xl:pr-20">
              <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                {t.titlePart1}
                <span className="relative inline-flex sm:inline">
                  <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                  <span className="relative text-blue-600"> {t.titleHighlight}</span>
                </span>
                <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                  {t.titlePart2}
                </p>
              </p>
            
              <p className="mt-2 text-lg text-gray-600 sm:mt-6 font-inter">
                {t.description}
              </p>

              <ButtonSignin
                extraStyle="rounded-xl inline-flex px-8 py-3 mt-8 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded :mt-10 font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                buttonText={t.buttonText}
              />

              <div className="mt-8 sm:mt-16">
                <div className="flex items-center justify-center lg:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#FDB241]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-6">
                  <p className="text-lg font-bold text-gray-900 font-pj">{t.testimonialTitle}</p>
                  <p className="mt-3 text-base leading-7 text-gray-600 font-inter">
                    {t.testimonialText}
                  </p>
                </blockquote>

                <div className="flex items-center justify-center mt-3 lg:justify-start">
                  <Image
                    className="flex-shrink-0 object-cover w-6 h-6 overflow-hidden rounded-full"
                    src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/1/avatar-female.png"
                    alt={t.testimonialImageAlt}
                    width={24}
                    height={24}
                  />
                  <p className="ml-2 text-base font-bold text-gray-900 font-pj">{t.testimonialAuthor}</p>
                </div>
              </div>
            </div>

            <div className="xl:col-span-1">
              <Image
                className="w-full mx-auto object-cover rounded-lg shadow-xl sm:w-auto sm:rounded-xl sm:shadow-2xl md:rounded-2xl md:shadow-2xl lg:rounded-3xl lg:shadow-3xl xl:rounded-4xl xl:shadow-4xl"
                src="https://cdn.prod.website-files.com/64d03d94c73469cb85a2d02f/64d03d94c73469cb85a2d3ca_shutterstock_1279483576.png"
                alt={t.illustrationAlt}
                width={720}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionLandfolio;
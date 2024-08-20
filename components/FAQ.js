// File: components/FAQ.js
"use client";

import React, { useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';

const FAQItem = ({ faq, active, setActive }) => {
  const isActive = active === faq.id;
  const { language } = useLanguage();

  return (
    <div className="relative">
      <div className="absolute -inset-1">
        <div className="w-full h-full mx-auto opacity-30 blur-lg filter" style={{ background: 'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)' }}></div>
      </div>

      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
        <h3>
          <button
            onClick={() => setActive(isActive ? null : faq.id)}
            aria-expanded={isActive}
            className="flex items-center justify-between w-full px-6 py-5 text-xl font-bold text-left text-gray-900 sm:p-8 font-pj"
          >
            <span>{faq.question}</span>
            <span className="ml-4">
              <svg className="w-6 h-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isActive ? "M20 12H4" : "M12 4v16m8-8H4"} />
              </svg>
            </span>
          </button>
        </h3>

        {isActive && (
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            {faq.answer}
          </div>
        )}
      </div>
    </div>
  );
};

const FAQ = () => {
  const [active, setActive] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].faq;

  const faqList = seeMore ? [...t.initialFaqList, ...t.additionalFaqList] : t.initialFaqList;

  const handleSeeMore = () => {
    setSeeMore(true);
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">{t.title}</h2>
          <p className="max-w-lg mx-auto mt-6 text-base text-gray-600 font-pj">{t.description}</p>
        </div>

        <div className="max-w-4xl mx-auto mt-8 sm:mt-14 space-y-4">
          {faqList.map((faq) => (
            <FAQItem key={faq.id} faq={faq} active={active} setActive={setActive} />
          ))}
        </div>

        {!seeMore && (
          <div className="text-center mt-6">
            <button
              onClick={handleSeeMore}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              {t.seeMore}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
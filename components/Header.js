// File: components/Header.js
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../locales/translations';
import logo from "@/app/icon.png";
import config from "@/config";

const Header = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].header;

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  const links = [
    {
      href: "/#pricing",
      label: t.pricing,
    },
    {
      href: "/#testimonials",
      label: t.reviews,
    },
    {
      href: "/#faq",
      label: t.faq,
    },
  ];

  const cta = (
    <ButtonSignin
      extraStyle="inline-flex items-center justify-center w-full px-8 py-2 text-lg text-white transition-all duration-200 bg-gray-900 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
      buttonText={t.signIn}
    />
  );

  return (
    <header className="bg-gray-50" >
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} ${t.homepage}`}
          >
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
          <div className="ml-4 hidden lg:block"> {/* Added margin and hidden on mobile */}
            <LanguageToggle />
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">{t.openMenu}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="link link-hover" title={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
      </nav>
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2 shrink-0" title={`${config.appName} ${t.homepage}`} href="/">
              <Image src={logo} alt={`${config.appName} ${t.logo}`} className="w-8" placeholder="blur" priority={true} width={32} height={32} />
              <span className="font-extrabold text-lg">{config.appName}</span>
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5" onClick={() => setIsOpen(false)}>
              <span className="sr-only">{t.closeMenu}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link href={link.href} key={link.href} className="link link-hover" title={link.label}>
                    {link.label}
                  </Link>
                ))}
                <LanguageToggle /> {/* LanguageToggle in mobile menu */}
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col">{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
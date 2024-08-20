// File: app/dashboard/DashNav.js
"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ButtonAccount from "@/components/ButtonAccount";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from '../../contexts/LanguageContext';
import { dashboardTranslations } from '../../locales/dashboardTranslations';
import config from "@/config";

const DashNav = () => {
  const { data: session, status } = useSession();
  const { language } = useLanguage();
  const t = dashboardTranslations[language]?.nav || dashboardTranslations.en.nav;
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  if (status === "loading") {
    return null; // Or a loading spinner
  }

  if (status !== "authenticated") {
    return null;
  }

  const links = [
    {
      href: "/dashboard",
      label: t.resumes,
    },
    // Uncomment these if you want to add them back
    // {
    //   href: "/dashboard/cover-letters",
    //   label: t.coverLetters,
    // },
    // {
    //   href: "/dashboard/job-tracker",
    //   label: t.jobTracker,
    // },
  ];

  return (
    <header className="bg-gray-50">
      <nav
        className="container flex items-center justify-between px-1 py-1 mx-auto"
        aria-label="Dashboard"
      >
        <div className="flex lg:flex-1 items-center">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/dashboard"
            title={`${config.appName} Dashboard`}
          >
            <span className="font-extrabold text-lg">{config.appName}</span>
          </Link>
          {/* <div className="ml-4 hidden lg:block">
            <LanguageToggle />
          </div> */}
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

        <div className="hidden lg:flex lg:justify-center lg:gap-1 lg:items-center">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="link link-hover" title={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:justify-end lg:flex-1 items-center">
          <span className="mr-4">{t.hello}, {session?.user?.name}</span>
          <ButtonAccount />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2 shrink-0" title={`${config.appName} Dashboard`} href="/dashboard">
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
                <LanguageToggle />
              </div>
            </div>
            <div className="divider"></div>
            <div className="flex flex-col">
              <span className="mb-4">{t.hello}, {session?.user?.name}</span>
              <ButtonAccount />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashNav;
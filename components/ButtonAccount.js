/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import apiClient from "@/libs/api";
import styled from 'styled-components';
import Link from 'next/link';
import LanguageToggle from "@/components/LanguageToggle";

// Styled components
const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

const AccountButton = styled(Popover.Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: #333333;
  padding: 0.025rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }

  @media (min-width: 640px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1024px) {
    width: 3.0rem;
    height: 3.0rem;
  }
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  border: 2px solid #e5e7eb;
  object-fit: cover;
`;

const UserInitial = styled.span`
  width: 100%;
  height: 100%;
  background-color: #4b5563;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;

  @media (min-width: 640px) {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const DropdownPanel = styled(Popover.Panel)`
  position: absolute;
  right: 0;
  z-index: 10;
  margin-top: 0.75rem;
  width: 10rem;
  transform-origin: top right;
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  height: auto; /* Adjust this value as needed */
`;

const LanguageToggleWrapper = styled.div`
  margin: 0 20px;
  height: auto; /* Ensure the height is set to auto */
`;


const DropdownContent = styled.div`
  padding: 0.25rem;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.logout ? 'rgba(239, 68, 68, 0.1)' : '#f3f4f6'};
    color: ${props => props.logout ? '#ef4444' : '#111827'};
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`;



const ButtonAccount = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleBilling = async () => {
    setIsLoading(true);

    try {
      const { url } = await apiClient.post("/stripe/create-portal", {
        returnUrl: window.location.href,
      });

      window.location.href = url;
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  };

  if (status === "unauthenticated") return null;

  return (
    <Popover className="relative z-10">
      {({ open }) => (
        <>
          <AccountButton>
            {session?.user?.image ? (
              <UserImage
                src={session.user.image}
                alt={session.user.name || "Account"}
                referrerPolicy="no-referrer"
              />
            ) : (
              <UserInitial>
                {session?.user?.name?.charAt(0) ||
                  session?.user?.email?.charAt(0)}
              </UserInitial>
            )}
            {isLoading && (
              <span className="loading loading-spinner loading-xs absolute"></span>
            )}
          </AccountButton>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DropdownPanel>
              <DropdownContent>
              <LanguageToggleWrapper>
                  <LanguageToggle />
                </LanguageToggleWrapper>
                <DropdownButton onClick={handleBilling}>
                  <IconWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.5 4A1.5 1.5 0 001 5.5V6h18v-.5A1.5 1.5 0 0017.5 4h-15zM19 8.5H1v6A1.5 1.5 0 002.5 16h15a1.5 1.5 0 001.5-1.5v-6zM3 13.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm4.75-.75a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                  Billing
                </DropdownButton>
 
                <DropdownLink href="/dashboard">
                  <IconWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                    </svg>
                  </IconWrapper>
                  My Documents
                </DropdownLink>
                <DropdownButton onClick={handleSignOut} logout>
                  <IconWrapper>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                  Logout
                </DropdownButton>
    
              </DropdownContent>
            </DropdownPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ButtonAccount;

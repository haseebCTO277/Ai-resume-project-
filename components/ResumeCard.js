// File: components/ResumeCard.js
"use client";

import React from 'react';
import Link from "next/link";
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { dashboardTranslations } from '../locales/dashboardTranslations';

const Card = styled(Link)`
  display: block;
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Info = styled.p`
  margin-bottom: 10px;
`;

const ResumeCard = ({ resume }) => {
  const { language } = useLanguage();
  const t = dashboardTranslations[language]?.resumeCard || dashboardTranslations.en.resumeCard;

  if (!resume) {
    return null;
  }

  return (
    <Card href={`/dashboard/resume/${resume._id}`}>
      <Title>{t.color}: {resume.color}</Title>
      {/* <Info>{t.age}: {resume.age}</Info> */}
      <Info>{t.createdAt}: {new Date(resume.createdAt).toLocaleString(language)}</Info>
    </Card>
  );
};

export default ResumeCard;
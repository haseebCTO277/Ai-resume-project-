//app/dashboard/page.js


"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from 'styled-components';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaPlus } from 'react-icons/fa';
import DashNav from "./DashNav";
import ResumeList from "@/components/ResumeList";
import { useSession } from "next-auth/react";
import { useLanguage } from '../../contexts/LanguageContext';
import { dashboardTranslations } from '../../locales/dashboardTranslations';
import LanguageToggle from "@/components/LanguageToggle";



const DashboardContainer = styled.main`
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #333;
`;

const Header = styled.header`
  background-color: #fff;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Content = styled.section`
  padding: 2rem;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Title = styled.h1`
  font-size: 2xl;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const StatItem = styled.span`
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const DocumentsContainer = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DocumentsHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DocumentsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0ea5e9;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  font-size: 1.25rem;
  transition: all 0.3s ease;
  width: 100%;
  height: 12rem;
  background-color: #ffffff;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (min-width: 640px) {
    width: 16rem;
  }

  &:hover {
    transform: translateY(-4px);
    background-color: #f3f4f6;
  }
`;

const ButtonText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const { language } = useLanguage();
  const t = dashboardTranslations[language] || dashboardTranslations.en;

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
    fetchDocuments();
  }, [session]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("/api/cover-letters", { withCredentials: true });
      setResumes(response.data.data.resumes);
      setCoverLetters(response.data.data.coverLetters);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError(t.errors?.fetchDocuments || "Failed to load documents");
      setLoading(false);
    }
  };

  const generateRandomData = (language = 'en') => {
    const t = dashboardTranslations[language] || dashboardTranslations.en;
    
    const skills = t.skills || ["JavaScript", "React", "Node.js", "Python", "SQL", "HTML", "CSS", "Git", "Agile", "TypeScript"];
    const hobbies = t.hobbies || ["Photography", "Hiking", "Playing guitar"];
    const software = t.software || ["Visual Studio Code", "Docker", "Jira", "Slack"];
  
    return {
      professionalTitle: t.professionalTitle || "Software Developer",
      linkedin: t.linkedin || "https://www.linkedin.com/in/johndoe",
      location: t.location || "New York, NY",
      phone: t.phone || "+1 (555) 123-4567",
      summary: t.summary || "Dynamic AI specialist with a knack for supercharging businesses through cutting-edge AI solutions. Known for turning complex data into streamlined marketing, operations, and customer service strategies, I craft custom reports and action plans to boost efficiency and brand enhancement. Unleashing competitive edge, one AI-powered giggle at a time.",
      experiences: [
        {
          position: t.seniorDeveloperPosition || "Senior Developer",
          company: t.seniorDeveloperCompany || "Tech Solutions Inc.",
          location: t.seniorDeveloperLocation || "New York, NY",
          duration: t.seniorDeveloperDuration || "2019 - Present",
          responsibilities: t.seniorDeveloperResponsibilities || [
            "• Led a team of 5 developers in designing and implementing new features",
            "• Optimized database queries, resulting in a 30% improvement in application performance",
            "• Implemented automated testing, increasing code coverage by 40%",
            "• Developed and maintained client-side applications using React",
            "• Collaborated with UX designers to implement responsive designs",
            "• Participated in code reviews and contributed to team documentation",
          ]
        },
        {
          position: t.juniorDeveloperPosition || "Junior Developer",
          company: t.juniorDeveloperCompany || "StartUp Innovations",
          location: t.juniorDeveloperLocation || "San Francisco, CA",
          duration: t.juniorDeveloperDuration || "2017 - 2019",
          responsibilities: t.juniorDeveloperResponsibilities || [
            "Developed and maintained client-side applications using React",
            "Collaborated with UX designers to implement responsive designs",
            "Participated in code reviews and contributed to team documentation",
            "• Led a team of 5 developers in designing and implementing new features",
            "• Optimized database queries, resulting in a 30% improvement in application performance",
          ]
        }
      ],
      education: [
        {
          institution: t.bachelorInstitution || "University of Hail",
          graduationYear: t.bachelorGraduationYear || "2017",
          degree: t.bachelorDegree || "Bachelor of Science in Computer Science"
        },
        {
          institution: t.certificateInstitution || "Harvard University",
          graduationYear: t.certificateGraduationYear || "2020",
          degree: t.certificateDegree || "Advanced Certificate in Cloud Computing"
        }
      ],
      skills: skills.sort(() => 0.5 - Math.random()).slice(0, 7),
      hobbies: hobbies,
      software: software,
      languages: t.languages || ["English (Native)", "Spanish (Intermediate)"],
      certificates: [
        { name: t.awsCertificate || "AWS Certified Developer", year: "2021" },
        { name: t.scrumCertificate || "Scrum Master Certification", year: "2020" }
      ]
    };
  };

  const createResume = async () => {
    try {
      if (!user) {
        console.error("User data not available");
        return;
      }

      console.log("Current user data:", user);

      const randomData = generateRandomData(language);
      const resumeData = {
        fullName: user.name || t.defaultName || "John Doe",
        email: user.email || t.defaultEmail || "johndoe@example.com",
        resumeColor: "#0000FF",
        fontFamily: "Courier New",
        theme: "BlueAndWhite",
        ...randomData
      };

      console.log("Resume data being sent:", resumeData);

      const response = await axios.post("/api/resumes", resumeData, { withCredentials: true });
      const newResumeId = response.data.data._id;
      router.push(`/dashboard/resume/${newResumeId}`);
    } catch (error) {
      console.error(t.errors?.createResume || "Error creating resume:", error);
    }
  };

  const createCoverLetter = async () => {
    try {
      const response = await axios.post("/api/cover-letters", {}, { withCredentials: true });
      const newCoverLetterId = response.data.data._id;
      router.push(`/dashboard/cover-letter/${newCoverLetterId}`);
    } catch (error) {
      console.error("Error creating cover letter:", error);
    }
  };

  const handleDelete = async (id, type) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/${type.toLowerCase()}s/${id}`, { withCredentials: true });
        alert(`${type} deleted successfully!`);
        fetchDocuments();
      } catch (error) {
        console.error(`Error deleting ${type.toLowerCase()}:`, error);
      }
    }
  };

  if (loading) return <div>{t.loading || 'Loading...'}</div>;
  if (error) return <div>{error}</div>;

  return (
    <DashboardContainer>
      <Header>
        <DashNav />
        {/* <LanguageToggle /> */}
      </Header>
      <Content>
        <HeaderContent>
          <Title>{t.title || 'Documents'}</Title>
          <Stats>
            <StatItem>
              {t.stats?.documentsCreated || 'Documents Created'}: {resumes.length + coverLetters.length}/18
            </StatItem>
            <StatItem>
              {t.stats?.sort || 'Sort'}: <a href="#" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>{t.stats?.date || 'Date'}</a> A-Z
            </StatItem>
          </Stats>
        </HeaderContent>
        <DocumentsContainer>
          <DocumentsHeader>
            <DocumentsTitle>
              {t.documentsList?.title || 'Default'} ({resumes.length + coverLetters.length}/18)
            </DocumentsTitle>
            <ButtonContainer>
              <StyledButton onClick={createResume}>
                <FaPlus />
                <ButtonText>{t.documentsList?.createResume || '+ Resume'}</ButtonText>
              </StyledButton>
              {/* <StyledButton onClick={createCoverLetter}>
                <FaPlus />
                <ButtonText>{t.documentsList?.createCoverLetter || '+ Cover Letter'}</ButtonText>
              </StyledButton> */}
            </ButtonContainer>
          </DocumentsHeader>
          <ResumeList resumes={resumes} coverLetters={coverLetters} onDelete={handleDelete} />
        </DocumentsContainer>
      </Content>
    </DashboardContainer>
  );
};

export default Dashboard;
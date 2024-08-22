// File: components/ResumeList.js

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { dashboardTranslations } from '../locales/dashboardTranslations';


const ListContainer = styled.div`
  margin-top: 2rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const DocumentCount = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
  color: #333;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const SortSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: white;
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
`;

const DocumentCard = styled.div`
  position: relative;
  padding: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  color: #1f2937;
  border: 2px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.type === "Resume" ? "#14b8a6" : "#f97316"};
  }
`;

const DocumentBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
`;

const DocumentType = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #6b7280;
  opacity: 0;
  transition: opacity 0.3s;
`;

const DocumentTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const DocumentInfo = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const EditLink = styled.a`
  color: #14b8a6;
  text-decoration: underline;
  font-size: 0.875rem;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: none;
  padding: 0.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  color: #dc2626; 
  ${DocumentCard}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
const ClickableDocumentTitle = styled(DocumentTitle)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const ColorIcon = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  vertical-align: middle;
`;

export default function ResumeList({ resumes, coverLetters, onDelete }) {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hoveredDocument, setHoveredDocument] = useState(null);

  const { language } = useLanguage();
  const t = {
    ...dashboardTranslations.en.resumeList,
    ...dashboardTranslations[language]?.resumeList
  };
  useEffect(() => {
    const allDocuments = [
      ...resumes.map((resume) => ({ ...resume, type: "Resume" })),
      ...coverLetters.map((coverLetter) => ({ ...coverLetter, type: "Cover Letter" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setDocuments(allDocuments);
    setFilteredDocuments(allDocuments);
    setLoading(false);
  }, [resumes, coverLetters]);

  useEffect(() => {
    let filtered = documents;
    if (sortOption === "Resume") {
      filtered = documents.filter((doc) => doc.type === "Resume");
    } else if (sortOption === "Cover Letter") {
      filtered = documents.filter((doc) => doc.type === "Cover Letter");
    }

    if (searchKeyword) {
      filtered = filtered.filter((doc) =>
        doc.title?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    setFilteredDocuments(filtered);
  }, [sortOption, searchKeyword, documents]);

  const handleDelete = async (id, type) => {
    const confirmDelete = window.confirm(t.deleteConfirm || "Are you sure you want to delete this item?");
    if (confirmDelete) {
      setDocuments(documents.filter((doc) => doc._id !== id));
      setFilteredDocuments(filteredDocuments.filter((doc) => doc._id !== id));
      try {
        const endpoint = type === "Resume" ? "resumes" : "cover-letters";
        await axios.delete(`/api/${endpoint}/${id}`, { withCredentials: true });
        alert((t.deleteSuccess || "{type} deleted successfully!").replace("{type}", type));
      } catch (error) {
        console.error(`Error deleting ${type.toLowerCase()}:`, error);
        alert((t.deleteError || "Error deleting {type}: {message}")
          .replace("{type}", type.toLowerCase())
          .replace("{message}", error.message));
      }
    }
  };

  if (loading) return <div>{t.loading || "Loading..."}</div>;
  if (error) return <div>{error}</div>;

  const resumeCount = documents.filter((doc) => doc.type === "Resume").length;
  const coverLetterCount = documents.filter((doc) => doc.type === "Cover Letter").length;
  const getEditLink = (document) => `/dashboard/${document.type.toLowerCase().replace(" ", "-")}/${document._id}`;

  return (
    <ListContainer>
      <ListHeader>
        <DocumentCount>
          {t.resumes || "Resumes"}: {resumeCount}, {t.coverLetters || "Cover Letters"}: {coverLetterCount}
        </DocumentCount>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder={t.searchPlaceholder || "Search by title"}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SortSelect
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="All">{t.all || "All"}</option>
            <option value="Resume">{t.resumes || "Resumes"}</option>
            <option value="Cover Letter">{t.coverLetters || "Cover Letters"}</option>
          </SortSelect>
        </SearchContainer>
      </ListHeader>
      <DocumentGrid>
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document._id}
            onMouseEnter={() => setHoveredDocument(document._id)}
            onMouseLeave={() => setHoveredDocument(null)}
            type={document.type}
          >
            <DocumentBadge
              style={{
                backgroundColor: document.type === "Resume" ? "#14b8a6" : "#f97316"
              }}
            >
              {document.type === "Resume" ? "R" : "CL"}
            </DocumentBadge>
            <DocumentType
              style={{
                opacity: hoveredDocument === document._id ? 1 : 0
              }}
            >
              {document.type}
            </DocumentType>
            <Link href={getEditLink(document)} passHref>
              <ClickableDocumentTitle
                style={{
                  color: document.type === "Resume" ? "#14b8a6" : "#f97316"
                }}
              >
                {document.title || `${t.untitled || "Untitled"} ${document.type}`}
              </ClickableDocumentTitle>
            </Link>
{document.type === "Resume" && (
  <DocumentInfo>
    <ColorIcon style={{ backgroundColor: document.resumeColor }} />
    {t.color || "Font"}
  </DocumentInfo>
)}            {/* {document.type === "Resume" && <DocumentInfo>{t.age || "Age"}: {document.age}</DocumentInfo>} */}
            <DocumentInfo>{t.createdAt || "Created At"}: {new Date(document.createdAt).toLocaleDateString(language)}</DocumentInfo>
            <Link href={getEditLink(document)} passHref>
              <EditLink>{t.edit || "Edit"} {document.type}</EditLink>
            </Link>
            {hoveredDocument === document._id && (
              <DeleteButton
                onClick={() => handleDelete(document._id, document.type)}
              >
                🗑️
              </DeleteButton>
            )}
          </DocumentCard>
        ))}
      </DocumentGrid>
    </ListContainer>
  );
}
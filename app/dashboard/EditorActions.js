//Users/mohsinal/airesume-5/app/dashboard/EditorActions.js

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaFacebook, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import { useLanguage } from '../../contexts/LanguageContext';
import { resumeTranslations } from '../../locales/resumeTranslations';



const ToolbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
`;

const ToolbarItem = styled.span`
  display: flex;
  align-items: center;
  color: ${props => props.color || '#333'};
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 15px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  span {
@media (max-width: 640px) {
  font-size: 1.0rem;
  margin-right: 1px;
  padding: 1px;
}
  }
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  min-width: 200px;
`;

const DropdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

const ColorItem = styled.div`
  cursor: pointer;
  padding: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

const FontItem = styled.div`
  cursor: pointer;
  padding: 5px;
  color: ${props => props.color || '#333'};
  transition: background-color 0.3s;
  text-align: center;
  border-radius: 4px;
  font-family: ${props => props.font};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ShareButton = styled(ToolbarItem)`
  position: relative;
`;

const ShareDropdown = styled(DropdownWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

const ShareOptions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 10px;
`;

const ShareIcon = styled.div`
  background-color: #f0f0f0;
  color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ShareLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 4px;
  width: 100%;
`;

const ShareLink = styled.span`
  color: #333;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #00c9a7;
  }
`;


const EditorActions = ({
  onSelectColor,
  onHoverColor,
  onSelectFont,
  onHoverFont,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  colors,
  fonts
}) => {
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const colorDropdownRef = useRef(null);
  const fontDropdownRef = useRef(null);
  const shareDropdownRef = useRef(null);

  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;

  const handleClickOutside = (event) => {
    if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target)) {
      setShowColorDropdown(false);
    }
    if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target)) {
      setShowFontDropdown(false);
    }
    if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target)) {
      setShowShareDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shareText = t.shareText;
  const shareUrl = "https://www.magicalresume.com";

  const handleShare = (platform) => {
    let url = "";
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(t.copyLink);
  };

  return (
    <ToolbarWrapper>
      <ToolbarItem onClick={() => setShowColorDropdown(!showColorDropdown)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
        <span>{t.colors}</span>
        {showColorDropdown && (
          <DropdownWrapper ref={colorDropdownRef}>
            <DropdownGrid>
              {colors.map(color => (
                <ColorItem
                  key={color}
                  onMouseEnter={() => onHoverColor(color)}
                  onClick={() => onSelectColor(color)}
                  style={{ backgroundColor: color }}
                />
              ))}
            </DropdownGrid>
          </DropdownWrapper>
        )}
      </ToolbarItem>
      <ToolbarItem onClick={() => setShowFontDropdown(!showFontDropdown)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
        <span>{t.fonts}</span>
        {showFontDropdown && (
          <DropdownWrapper ref={fontDropdownRef}>
            <DropdownGrid>
              {fonts.map(font => (
                <FontItem
                  key={font}
                  onMouseEnter={() => onHoverFont(font)}
                  onClick={() => onSelectFont(font)}
                  font={font}
                >
                  Aa
                </FontItem>
              ))}
            </DropdownGrid>
          </DropdownWrapper>
        )}
      </ToolbarItem>
      <ToolbarItem
        onClick={onUndo}
        style={{ opacity: canUndo ? 1 : 0.5, cursor: canUndo ? 'pointer' : 'not-allowed' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
        </svg>
        <span>{t.undo}</span>
      </ToolbarItem>
      <ToolbarItem
        onClick={onRedo}
        style={{ opacity: canRedo ? 1 : 0.5, cursor: canRedo ? 'pointer' : 'not-allowed' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
        <span>{t.redo}</span>
      </ToolbarItem>
    </ToolbarWrapper>
  );
};

export default EditorActions;
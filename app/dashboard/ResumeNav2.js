//Users/mohsinal/airesume-5/app/dashboard/ResumeNav.js

import React, { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import styled, { keyframes } from 'styled-components';
import { FaDownload, FaSave, FaWhatsapp, FaFacebook, FaTwitter, FaShare } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';
import ButtonAccount from "@/components/ButtonAccount";
import ThemePdf from "@/components/themes/resume/pdf";
import ButtonCheckout from "@/components/ButtonCheckout";
import axios from 'axios';
import Confetti from './Confetti'; 
import { useLanguage } from '../../contexts/LanguageContext';
import { resumeTranslations } from '../../locales/resumeTranslations';
import LanguageToggle from "@/components/LanguageToggle";
import config from '../../config';

// Styled components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 100%;
  position: fixed;
  top: ${props => props.notificationVisible ? '42px' : '0'};
  left: 0;
  z-index: 1000;
  margin-bottom: 15px;
  transition: top 0.3s ease-in-out;

  @media (max-width: 750px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Logo = styled(Link)`
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 20px;
  text-decoration: none;

  @media (max-width: 750px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  direction: ltr;

  @media (max-width: 750px) {
    flex-direction: row;
    gap: 0.5rem;
    width: auto;
  }
`;

const TopButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 750px) {
    width: 100%;
    justify-content: center;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 4px;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media (max-width: 750px) {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;

    span {
      display: none;
    }
  }
`;

const ShareButton = styled(StyledButton)`
  position: relative;
  color: #333;
  background-color: white;
  border: 2px solid #2196F3;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(33, 150, 243, 0.3);
  transition: all 0.3s ease;
  height: 40px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(33, 150, 243, 0.4);
    background-color: #E3F2FD;
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }

  @media (max-width: 750px) {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 50%;
    
    svg {
      margin-right: 0;
    }
    
    span {
      display: none;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 750px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
`;

const ShareDropdown = styled.div`
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
  display: ${props => props.isVisible ? 'block' : 'none'};
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

const FullWidthNotification = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: white;
  color: #4CAF50;
  border-bottom: 2px solid #4CAF50;
  padding: 10px 0;
  margin: 0;
  z-index: 1001;
  opacity: ${props => props.show ? 1 : 0};
  pointer-events: ${props => props.show ? 'auto' : 'none'};
  transition: opacity 0.5s ease-in-out;
`;

const LanguageToggleWrapper = styled.div`
  margin: 0 10px;
`;

// SubscriptionPopup component
const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;
`;

const PopupHeader = styled.div`
  background-color: #8bc34a;
  color: white;
  padding: 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin: -2rem -2rem 1rem -2rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 1rem 0;
`;

const Price = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4caf50;
  margin: 1rem 0;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: ${props => props.language === 'ar' ? 'right' : 'left'};
  margin: 1rem 0;
  direction: ${props => props.language === 'ar' ? 'rtl' : 'ltr'};
`;

const Feature = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.language === 'ar' ? 'flex-end' : 'flex-start'};

  &::${props => props.language === 'ar' ? 'after' : 'before'} {
    content: '✓';
    color: #4caf50;
    margin-${props => props.language === 'ar' ? 'right' : 'left'}: 0.5rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(52, 152, 219, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 152, 219, 0);
  }
`;

const grayPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(51, 51, 51, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(51, 51, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(51, 51, 51, 0);
  }
`;

const DownloadButton = styled(StyledButton)`
  width: 200px;
  height: 48px;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.userHasAccess ? pulse : grayPulse} 2s infinite;

  @media (max-width: 750px) {
    width: 130px;
    height: 48px;
    padding: 4px;
    border-radius: 12px;
    justify-content: center;

    span {
      display: inline;
      font-size: 0.85rem; // Reduce font size for mobile
    }
  }
`;

const SaveButton = styled(StyledButton)`
  width: 90px;
  height: 48px;
  border-radius: 6px;

  @media (max-width: 750px) {
    width: 90px;
    height: 48px;
    padding: 4px;
    border-radius: 12px;
    justify-content: center;

    span {
      display: inline;
      font-size: 0.8rem; // Reduce font size for mobile
    }
  }
`;

const CheckoutButton = styled(ButtonCheckout)`
  width: 200px;
  height: 48px;
  border-radius: 6px;
  animation: ${props => props.userHasAccess ? pulse : grayPulse} 2s infinite;
  background-color: ${props => props.userHasAccess ? '#3498db' : '#333'};
  color: white;
  cursor: pointer;
  
  @media (max-width: 750px) {
    width: 120px;
    height: 48px;
    padding: 0;
    border-radius: 24px;
    justify-content: center;

    span {
      display: inline;
    }
  }
`;

// SubscriptionPopup component
const SubscriptionPopup = ({ onClose }) => {
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <PopupOverlay>
      <PopupContent ref={popupRef} language={language}>
        <PopupHeader>
          <Title>{t.subscriptionPopup.title}</Title>
        </PopupHeader>
        <Subtitle>{t.subscriptionPopup.subtitle}</Subtitle>
        <Price>{t.subscriptionPopup.price}</Price>

        <CheckoutButton userHasAccess={true}>
          {t.subscribeNow}
        </CheckoutButton>
        
        <FeatureList language={language}>
          {t.subscriptionPopup.features.map((feature, index) => (
            <Feature key={index} language={language}>{feature}</Feature>
          ))}
        </FeatureList>
        <CloseButton onClick={onClose}>{t.subscriptionPopup.closeButton}</CloseButton>
      </PopupContent>
    </PopupOverlay>
  );
};

// ResumeDownloadButton component
const ResumeDownloadButton = ({ userHasAccess, resumeData, sectionsVisibility, hoveredColor, hoveredFont, selectedTheme, showNotification }) => {
  const [showPopup, setShowPopup] = useState(false);
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;

  const handleButtonClick = (e) => {
    if (!userHasAccess) {
      e.preventDefault();
      setShowPopup(true);
    } else {
      showNotification(t.resumeDownloaded);
    }
  };

  return (
    <>
      <PDFDownloadLink
        document={
          <ThemePdf 
            resumeData={resumeData}  
            sectionsVisibility={sectionsVisibility} 
            fullNameColor={hoveredColor || "#000"} 
            fontFamily={hoveredFont} 
            selectedTheme={selectedTheme}
            language={language}
          />
        }
        fileName="resume.pdf"
        key={`pdf-${language}`} 
      >
        {({ blob, url, loading, error }) => (
          <DownloadButton 
            style={{
              backgroundColor: userHasAccess ? '#3498db' : '#333',
              cursor: 'pointer',
            }}
            onClick={handleButtonClick}
            title={t.downloadPDF}
            userHasAccess={userHasAccess}
          >
            <FaDownload />
            <span>{t.downloadPDF}</span>
          </DownloadButton>
        )}
      </PDFDownloadLink>

      {showPopup && <SubscriptionPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};

// Main ResumeNav component
const ResumeNav = ({ 
  resume, 
  sectionsVisibility, 
  hoveredColor, 
  hoveredFont, 
  selectedTheme, 
  handleSave, 
  isSaving 
}) => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const shareDropdownRef = useRef(null);
  const shareButtonRef = useRef(null);
  const [userHasAccess, setUserHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const { language } = useLanguage();
  const t = resumeTranslations[language] || resumeTranslations.en;

  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setNotification({ show: true, message: t.paymentSuccess });
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [searchParams, router, t.paymentSuccess]);

  const handleConfettiComplete = () => {
    setNotification({ show: false, message: '' });
  };

  useEffect(() => {
    const fetchUserAccess = async () => {
      if (session?.user?.id) {
        try {
          const response = await axios.get(`/api/user`);
          if (response.data && response.data.data) {
            setUserHasAccess(response.data.data.hasAccess);
          } else {
            console.error('Unexpected API response structure:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user access:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserAccess();
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const showUserNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const toggleShareDropdown = () => {
    setShowShareDropdown(prevState => !prevState);
  };

  const handleShare = async (platform) => {
    const shareText = t.shareText;
    const shareUrl = "https://www.magicalresume.com";
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
    navigator.clipboard.writeText("https://www.magicalresume.com");
    showUserNotification(t.copyLink);
  };

  const handleSaveWrapper = async () => {
    await handleSave();
    showUserNotification(t.resumeSaved);
  };

  if (status === "loading" || isLoading) {
    return <div>{t.loading}</div>;
  }

  if (status !== "authenticated") {
    return <div>{t.signInPrompt}</div>;
  }

  return (
    <>
      <Nav style={{ direction: 'ltr' }} notificationVisible={notification.show}>
        <Logo href="/">{t.logo}</Logo>
        <ButtonContainer>
          <ResumeDownloadButton 
            userHasAccess={userHasAccess}
            resumeData={resume}
            sectionsVisibility={sectionsVisibility}
            hoveredColor={hoveredColor}
            hoveredFont={hoveredFont}
            selectedTheme={selectedTheme}
            showNotification={showUserNotification}
          />
        
          <SaveButton
            onClick={handleSaveWrapper}
            style={{ backgroundColor: '#2ecc71' }}
            title={t.save}
          >
            <FaSave />
            <span>{t.save}</span>
          </SaveButton>

          <ShareButton onClick={toggleShareDropdown} ref={shareButtonRef} title={t.share}>
            <FaShare />
            <span>{t.share}</span>
          </ShareButton>
          {showShareDropdown && (
            <ShareDropdown ref={shareDropdownRef} isVisible={showShareDropdown}>
              <ShareOptions>
                <ShareIcon onClick={() => handleShare("whatsapp")}>
                  <FaWhatsapp />
                </ShareIcon>
                <ShareIcon onClick={() => handleShare("facebook")}>
                  <FaFacebook />
                </ShareIcon>
                <ShareIcon onClick={() => handleShare("twitter")}>
                  <FaTwitter />
                </ShareIcon>
              </ShareOptions>
              <ShareLinkWrapper>
                <ShareLink>https://www.magicalresume.com</ShareLink>
                <CopyButton onClick={handleCopyLink}>
                  <MdContentCopy />
                </CopyButton>
              </ShareLinkWrapper>
            </ShareDropdown>
          )}
        </ButtonContainer>
        <RightContainer language={language}>
          <ButtonAccount className="shrink-0 w-10 h-10" />
        </RightContainer>
      </Nav>
      <FullWidthNotification show={notification.show}>
        {notification.message}
      </FullWidthNotification>
      {notification.show && notification.message === t.paymentSuccess && (
        <Confetti onComplete={handleConfettiComplete} />
      )}
    </>
  );
};

export default ResumeNav;
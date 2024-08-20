import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.5s ease-in-out;
  background-color: ${props => {
    switch(props.type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      default: return '#2196F3';
    }
  }};
  color: white;
  z-index: 1000;
`;

const NotificationIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const NotificationMessage = styled.span`
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  font-size: 16px;
`;

const Notification = ({ message, type, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch(type) {
      case 'success': return faCheckCircle;
      case 'error': return faExclamationCircle;
      default: return faInfoCircle;
    }
  };

  return (
    <NotificationWrapper type={type} isClosing={isClosing}>
      <NotificationIcon icon={getIcon()} />
      <NotificationMessage>{message}</NotificationMessage>
      <CloseButton onClick={() => setIsClosing(true)}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseButton>
    </NotificationWrapper>
  );
};

export default Notification;
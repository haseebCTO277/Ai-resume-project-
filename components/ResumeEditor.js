import React, { useState } from 'react';

const ResumeEditor = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [resumeData, setResumeData] = useState({
    fullName: 'John Doe',
    professionalTitle: 'Software Engineer',
    contactInfo: 'john.doe@example.com',
    summary: 'Experienced software engineer with a passion for developing innovative programs...',
    experience: 'Company A - Software Developer - 2018-2021',
    education: 'University B - B.Sc. in Computer Science - 2014-2018',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData({ ...resumeData, [name]: value });
  };

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div style={styles.a4Container}>
      <button onClick={toggleEditable} style={styles.saveButton}>
        {isEditable ? 'Save' : 'Edit'}
      </button>
      <div style={styles.content}>
        <div>
          <label>Full Name:</label>
          {isEditable ? (
            <input
              type="text"
              name="fullName"
              value={resumeData.fullName}
              onChange={handleInputChange}
              style={styles.input}
            />
          ) : (
            <p>{resumeData.fullName}</p>
          )}
        </div>
        <div>
          <label>Professional Title:</label>
          {isEditable ? (
            <input
              type="text"
              name="professionalTitle"
              value={resumeData.professionalTitle}
              onChange={handleInputChange}
              style={styles.input}
            />
          ) : (
            <p>{resumeData.professionalTitle}</p>
          )}
        </div>
        <div>
          <label>Contact Info:</label>
          {isEditable ? (
            <input
              type="text"
              name="contactInfo"
              value={resumeData.contactInfo}
              onChange={handleInputChange}
              style={styles.input}
            />
          ) : (
            <p>{resumeData.contactInfo}</p>
          )}
        </div>
        <div>
          <label>Summary:</label>
          {isEditable ? (
            <textarea
              name="summary"
              value={resumeData.summary}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          ) : (
            <p>{resumeData.summary}</p>
          )}
        </div>
        <div>
          <label>Experience:</label>
          {isEditable ? (
            <textarea
              name="experience"
              value={resumeData.experience}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          ) : (
            <p>{resumeData.experience}</p>
          )}
        </div>
        <div>
          <label>Education:</label>
          {isEditable ? (
            <textarea
              name="education"
              value={resumeData.education}
              onChange={handleInputChange}
              style={styles.textarea}
            />
          ) : (
            <p>{resumeData.education}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  a4Container: {
    width: '210mm',
    minHeight: '297mm',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  saveButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#00c9a7',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    resize: 'vertical',
  },
};

export default ResumeEditor;

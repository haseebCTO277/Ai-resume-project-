// components/Dashboard.js
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

const EditableField = ({ value, onSave, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleSave = () => {
    onSave(fieldName, editedValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center">
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          className="border rounded px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleSave} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save
        </button>
        <button 
          onClick={() => setIsEditing(false)} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <span className="mr-2">{value}</span>
      <button 
        onClick={() => setIsEditing(true)} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Edit
      </button>
    </div>
  );
};

const EditableArrayField = ({ values, onSave, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState(values);

  const handleSave = () => {
    onSave(fieldName, editedValues);
    setIsEditing(false);
  };

  const handleAddItem = () => {
    setEditedValues([...editedValues, '']);
  };

  const handleRemoveItem = (index) => {
    setEditedValues(editedValues.filter((_, i) => i !== index));
  };

  if (isEditing) {
    return (
      <div>
        {editedValues.map((value, index) => (
          <div key={index} className="mb-2 flex items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                const newValues = [...editedValues];
                newValues[index] = e.target.value;
                setEditedValues(newValues);
              }}
              className="border rounded px-2 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => handleRemoveItem(index)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          onClick={handleAddItem}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Item
        </button>
        <button 
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save
        </button>
        <button 
          onClick={() => setIsEditing(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <span className="mr-2">{values.join(', ')}</span>
      <button 
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Edit
      </button>
    </div>
  );
};

const EditableExperienceField = ({ experiences, onSave, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperiences, setEditedExperiences] = useState(experiences);

  const handleSave = () => {
    onSave(fieldName, editedExperiences);
    setIsEditing(false);
  };

  const handleAddExperience = () => {
    setEditedExperiences([...editedExperiences, { 
      position: '', 
      company: '', 
      location: '', 
      duration: '', 
      responsibilities: [''],
      company_linkedin_profile_url: '',
      logo_url: ''
    }]);
  };

  const handleRemoveExperience = (index) => {
    setEditedExperiences(editedExperiences.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...editedExperiences];
    newExperiences[index][field] = value;
    setEditedExperiences(newExperiences);
  };

  const handleAddResponsibility = (expIndex) => {
    const newExperiences = [...editedExperiences];
    newExperiences[expIndex].responsibilities.push('');
    setEditedExperiences(newExperiences);
  };

  const handleRemoveResponsibility = (expIndex, respIndex) => {
    const newExperiences = [...editedExperiences];
    newExperiences[expIndex].responsibilities = newExperiences[expIndex].responsibilities.filter((_, i) => i !== respIndex);
    setEditedExperiences(newExperiences);
  };

  if (isEditing) {
    return (
      <div>
        {editedExperiences.map((exp, expIndex) => (
          <div key={expIndex} className="mb-4 p-4 border rounded">
            <input
              type="text"
              value={exp.position}
              onChange={(e) => handleExperienceChange(expIndex, 'position', e.target.value)}
              placeholder="Position"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.company}
              onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
              placeholder="Company"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.location}
              onChange={(e) => handleExperienceChange(expIndex, 'location', e.target.value)}
              placeholder="Location"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.duration}
              onChange={(e) => handleExperienceChange(expIndex, 'duration', e.target.value)}
              placeholder="Duration"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.company_linkedin_profile_url}
              onChange={(e) => handleExperienceChange(expIndex, 'company_linkedin_profile_url', e.target.value)}
              placeholder="Company LinkedIn URL"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.logo_url}
              onChange={(e) => handleExperienceChange(expIndex, 'logo_url', e.target.value)}
              placeholder="Logo URL"
              className="border rounded px-2 py-1 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <h4 className="font-bold mb-2">Responsibilities:</h4>
              {exp.responsibilities.map((resp, respIndex) => (
                <div key={respIndex} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => {
                      const newExperiences = [...editedExperiences];
                      newExperiences[expIndex].responsibilities[respIndex] = e.target.value;
                      setEditedExperiences(newExperiences);
                    }}
                    className="border rounded px-2 py-1 mr-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    onClick={() => handleRemoveResponsibility(expIndex, respIndex)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                onClick={() => handleAddResponsibility(expIndex)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add Responsibility
              </button>
            </div>
            <button 
              onClick={() => handleRemoveExperience(expIndex)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded mt-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Remove Experience
            </button>
          </div>
        ))}
        <button 
          onClick={handleAddExperience}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Experience
        </button>
        <button 
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save
        </button>
        <button 
          onClick={() => setIsEditing(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-2">
          <strong>{exp.position}</strong> at {exp.company}, {exp.location} ({exp.duration})
        </div>
      ))}
      <button 
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
      >
        Edit
      </button>
    </div>
  );
};

const ResumeDetails = ({ resume, onClose, onSave }) => {
  const modalRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSave = (fieldName, value) => {
    onSave(resume._id, fieldName, value);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div ref={modalRef} className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{resume.fullName}&apos;s Resume</h3>
          <div className="mt-2 px-7 py-3">
            <p><strong>Full Name:</strong> <EditableField value={resume.fullName} onSave={handleSave} fieldName="fullName" /></p>
            <p><strong>Professional Title:</strong> <EditableField value={resume.professionalTitle} onSave={handleSave} fieldName="professionalTitle" /></p>
            <p><strong>Email:</strong> <EditableField value={resume.email} onSave={handleSave} fieldName="email" /></p>
            <p><strong>Phone:</strong> <EditableField value={resume.phone} onSave={handleSave} fieldName="phone" /></p>
            <p><strong>Location:</strong> <EditableField value={resume.location} onSave={handleSave} fieldName="location" /></p>
            <p><strong>LinkedIn:</strong> <EditableField value={resume.linkedin} onSave={handleSave} fieldName="linkedin" /></p>
            <p><strong>Summary:</strong> <EditableField value={resume.summary} onSave={handleSave} fieldName="summary" /></p>
            
            <h4 className="font-semibold mt-4">Experiences:</h4>
            <EditableExperienceField experiences={resume.experiences} onSave={handleSave} fieldName="experiences" />
            
            <h4 className="font-semibold mt-4">Skills:</h4>
            <EditableArrayField values={resume.skills} onSave={handleSave} fieldName="skills" />
            
            <h4 className="font-semibold mt-4">Hobbies:</h4>
            <EditableArrayField values={resume.hobbies} onSave={handleSave} fieldName="hobbies" />
            
            <h4 className="font-semibold mt-4">Software:</h4>
            <EditableArrayField values={resume.software} onSave={handleSave} fieldName="software" />
            
            <h4 className="font-semibold mt-4">Languages:</h4>
            <EditableArrayField values={resume.languages} onSave={handleSave} fieldName="languages" />
            
            <h4 className="font-semibold mt-4">Certificates:</h4>
            <EditableArrayField values={resume.certificates} onSave={handleSave} fieldName="certificates" />
            
            <h4 className="font-semibold mt-4">Extra Section:</h4>
            <EditableArrayField values={resume.extraSection} onSave={handleSave} fieldName="extraSection" />
            
            <p><strong>Resume Color:</strong> <EditableField value={resume.resumeColor} onSave={handleSave} fieldName="resumeColor" /></p>
            <p><strong>Font Family:</strong> <EditableField value={resume.fontFamily} onSave={handleSave} fieldName="fontFamily" /></p>
            <p><strong>Age:</strong> <EditableField value={resume.age?.toString()} onSave={handleSave} fieldName="age" /></p>
            <p><strong>Theme:</strong> <EditableField value={resume.theme} onSave={handleSave} fieldName="theme" /></p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out transform hover:scale-105"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccessDropdown = ({ value, onSave }) => {
  const handleChange = (e) => {
    onSave('hasAccess', e.target.value === 'Yes');
  };

  return (
    <select 
      value={value ? 'Yes' : 'No'} 
      onChange={handleChange}
      className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({ users: [], resumes: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isUsersExpanded, setIsUsersExpanded] = useState(true);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch dashboard data');
      }
      const result = await response.json();
      console.log('Fetched dashboard data:', result);
      // Check if users array exists and has the expected fields
      if (result.users && Array.isArray(result.users)) {
        const sampleUser = result.users[0];
        console.log('Sample user data:', sampleUser);
        if (!sampleUser.country || !sampleUser.language) {
          console.warn('Country or language field missing in user data');
        }
      }
      setData(result);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/dashboard/user/${userId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete user');
        }
        
        const result = await response.json();
        console.log('Delete user result:', result);
        
        // Update the local state to remove the deleted user
        setData(prevData => ({
          ...prevData,
          users: prevData.users.filter(user => user._id !== userId)
        }));
        
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(`Failed to delete user: ${error.message}`);
      }
    }
  };

  const handleUserClick = async (userId) => {
    try {
      const response = await fetch(`/api/dashboard?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user resumes');
      }
      const result = await response.json();
      console.log('Fetched user resumes:', result);
      setUserResumes(result.resumes);
      setSelectedUser(userId === selectedUser ? null : userId);
    } catch (error) {
      console.error('Error fetching user resumes:', error);
      alert('Failed to fetch user resumes. Please try again.');
    }
  };

  const handleResumeClick = async (resumeId) => {
    try {
      const response = await fetch(`/api/dashboard?resumeId=${resumeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume details');
      }
      const result = await response.json();
      console.log('Fetched resume details:', result);
      setSelectedResume(result.resume);
    } catch (error) {
      console.error('Error fetching resume details:', error);
      alert('Failed to fetch resume details. Please try again.');
    }
  };

  const handleSaveUser = async (userId, fieldName, value) => {
    try {
      const response = await fetch(`/api/dashboard/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [fieldName]: value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      console.log('User update result:', result);

      setData(prevData => ({
        ...prevData,
        users: prevData.users.map(user => 
          user._id === userId ? { ...user, [fieldName]: value } : user
        )
      }));

      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    }
  };

  const handleSaveResume = async (resumeId, fieldName, value) => {
    try {
      const response = await fetch(`/api/dashboard/resume/${resumeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [fieldName]: value }),
      });

      if (!response.ok) {
        throw new Error('Failed to update resume');
      }

      const result = await response.json();
      console.log('Resume update result:', result);

      setSelectedResume(prevResume => ({
        ...prevResume,
        [fieldName]: value
      }));

      setUserResumes(prevResumes => 
        prevResumes.map(resume => 
          resume._id === resumeId ? { ...resume, [fieldName]: value } : resume
        )
      );

      alert('Resume updated successfully!');
    } catch (error) {
      console.error('Error updating resume:', error);
      alert('Failed to update resume. Please try again.');
    }
  };

// Update the sortedUsers useMemo
const sortedUsers = useMemo(() => {
  return [...data.users].sort((a, b) => {
    if (sortField === 'createdAt') {
      return sortDirection === 'desc' 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (['name', 'email', 'country', 'language'].includes(sortField)) {
      const aValue = (a[sortField] || '').toLowerCase();
      const bValue = (b[sortField] || '').toLowerCase();
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (sortField === 'hasAccess') {
      return sortDirection === 'asc'
        ? (a[sortField] === b[sortField] ? 0 : a[sortField] ? -1 : 1)
        : (a[sortField] === b[sortField] ? 0 : b[sortField] ? -1 : 1);
    }
    if (sortField === 'emptyProfessionalTitle') {
      const aEmpty = !a.resumes || a.resumes.every(resume => !resume.professionalTitle);
      const bEmpty = !b.resumes || b.resumes.every(resume => !resume.professionalTitle);
      return sortDirection === 'asc'
        ? (aEmpty === bEmpty ? 0 : aEmpty ? -1 : 1)
        : (aEmpty === bEmpty ? 0 : bEmpty ? -1 : 1);
    }
    return 0;
  });
}, [data.users, sortField, sortDirection]);

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(user => 
      user[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedUsers, searchField, searchTerm]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const metrics = useMemo(() => {
    const totalUsers = data.users.length;
    const totalResumes = data.resumes ? data.resumes.length : 0;
    const usersWithMostResumes = [...data.users]
      .sort((a, b) => (b.resumes?.length || 0) - (a.resumes?.length || 0))
      .slice(0, 5)
      .map(user => ({
        _id: user._id,
        name: user.name,
        resumeCount: user.resumes?.length || 0
      }));
    
    const usersWithEmptyProfessionalTitle = data.users.filter(user => 
      !user.resumes || user.resumes.every(resume => !resume.professionalTitle)
    ).length;

    const sortedUserCount = filteredUsers.length;

    return { totalUsers, totalResumes, usersWithMostResumes, usersWithEmptyProfessionalTitle, sortedUserCount };
  }, [data, filteredUsers]);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
{/* Metrics Section */}
<div className="mb-8 bg-white shadow-lg rounded-lg p-4">
  <h2 className="text-xl font-semibold mb-4">Metrics</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <p className="font-bold">Total Users: {metrics.totalUsers}</p>
      <p className="font-bold">Total Resumes: {metrics.totalResumes}</p>
    </div>

  </div>
</div>

      {/* Search and Sort Section */}
      <div className="mb-4 flex flex-wrap items-center space-x-4">
        <input
          type="text"
          placeholder={`Search by ${searchField}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <button 
          className="w-full text-xl font-semibold bg-blue-600 text-white p-4 text-left flex justify-between items-center"
          onClick={() => setIsUsersExpanded(!isUsersExpanded)}
        >
          Users
          <span>{isUsersExpanded ? '▼' : '▶'}</span>
        </button>
        {isUsersExpanded && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('country')}>
                    Country {sortField === 'country' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('language')}>
                    Language {sortField === 'language' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('hasAccess')}>
                    Has Access {sortField === 'hasAccess' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Joined Date {sortField === 'createdAt' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user) => (
                  <React.Fragment key={user._id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedUser === user._id ? 'bg-blue-100' : ''}`}
                      onClick={() => handleUserClick(user._id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <EditableField value={user.name} onSave={(fieldName, value) => handleSaveUser(user._id, fieldName, value)} fieldName="name" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <EditableField value={user.email} onSave={(fieldName, value) => handleSaveUser(user._id, fieldName, value)} fieldName="email" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <EditableField value={user.country || 'N/A'} onSave={(fieldName, value) => handleSaveUser(user._id, fieldName, value)} fieldName="country" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <EditableField value={user.language || 'N/A'} onSave={(fieldName, value) => handleSaveUser(user._id, fieldName, value)} fieldName="language" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AccessDropdown 
                          value={user.hasAccess} 
                          onSave={(fieldName, value) => handleSaveUser(user._id, fieldName, value)} 
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{format(new Date(user.createdAt), 'PPP')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleDeleteUser(user._id, e)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Delete
                        </button>
                        </td>
                      </tr>
                      {selectedUser === user._id && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4">
                            <div className="bg-gray-100 p-4 rounded-lg">
                              <h3 className="text-lg font-semibold mb-2">User Resumes</h3>
                              {userResumes.length > 0 ? (
                                <div className="overflow-x-auto max-h-64 overflow-y-auto">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-white sticky top-0">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professional Title</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {userResumes.map((resume) => (
                                        <tr key={resume._id} className="hover:bg-gray-50">
                                          <td className="px-4 py-2 whitespace-nowrap">{resume.fullName}</td>
                                          <td className="px-4 py-2 whitespace-nowrap">{resume.professionalTitle}</td>
                                          <td className="px-4 py-2 whitespace-nowrap">{format(new Date(resume.createdAt), 'PPP')}</td>
                                          <td className="px-4 py-2 whitespace-nowrap">
                                            <button 
                                              onClick={() => handleResumeClick(resume._id)}
                                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                                            >
                                              Edit in Admin
                                            </button>
                                            <Link href={`/dashboard/resume/${resume._id}`} passHref>
                                              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                                Open in Editor
                                              </button>
                                            </Link>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p>No resumes found for this user.</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
  
        {selectedResume && (
          <ResumeDetails 
            resume={selectedResume} 
            onClose={() => setSelectedResume(null)} 
            onSave={handleSaveResume}
          />
        )}
      </div>
    );
  };
  
  export default Dashboard;
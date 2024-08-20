"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CoverLetterPage = ({ params }) => {
  const { id } = params;
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const response = await axios.get(`/api/cover-letters/${id}`, { withCredentials: true });
        setCoverLetter(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cover letter:", error);
        setError("Failed to load cover letter");
        setLoading(false);
      }
    };

    fetchCoverLetter();
  }, [id]);

  const handleChange = (e) => {
    setCoverLetter((prevCoverLetter) =>
      prevCoverLetter ? { ...prevCoverLetter, [e.target.name]: e.target.value } : null
    );
  };

  const saveCoverLetter = async () => {
    try {
      await axios.put(`/api/cover-letters/${id}`, coverLetter, { withCredentials: true });
      alert("Cover Letter saved successfully!");
    } catch (error) {
      console.error("Error saving cover letter:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1b1b1b", color: "white", padding: "20px" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#2a2a2a", padding: "20px", borderRadius: "10px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Edit Cover Letter</h1>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", color: "#00c9a7" }}>Title:</label>
          <input
            type="text"
            name="title"
            value={coverLetter?.title || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #333", borderRadius: "5px", backgroundColor: "#1b1b1b", color: "white" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", color: "#00c9a7" }}>Content:</label>
          <textarea
            name="content"
            value={coverLetter?.content || ""}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", border: "1px solid #333", borderRadius: "5px", backgroundColor: "#1b1b1b", color: "white" }}
          />
        </div>
        <button onClick={saveCoverLetter} style={{ padding: "10px 20px", backgroundColor: "#00c9a7", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CoverLetterPage;

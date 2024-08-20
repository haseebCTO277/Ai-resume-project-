import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, default: "" },
  professionalTitle: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  location: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  summary: { type: String, default: "" },
  experiences: [{
    position: { type: String, default: "" },
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    duration: { type: String, default: "" },
    responsibilities: [{ type: String, default: "" }],
    company_linkedin_profile_url: { type: String, default: "" },
    logo_url: { type: String, default: "" }
  }],
  education: [{
    institution: { type: String, default: "" },
    year: { type: String, default: "" },
    degree: { type: String, default: "" },
    field_of_study: { type: String, default: "" },
    school_linkedin_profile_url: { type: String, default: "" },
    logo_url: { type: String, default: "" }
  }],
  skills: [{ type: String, default: "" }],
  hobbies: [{ type: String, default: "" }],
  software: [{ type: String, default: "" }],
  languages: [{ type: String, default: "" }],
  certificates: [{
    name: { type: String, default: "" },
    year: { type: String, default: "" }
  }],
  extraSection: [{ type: String, default: "" }],
  extraDetailedSection: [{
    title: { type: String, default: "" },
    details: [{ type: String, default: "" }]
  }],
  resumeColor: { type: String, default: "" },
  fontFamily: { type: String, default: "Times New Roman" },
  age: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  theme: { type: String, default: "default" },
  sectionsVisibility: {
    hobbies: { type: Boolean, default: false },
    software: { type: Boolean, default: false },
    extraSection: { type: Boolean, default: false },
    certificates: { type: Boolean, default: false },
    languages: { type: Boolean, default: false },
    extraDetailedSection: { type: Boolean, default: false },
  },
  // New fields for AI generation
  aiGeneration: {
    keywords: { type: String, default: "" },
    jobDescription: { type: String, default: "" },
    tone: { type: String, default: "" },
    specificInstructions: { type: String, default: "" },
    atsKeywords: { type: String, default: "" },
    lastGeneratedAt: { type: Date },
  },
});

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
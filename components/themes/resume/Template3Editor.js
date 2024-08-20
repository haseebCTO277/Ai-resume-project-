// 'use client';

// import React, { useRef, useState } from 'react';
// // import Template3Design from '../templates/Template3Design';
// // import EditorInput from '../shared/EditorInput';
// import html2pdf from 'html2pdf.js';

// const DEFAULT_TEMPLATE3_DATA = {
//   info: {
//     name: 'Your Name',
//     title: 'Your Title',
//   },
//   socialInfo: {
//     linkedin: 'edit linkedin',
//     address: 'edit address',
//     phone: 'edit phone',
//     email: 'edit email',
//   },
//   summary: `Add your summary`,
//   experience: [
//     {
//       title: 'edit title',
//       company: 'edit company/project',
//       location: 'edit location',
//       from: 'edit from date',
//       to: 'edit to date',
//       points: [`edit point`],
//     },
//   ],
//   education: [
//     {
//       institute: 'edit institute',
//       degree: 'edit certificate or degree',
//       passingYear: 'edit passing year',
//     },
//   ],
//   skills: ['edit skill'],
// };

// const Template3Editor = () => {
//   const [data, setData] = useState({
//     ...DEFAULT_TEMPLATE3_DATA,
//   });
//   const [openMyContent, setOpenMyContent] = useState(false);

//   const handleChange = (name, value) => {
//     let _data = Object.assign({}, data);
//     let keys = name.split('.');

//     let temp = _data;

//     for (let idx = 0; idx < keys.length; idx++) {
//       let nKey = Number(keys[idx]);
//       let key = keys[idx];

//       if (idx === keys.length - 1) {
//         if (!isNaN(nKey)) {
//           temp[nKey] = value;
//         } else {
//           temp[key] = value;
//         }
//       } else if (temp[key] || temp[nKey]) {
//         if (!isNaN(nKey)) {
//           temp = temp[nKey];
//         } else {
//           temp = temp[key];
//         }
//       } else {
//         if (!isNaN(nKey)) {
//           temp[nKey] = [];
//           temp = temp[nKey];
//         } else {
//           temp[key] = [];
//           temp = temp[key];
//         }
//       }
//     }

//     setData({ ..._data });
//   };

//   const handleExperienceChange = (experience) => {
//     setData((data) => ({
//       ...data,
//       experience: experience,
//     }));
//   };

//   const handleEducationChange = (education) => {
//     setData((data) => ({
//       ...data,
//       education: education,
//     }));
//   };

//   const handleSkillChange = (skills) => {
//     setData((data) => ({
//       ...data,
//       skills: skills,
//     }));
//   };

//   const contentRef = useRef();

//   const saveTemplate = () => {
//     console.log('saving..');
//     const opt = {
//       margin: 0,
//       filename: 'resume.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 4 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     };
//     html2pdf().set(opt).from(contentRef.current).save();
//   };

//   return (
//     <div className="flex flex-col h-screen relative">
//       {/* Navbar for Editor */}
//       <div className="w-full shrink-0 py-2 px-3 flex justify-between sticky top-0 z-[999]">
//         <p className="font-bold text-lg px-4 py-2 bg-secondary rounded-full shadow-lg">
//           magicalresume
//         </p>
//         <div className="w-[200px] shrink-0 md:w-0"></div>
//         <div className="py-1 pr-1 pl-5 rounded-full bg-secondary flex items-center gap-5 shadow-lg">
//           <p>Font</p>
//           <p>Theme</p>
//           <p>Layout</p>
//           <p>Format</p>
//           <button
//             onClick={saveTemplate}
//             className="h-full px-5 bg-[#2bd3bd] rounded-full">
//             Download
//           </button>
//         </div>
//         <div className="w-[200px] shrink-0 md:w-0"></div>
//         <div className="p-1.5 rounded-full bg-secondary shadowl-lg">
//           <div className="h-full w-full px-6 rounded-full text-black bg-white/70 flex items-center justify-center whitespace-nowrap">
//             <p>My Documents</p>
//           </div>
//         </div>
//       </div>

//       <div className="fixed top-[15%] flex gap-3 pl-5 pb-10 z-[800]">
//         <div className="flex flex-col gap-7">
//           {openMyContent && (
//             <button
//               onClick={() => setOpenMyContent(false)}
//               className="bg-secondary cursor-pointer mx-auto w-[40px] h-[40px] rounded-full">
//               <p className="hover:scale-110">X</p>
//             </button>
//           )}
//           <button
//             onClick={() => setOpenMyContent(!openMyContent)}
//             className={`bg-secondary rounded-tl-xl rounded-tr-xl py-5 px-2 ${
//               openMyContent
//                 ? 'w-[70px] h-[70px] text-[12px] text-green-400'
//                 : 'w-[80px] h-[100px] text-sm'
//             }`}>
//             My Content
//           </button>
//           <button
//             className={`bg-secondary py-5 px-2 ${
//               openMyContent
//                 ? 'w-[70px] h-[70px] text-[12px]'
//                 : 'w-[80px] h-[100px] text-sm'
//             }`}>
//             Switch Template
//           </button>
//           <button
//             className={`bg-secondary rounded-bl-xl rounded-br-xl py-5 px-2 ${
//               openMyContent
//                 ? 'w-[70px] h-[70px] text-[12px]'
//                 : 'w-[80px] h-[100px] text-sm'
//             }`}>
//             AI Assistant
//           </button>
//         </div>
//         {openMyContent && (
//           <div className="flex flex-col gap-2">
//             <h1 className="text-xl">
//               My Content -{' '}
//               <span className="text-sm text-gray-400">Quick Access</span>
//             </h1>
//             <div className="px-2 py-1 bg-secondary rounded-xl h-[500px] overflow-y-scroll c-scrollbar">
//               <Template3SidePanel
//                 handleEducationChange={handleEducationChange}
//                 handleExperienceChange={handleExperienceChange}
//                 handleSkillChange={handleSkillChange}
//                 data={data}
//                 setData={setData}
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mt-20 w-full h-full flex justify-between">
//         {/* just for alignment */}
//         <div
//           className={`${
//             openMyContent ? 'w-[300px]' : 'w-[300px] xl:w-[100px]'
//           } shrink-0`}></div>
//         {/* <Template3Design
//           ref={contentRef}
//           handleEducationChange={handleEducationChange}
//           handleExperienceChange={handleExperienceChange}
//           handleSkillChange={handleSkillChange}
//           handleChange={handleChange}
//           data={data}
//         /> */}

//         {/* just for alignment */}
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default Template3Editor;

// const Template3SidePanel = ({
//   data,
//   setData,
//   handleEducationChange,
//   handleExperienceChange,
//   handleSkillChange,
// }) => {
//   return (
//     <div className="w-full shrink-0 min-w-[250px] text-white">
//       {/* BASIC INFO */}
//       <ContainerWrapper title="Basic Info">
//         <BasicInfoEditor data={data} setData={setData} />
//       </ContainerWrapper>
//       {/* SOCIAL INFO */}
//       <ContainerWrapper title="Social Info">
//         <SocialInfoEditor data={data} setData={setData} />
//       </ContainerWrapper>
//       {/* SUMMARY INFO */}
//       <ContainerWrapper title="Summary">
//         <textarea
//           value={data.summary}
//           className="h-[100px] text-black w-full rounded-sm p-2 text-sm"
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               summary: ev.target.value,
//             }));
//           }}></textarea>
//       </ContainerWrapper>

//       {/* EXPERIENCE */}
//       <ContainerWrapper title="Experience">
//         <ExperienceEditor
//           data={data}
//           handleExperienceChange={handleExperienceChange}
//         />
//       </ContainerWrapper>

//       {/* EDUCATION */}
//       <ContainerWrapper title="Education">
//         <EducationEditor
//           data={data}
//           handleEducationChange={handleEducationChange}
//         />
//       </ContainerWrapper>
//       {/* SKILLS */}
//       <ContainerWrapper title="SKILLS">
//         <SkillEditor data={data} handleSkillChange={handleSkillChange} />
//       </ContainerWrapper>

//       {/* <button
//         onClick={saveAsPDF}
//         className="mt-5 border rounded-full px-4 py-2 cursor-pointer bg-white text-black hover:bg-[#191919] hover:text-white transition-all active:scale-95">
//         Save as PDF
//       </button> */}
//     </div>
//   );
// };

// const ContainerWrapper = ({ children, title, smallTitle = false }) => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative px-2 pt-2 pb-4">
//       <button
//         onClick={() => setOpen(!open)}
//         className="select-none text-sm absolute top-1 right-1 cursor-pointer">
//         {open ? (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m4.5 15.75 7.5-7.5 7.5 7.5"
//             />
//           </svg>
//         ) : (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-6 h-6">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="m19.5 8.25-7.5 7.5-7.5-7.5"
//             />
//           </svg>
//         )}
//       </button>
//       <div
//         onClick={() => setOpen(!open)}
//         className="pb-4 w-full cursor-pointer">
//         <p
//           className={`select-none w-max ${
//             smallTitle ? 'text-sm' : 'text-lg'
//           } relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px]  ${
//             open ? 'text-green-400 before:bg-green-400!' : 'before:bg-white'
//           } `}>
//           {title}
//         </p>
//       </div>
//       <div className={`${open ? 'h-auto' : 'h-0'} overflow-hidden`}>
//         {children}
//       </div>
//     </div>
//   );
// };

// const BasicInfoEditor = ({ data, setData }) => {
//   return (
//     <div className="space-y-2">
//       <div className="space-y-2">
//         <p className="text-sm">Name</p>
//         <EditorInput
//           value={data.info.name}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               info: { ...data.info, name: ev.target.value },
//             }));
//           }}
//           placeholder="John Doe"
//         />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm">Title</p>
//         <EditorInput
//           value={data.info.title}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               info: { ...data.info, title: ev.target.value },
//             }));
//           }}
//           placeholder="Web Developer"
//         />
//       </div>
//     </div>
//   );
// };

// const SocialInfoEditor = ({ data, setData }) => {
//   return (
//     <div className="space-y-2">
//       <div className="space-y-2">
//         <p className="text-sm">LinkedIn</p>
//         <EditorInput
//           value={data.socialInfo.linkedin}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               socialInfo: { ...data.socialInfo, linkedin: ev.target.value },
//             }));
//           }}
//           placeholder=""
//         />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm">Address</p>
//         <EditorInput
//           value={data.socialInfo.address}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               socialInfo: { ...data.socialInfo, address: ev.target.value },
//             }));
//           }}
//         />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm">Phone</p>
//         <EditorInput
//           value={data.socialInfo.phone}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               socialInfo: { ...data.socialInfo, phone: ev.target.value },
//             }));
//           }}
//         />
//       </div>
//       <div className="space-y-2">
//         <p className="text-sm">Email</p>
//         <EditorInput
//           value={data.socialInfo.email}
//           onChange={(ev) => {
//             setData((data) => ({
//               ...data,
//               socialInfo: { ...data.socialInfo, email: ev.target.value },
//             }));
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// const ExperienceEditor = ({ data, handleExperienceChange }) => {
//   function addMore() {
//     let experience = [...data.experience];
//     experience.push({
//       title: '',
//       company: '',
//       location: '',
//       from: '',
//       to: '',
//       points: [``],
//     });
//     handleExperienceChange(experience);
//   }

//   return (
//     <div className="flex flex-col">
//       <div>
//         {data?.experience?.map((exp, i) => (
//           <ContainerWrapper
//             key={`Experience-Container-${i}`}
//             smallTitle
//             title={`Experience - ${i + 1}`}>
//             <ExperienceInputsContainer
//               data={data}
//               i={i}
//               handleExperienceChange={handleExperienceChange}
//             />
//           </ContainerWrapper>
//         ))}
//       </div>
//       <button
//         onClick={addMore}
//         className="bg-white px-2 py-1 rounded-full text-black text-sm my-2 ml-auto">
//         Add More
//       </button>
//     </div>
//   );
// };

// const ExperienceInputsContainer = ({
//   i,
//   data,
//   handleExperienceChange,
// }) => {
//   function deleteOne(i) {
//     let experience = [...data.experience];
//     experience.splice(i, 1);
//     handleExperienceChange(experience);
//   }

//   function handleChange(ev) {
//     let key = ev.target.name;
//     let idx = Number(ev.target.getAttribute('data-id'));
//     let experience = [...data.experience];
//     if (key !== 'points') experience[idx][key] = ev.target.value;
//     handleExperienceChange(experience);
//   }

//   const handlePointsChange = (points) => {
//     let experience = [...data.experience];
//     experience[i].points = points;
//     handleExperienceChange(experience);
//   };

//   return (
//     <div className="relative flex flex-col gap-3" key={`experience-${i}`}>
//       <button
//         className="absolute top-2 right-2 text-red-500 cursor-pointer bg-white w-max rounded-full p-2"
//         onClick={() => {
//           deleteOne(i);
//         }}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-4 h-4">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//           />
//         </svg>
//       </button>
//       <div className="mt-8">
//         <p className="text-sm">Title</p>
//         <EditorInput
//           value={data.experience[i].title}
//           name="title"
//           data-id={i}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <p className="text-sm">Company</p>
//         <EditorInput
//           value={data.experience[i].company}
//           name="company"
//           data-id={i}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <p className="text-sm">Location</p>
//         <EditorInput
//           value={data.experience[i].location}
//           name="location"
//           data-id={i}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <p className="text-sm">From</p>
//         <EditorInput
//           value={data.experience[i].from}
//           name="from"
//           data-id={i}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <p className="text-sm">To</p>
//         <EditorInput
//           value={data.experience[i].to}
//           name="to"
//           data-id={i}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <ExperiencePointsEditor
//           points={data.experience[i].points}
//           handlePointsChange={handlePointsChange}
//         />
//       </div>
//     </div>
//   );
// };

// const ExperiencePointsEditor = ({ points, handlePointsChange }) => {
//   const handleChange = (ev) => {
//     const idx = Number(ev.target.getAttribute('point-id'));
//     points.splice(idx, 1, ev.target.value);
//     handlePointsChange(points);
//   };
//   const deleteOne = (i) => {
//     points.splice(i, 1);
//     handlePointsChange(points);
//   };

//   return (
//     <div className="flex flex-col">
//       <ContainerWrapper title="Points" smallTitle>
//         <div className={`flex flex-col gap-3 overflow-hidden`}>
//           {points?.map((point, i) => (
//             <div className="flex gap-2" key={`points-${i}`}>
//               <EditorInput value={point} point-id={i} onChange={handleChange} />
//               <button
//                 className="text-red-500 cursor-pointer bg-white w-max rounded-full p-2"
//                 onClick={() => {
//                   deleteOne(i);
//                 }}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-4 h-4">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                   />
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>
//       </ContainerWrapper>
//       <button
//         onClick={() => {
//           points.push('');
//           handlePointsChange(points);
//         }}
//         className="bg-white px-2 py-1 rounded-full text-black text-sm my-2 ml-auto">
//         Add Point
//       </button>
//     </div>
//   );
// };

// const EducationEditor = ({ data, handleEducationChange }) => {
//   function addMore() {
//     let education = [...data.education];
//     education.push({
//       degree: '',
//       institute: '',
//       passingYear: '',
//     });
//     handleEducationChange(education);
//   }

//   function deleteOne(i) {
//     let education = [...data.education];
//     education.splice(i, 1);
//     handleEducationChange(education);
//   }

//   function handleChange(ev) {
//     let key = ev.target.name;
//     let idx = Number(ev.target.getAttribute('data-id'));
//     let education = [...data.education];
//     education[idx][key] = ev.target.value;
//     handleEducationChange(education);
//   }

//   return (
//     <div className="flex flex-col">
//       <div>
//         {data?.education?.map((ed, i) => (
//           <ContainerWrapper
//             key={`Education-${i}`}
//             smallTitle
//             title={`Education - ${i + 1}`}>
//             <div
//               className="relative flex flex-col gap-3"
//               key={`education-${i}`}>
//               <button
//                 className="absolute top-2 right-2 text-red-500 cursor-pointer bg-white w-max rounded-full p-2"
//                 onClick={() => {
//                   deleteOne(i);
//                 }}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={1.5}
//                   stroke="currentColor"
//                   className="w-4 h-4">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                   />
//                 </svg>
//               </button>
//               <div className="mt-8">
//                 <p className="text-sm">University/College</p>
//                 <EditorInput
//                   value={ed.institute}
//                   name="institute"
//                   data-id={i}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <p className="text-sm">Degree</p>
//                 <EditorInput
//                   value={ed.degree}
//                   name="degree"
//                   data-id={i}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <p className="text-sm">Passing Year</p>
//                 <EditorInput
//                   value={ed.passingYear}
//                   name="passingYear"
//                   data-id={i}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </ContainerWrapper>
//         ))}
//       </div>
//       <button
//         onClick={addMore}
//         className="bg-white px-2 py-1 rounded-full text-black text-sm my-2 ml-auto">
//         Add More
//       </button>
//     </div>
//   );
// };

// const SkillEditor = ({ data, handleSkillChange }) => {
//   function addMore() {
//     let skills = [...data.skills];
//     skills.push('Add Your Skill');
//     handleSkillChange(skills);
//   }

//   function deleteOne(i) {
//     let skills = [...data.skills];
//     skills.splice(i, 1);
//     handleSkillChange(skills);
//   }

//   function handleChange(ev) {
//     let idx = ev.target.getAttribute('data-id');
//     let skills = [...data.skills];
//     skills[idx] = ev.target.value;
//     handleSkillChange(skills);
//   }

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-col gap-2">
//         {data?.skills?.map((skill, i) => (
//           <div className="relative flex gap-3" key={`skills-${i}`}>
//             <EditorInput value={skill} data-id={i} onChange={handleChange} />
//             <button
//               className="text-red-500 cursor-pointer bg-white w-max rounded-full p-2"
//               onClick={() => {
//                 deleteOne(i);
//               }}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="w-4 h-4">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                   />
//               </svg>
//             </button>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={addMore}
//         className="bg-white px-2 py-1 rounded-full text-black text-sm my-2 ml-auto">
//         Add More
//       </button>
//     </div>
//   );
// };

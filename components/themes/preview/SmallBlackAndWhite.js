import React, { forwardRef } from 'react';

const SmallBlackAndWhite = forwardRef(({ resumeData }, ref) => (
  <div
    className="border-2 border-green-500 w-[80px] h-[115px] flex flex-col px-3 py-2 bg-white text-black overflow-hidden"
    style={{ transform: 'scale(1)', transformOrigin: 'top left', width: '80mm', height: '50mm' }}
  >
    <div ref={ref} className="w-full h-full">
      <div className="text-center space-y-1">
        <div className="text-2xl font-medium">{resumeData.fullName || "Full Name"}</div>
        <div className="text-xl">{resumeData.professionalTitle || "Professional Title"}</div>
      </div>
      <div className="flex items-center gap-1 text-[6.5px] justify-center font-medium mt-2">
        <div className="text-black flex items-center gap-0.5">
          {resumeData.linkedin || "LinkedIn URL"}
        </div>
        <p className="text-[5.5px]">•</p>
        <div className="text-black flex items-center gap-0.5">
          {resumeData.location || "Location"}
        </div>
        <p className="text-[5.5px]">•</p>
        <div className="text-black flex items-center gap-0.5">
          {resumeData.phone || "Phone Number"}
        </div>
        <p className="text-[5.5px]">•</p>
        <div className="text-black flex items-center gap-0.5">
          {resumeData.email || "Email Address"}
        </div>
      </div>
      <section className="mt-4">
        <h1 className="font-bold border-b-2 border-b-black text-[7px]">SUMMARY</h1>
        <p className="text-[6.5px]">{resumeData.summary || "Summary"}</p>
      </section>
    </div>
  </div>
));

SmallBlackAndWhite.displayName = 'SmallBlackAndWhite';

export default SmallBlackAndWhite;

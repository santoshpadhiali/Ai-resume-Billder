import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4 text-center">Experience</h1>
    <hr style={{
        borderColor:resumeInfo?.themeColor
    }} />
      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          {/* Job Title */}
          <h2 className="text-sm font-bold">{experience?.title}</h2>

          {/* City, State and Dates */}
          <h2 className="text-xs flex justify-between">
            <span>
              {experience?.city}, {experience?.state}
            </span>
            <span>
              {experience?.startDate} -{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>

          {/* Work Summary */}
          <p className="text-xs my-2">{experience?.workSummery}</p>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;

import React from 'react'

function EducationalPreview({ resumeInfo }) {
    return (
        <div>
            <h2 className="text-lg font-bold mb-4 text-center">Educational Details</h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />

            {resumeInfo?.education?.map((education, index) => (
                <div key={index} className="my-5">
                    <h2 className="text-sm font-bold">{education?.universityName}</h2>

                    <h2 className="text-xs flex justify-between text-gray-600">
                        <span>{education?.degree} in {education?.major}</span>
                        <span>{education?.startDate} - {education?.endDate}</span>
                    </h2>

                    <p className="text-xs italic my-1">{education?.description}</p>
                </div>
            ))}
        </div>

    )
}

export default EducationalPreview
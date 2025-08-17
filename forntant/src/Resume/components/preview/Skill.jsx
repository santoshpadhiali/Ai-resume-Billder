import React from 'react'

function Skill({ resumeInfo }) {
  // Group skills into pairs (2 per row)
  const skillPairs = [];
  if (resumeInfo?.skills) {
    for (let i = 0; i < resumeInfo.skills.length; i += 2) {
      skillPairs.push(resumeInfo.skills.slice(i, i + 2));
    }
  }

  return (
    <div>
      <h2 className='font-bold text-xl text-center mb-4'>Education</h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="mt-4 space-y-4">
        {skillPairs.map((pair, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-6">
            {pair.map((skill, index) => (
              <div key={index}>
                {/* Skill Name */}
                <p className="text-sm font-medium mb-1">{skill?.name}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${skill?.rating}%`,
                      backgroundColor: resumeInfo?.themeColor
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skill

import React, { useState } from 'react'

const formFilled = {
  universityName: '',
  startDate: '',
  endDate: '',
  degree: '',
  major: '',
  description: ''
}

function EducationalDetels() {
  const [educationlist, setEducationlist] = useState([formFilled]);

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Update your Educational Detels</h2>
        <p>Let's Start Hear Update your neducational Detels</p>
      </div>

      <div>
        {educationlist.map((item, index) => {
          return (
            <div key={index}>
              <div>
                
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EducationalDetels
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ResumePreview from '../../components/ResumePreview'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import Dummy from '@/Data/Dummy'
import FromSection from '../../../fromsection/FromSection.jsx'

function EditResume() {
  const params = useParams()
  const [resumeInfo, setResumeInfo] = useState({}) // ✅ use consistent naming

  useEffect(() => {
    // Fetch or load resume data here
    setResumeInfo(Dummy) // ✅ keep the same case
  }, [params])

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FromSection />
        
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume

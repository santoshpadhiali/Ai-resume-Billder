import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetelsPreview from './preview/PersonalDetelsPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExpriencePreview from './preview/ExpriencePreview';
import EducationalPreview from './preview/EducationalPreview';
import Skill from './preview/Skill';

function ResumePreview() {
  const { resumeInfo,setResumeInfo } = useContext(ResumeInfoContext);
// we can use the resume info context 
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
      borderColor:resumeInfo?.themeColor
    }}
    >
        {/* personal detels */}
        <PersonalDetelsPreview resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />


        {/*Summery  */}
      <SummeryPreview resumeInfo={resumeInfo}/>
        {/* Profsinal Exprience*/}
        <ExpriencePreview resumeInfo={resumeInfo}/>
        {/* Educational Detels */}
        <EducationalPreview resumeInfo={resumeInfo}/>
        {/* Skills */}
        <Skill resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview
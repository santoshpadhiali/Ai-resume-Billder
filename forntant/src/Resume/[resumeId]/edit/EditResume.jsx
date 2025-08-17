import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ResumePreview from '../../components/ResumePreview'
// import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'

import Dummy from '@/Data/Dummy';
import  FromSection from '../../../fromsection/FromSection.jsx';

function EditResume() {
  const params = useParams();
  const [resumeInfo, setResumeinfo] = useState();

  useEffect(() => {
    // console.log(params.resumeId);
    setResumeinfo(Dummy);
  }, [params]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeinfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* form section */}
        <FromSection/>
        {/* preview section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}
console.log("FromSection:", FromSection);
console.log("ResumePreview:", ResumePreview);
console.log("ResumeInfoContext:", ResumeInfoContext);


export default EditResume;

import Addresume from '@/components/componete/Addresume';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import GobalApi from '../../Service/GobalApi';
import ResumeCard from '../components/componete/ResumeCard';

function Dashboard() {
  const { user } = useUser();
  const [resumelist, setresumelist] = useState([]);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getResumelist();
    }
  }, [user]); // runs when user is loaded

  // fetch user resumes
  const getResumelist = () => {
    GobalApi.getresumes(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        console.log(resp.data);
        
        setresumelist(resp.data.data); // ✅ correct setState syntax
      })
      .catch((err) => {
        console.error('Error fetching resumes:', err);
      });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl ">My Resume</h2>
      <p>Start creating AI resume for your next job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 h-[280px] ">
        <Addresume />
        {resumelist.length > 0 &&
          resumelist.map((resume, index) => (
            <ResumeCard resume={resume} key={index} /> 
          ))}
      </div>
    </div>
  );
}

export default Dashboard;

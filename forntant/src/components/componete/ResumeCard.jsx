import React from 'react';
import { Notebook } from 'lucide-react';
import { Link } from 'react-router-dom';

function ResumeCard({ resume }) {
    return (
        <Link to={`/dashboard/resume/${resume.resumeid}/edit`}>
            <div className="flex flex-col items-center mt-1.5">
                <div
                    className="p-14 bg-secondary flex flex-col items-center justify-center h-[280px] 
                    border border-primary rounded-lg mt-7
                    hover:scale-105 transition-all hover:shadow-md shadow-primary cursor-pointer"
                >
                    <Notebook />
                </div>
                <h2 className="text-center my-1">{resume.titel}</h2>
            </div>
        </Link>
    );
}

export default ResumeCard;

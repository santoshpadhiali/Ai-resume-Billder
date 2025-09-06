import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '../../../../Service/GobalApi';
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from '../../../../Service/AImodel';

const prompt = "Job Title: {jobTitle}, give a list of summaries for 3 experience levels, Mid Level and Fresher, in 3-4 lines in array format with 'summary' and 'experience_level' fields in JSON.";

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.summery || '');
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (summery) {
      setResumeInfo(prev => ({ ...prev, summery }));
    }
  }, [summery, setResumeInfo]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast("Please provide a job title first.");
      return;
    }
    setLoadingAI(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const text = result.response.text();

      // Safe JSON parse
      let data = [];
      try {
        const parsed = JSON.parse(text);
        data = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.error("AI response is not valid JSON:", e, text);
        toast("AI response is not in valid JSON format.");
      }

      setAiGenerateSummeryList(data);
    } catch (error) {
      console.error("AI generation error:", error);
      toast("Failed to generate summaries from AI.");
    } finally {
      setLoadingAI(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoadingSave(true);

    const data = { data: { summery } };

    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      enabledNext(true);
      toast("Details updated successfully!");
    } catch (error) {
      console.error("Save error:", error);
      toast("Failed to save details.");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summery</label>
            <Button
              variant="outline"
              onClick={GenerateSummeryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loadingAI}
            >
              {loadingAI ? <LoaderCircle className='animate-spin h-4 w-4' /> : <Brain className='h-4 w-4' />}
              Generate from AI
            </Button>
          </div>

          <Textarea
            className="mt-5"
            required
            value={summery || ''}
            onChange={(e) => setSummery(e.target.value)}
          />

          <div className='mt-2 flex justify-end'>
            <Button type="submit" disabled={loadingSave}>
              {loadingSave ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {Array.isArray(aiGeneratedSummeryList) && aiGeneratedSummeryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSummery(item?.summary);
                navigator.clipboard.writeText(item?.summary || '')
                  .then(() => toast("Copied to clipboard!"))
                  .catch(() => toast("Failed to copy"));
              }}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition'
            >
              <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Summery;

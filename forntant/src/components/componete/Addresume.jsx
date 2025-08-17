import { Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import GobalApi from './../../../Service/GobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Addresume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const closeDialog = () => {
    setResumeTitle('');
    setOpenDialog(false);
  };

  const onCreate = async () => {
    if (!resumeTitle.trim()) return;
    setLoading(true);

    const uuid = uuidv4();

    const Data = {
      titel: resumeTitle, // match exact spelling in Strapi
      resumeid: uuid,     // match lowercase exactly
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName
    };


    console.log('Sending Data to API:', Data);

    try {
      const resp = await GobalApi.CreateNewResume(Data);
      console.log('API Response:', resp.data.data.documentId);
      navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`)
      closeDialog();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger card */}
      <div
        className='p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] m-10 hover:scale-105 transition-all
        hover:shadow-md cursor-pointer border-dashed'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare size={30} />
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create your own Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume.
            </DialogDescription>
          </DialogHeader>

          <Input
            className='mt-2.5'
            placeholder="Name of your resume"
            value={resumeTitle}
            onChange={(e) => setResumeTitle(e.target.value)}
          />

          <div className='flex justify-end gap-5 mt-4'>
            <Button
              type="button"
              variant="ghost"
              onClick={closeDialog}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              disabled={!resumeTitle.trim() || loading}
              onClick={onCreate}
            >
              {loading ? (
                <Loader2 className='animate-spin' size={18} />
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Addresume;

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import ReachTextEditor from '@/components/componete/ReachTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GobalApi from '../../../../Service/GobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

function Experience() {
  const [experinceList, setExperinceList] = useState([formField])
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (resumeInfo?.Experience?.length > 0) {
      setExperinceList(resumeInfo.Experience)
    }
  }, [resumeInfo])

  const handleChange = (index, event) => {
    const newEntries = [...experinceList]
    const { name, value } = event.target
    newEntries[index][name] = value
    setExperinceList(newEntries)
  }

  const AddNewExperience = () => {
    setExperinceList([...experinceList, { ...formField }])
  }

  const RemoveExperience = () => {
    if (experinceList.length > 1) {
      setExperinceList(experinceList.slice(0, -1))
    }
  }

  const handleRichTextEditor = (value, name, index) => {
    const newEntries = [...experinceList]
    newEntries[index][name] = value
    setExperinceList(newEntries)
  }

  // Update Context whenever list changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      Experience: experinceList,
    })
  }, [experinceList])

  // ✅ Auto-save with debounce
  useEffect(() => {
    if (!experinceList) return

    const timeout = setTimeout(() => {
      onSave() // call save automatically
    }, 1000) // wait 1s after user stops typing

    return () => clearTimeout(timeout)
  }, [experinceList])

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        Experience: experinceList.map(({ id, ...rest }) => rest),
      },
    }

    GobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        setLoading(false)
        toast.success('Details auto-saved!')
      },
      (error) => {
        setLoading(false)
        toast.error('Failed to update details')
      }
    )
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>

        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    value={item?.title}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    value={item?.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    value={item?.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    value={item?.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item?.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item?.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summary */}
                  <ReachTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(value) =>
                      handleRichTextEditor(value, 'workSummery', index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={RemoveExperience}
              className="text-primary"
            >
              - Remove
            </Button>
          </div>

          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
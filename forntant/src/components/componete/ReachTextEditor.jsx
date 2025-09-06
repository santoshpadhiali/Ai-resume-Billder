import React, { useState, useContext, useEffect } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnBulletList,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnLink,
  Separator,
} from "react-simple-wysiwyg";
import { Button } from "@/components/ui/button";
import { AIChatSession } from "../../../Service/AImodel";
import { toast } from "sonner";
import { LoaderCircle, Brain } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const PROMPT =
  "position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags";

function ReachTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || "");
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // ✅ Only update if defaultValue actually changes
  useEffect(() => {
    if (defaultValue && defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }

    setLoading(true);
    try {
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.Experience[index].title
      );

      const result = await AIChatSession.sendMessage(prompt);

      const resp =
        (typeof result.response?.text === "function"
          ? await result.response.text()
          : result.response?.text) || result.content || "";

      // ✅ Clean unwanted brackets globally
      const cleanText = resp.replace(/\[|\]/g, "").trim();

      setValue(cleanText);
      onRichTextEditorChange(cleanText);
    } catch (err) {
      console.error(err);
      toast("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce parent updates (optional, prevents too many calls)
  const handleChange = (newValue) => {
    setValue(newValue);
    onRichTextEditorChange(newValue);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default ReachTextEditor;
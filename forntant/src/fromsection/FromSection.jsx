import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import EducationalDetails from '../Resume/components/forms/EducationalDetels';
import Experience from '../Resume/components/forms/Exprience';
import PersonalDetels from '../Resume/components/forms/PersonalDetels';
import Summary from '../Resume/components/forms/Summery';
import Skill from '../Resume/components/forms/Skills';
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center gap-2">
        {/* Theme Button */}
        <Button className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>

        {/* Back Button */}
        {activeFormIndex > 1 && (
          <Button
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          >
            <ArrowLeft /> Prev
          </Button>
        )}

        {/* Next Button */}
        {activeFormIndex < 5 && (
          <Button
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        )}
      </div>

      {/* Form Sections */}
      {activeFormIndex === 5 && <PersonalDetels setEnableNext={setEnableNext} />}

      {activeFormIndex === 2 && <Summary setEnableNext={setEnableNext} />}

      {activeFormIndex === 4 && <Experience setEnableNext={setEnableNext} />}

      {activeFormIndex === 5 && <EducationalDetails setEnableNext={setEnableNext} />}
      
      {activeFormIndex === 1 && <Skill setEnableNext={setEnableNext} />}
    </div>
  );
}

export default FormSection;

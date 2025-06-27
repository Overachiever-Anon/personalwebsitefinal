// src/app/resume/components/ResumeSkills.tsx
import { Code } from 'lucide-react';

type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
  order_num: number;
};

interface ResumeSkillsProps {
  skills: SkillCategory[];
}

export default function ResumeSkills({ skills }: ResumeSkillsProps) {
  if (!skills.length) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-accent print:text-base print:mb-2 flex items-center gap-2">
        <Code className="h-5 w-5 print:h-4 print:w-4" />
        Skills
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
        {skills.map((category) => (
          <div key={category.id} className="print:text-sm">
            <h3 className="font-semibold print:text-xs">{category.category}</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm print:text-xs print:bg-gray-100 print:text-black print:border print:border-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

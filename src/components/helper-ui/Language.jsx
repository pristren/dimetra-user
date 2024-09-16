import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsaLogo, GermanyLogo } from "@/assets/icons";
export default function Language() {
  const languages = [
    {
      icon: <UsaLogo />,
      name: "English",
    },
    {
      icon: <GermanyLogo />,
      name: "German",
    },
  ];
  const [defaultLanguage, setDefaultLanguage] = useState(languages[0]);

  return (
    <Select
      value={defaultLanguage}
      onValueChange={(value) => setDefaultLanguage(value)}
    >
      <SelectTrigger className="w-min focus:ring-0  focus:ring-offset-0 border-none">
        <SelectValue asChild placeholder="">
          <div className="flex items-center gap-2">
            <p className="text-4xl mb-0">{defaultLanguage.icon}</p>
            <p className="mb-0 mr-3">{defaultLanguage.name}</p>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-min">
        {languages.map((language, i) => (
          <SelectItem className="px-2 py-1" key={i} value={language}>
            <div className="flex items-center gap-2">
              {language.icon}
              <p> {language.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

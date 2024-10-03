import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

import { UsaLogo, GermanyLogo } from "@/assets/icons";

export default function Language() {
  const { i18n } = useTranslation();
  const languages = [
    {
      icon: <UsaLogo />,
      name: "English",
      value: "en",
    },
    {
      icon: <GermanyLogo />,
      name: "German",
      value: "de",
    },
  ];

  const [defaultLanguage, setDefaultLanguage] = useState(languages[0]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLanguageChange = (language) => {
    localStorage.setItem("languageCode", language.value);
    changeLanguage(language.value);
    setDefaultLanguage(language);
  };

  const savedLanguageCode = localStorage.getItem("languageCode");
  useEffect(() => {
    if (savedLanguageCode) {
      const savedLanguage = languages.find(
        (lang) => lang.value === savedLanguageCode
      );
      if (savedLanguage) {
        setDefaultLanguage(savedLanguage);
        changeLanguage(savedLanguageCode);
      }
    }
  }, [i18n, savedLanguageCode]);
  
  return (
    <Select
      value={defaultLanguage.value}
      onValueChange={(value) =>
        handleLanguageChange(languages.find((lang) => lang.value === value))
      }
    >
      <SelectTrigger className="w-min focus:ring-0 focus:ring-offset-0 border-none p-0" isDownArrowHidden={true}>
        <SelectValue asChild placeholder="">
          <div className="flex items-center gap-2">
            <p className="text-4xl mb-0">{defaultLanguage.icon}</p>
            <p className="mb-0 hidden lg:block">{defaultLanguage.name}</p>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-min">
        {languages.map((language, i) => (
          <SelectItem className="px-2 py-1" key={i} value={language.value}>
            <div className="flex items-center gap-2">
              {language.icon}
              <p>{language.name}</p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import AuthLayout from "@/layout/auth-layout";
import { Link } from "react-router-dom";
import { Logo } from "@/assets/icons";

export default function TermsConditionPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "use-of-service", title: "Use of Service" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "content", title: "Content" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "termination", title: "Termination" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "limitation-of-liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
  ];

  const content = {
    introduction:
      "Welcome to our service. By using our service, you agree to these terms...",
    "use-of-service": "You may use our service for lawful purposes only...",
    "user-accounts":
      "You are responsible for safeguarding the password that you use to access the service...",
    content:
      "Our service allows you to post, link, store, share and otherwise make available certain information...",
    "intellectual-property":
      "The service and its original content, features, and functionality are owned by us...",
    termination:
      "We may terminate or suspend your account and bar access to the service immediately...",
    disclaimers:
      'Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis...',
    "limitation-of-liability":
      "In no event shall we be liable for any indirect, incidental, special, consequential or punitive damages...",
    "governing-law":
      "These Terms shall be governed and construed in accordance with the laws of [Your Country]...",
    changes:
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time...",
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r">
        {/* icon for logo */}

        <ScrollArea className="h-full py-6 pl-4 pr-2">
          <h2 className="mb-4 text-lg font-semibold">Terms and Conditions</h2>
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto py-12 px-6">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          <Separator className="my-6" />
          <h2 className="text-2xl font-semibold mb-4">
            {sections.find((s) => s.id === activeSection)?.title}
          </h2>
          <p className="text-muted-foreground">{content[activeSection]}</p>
        </div>
      </main>
    </div>
  );
}

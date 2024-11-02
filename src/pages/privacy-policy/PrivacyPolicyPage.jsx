import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  const sectionRefs = useRef({});

  const sections = [
    { id: "information-collection", title: "Information Collection and Use" },
    { id: "data-sharing", title: "Data Sharing and Disclosure" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "data-security", title: "Data Security" },
    { id: "user-rights", title: "Your Rights and Choices" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "international-transfers", title: "International Data Transfers" },
    { id: "policy-changes", title: "Changes to This Privacy Policy" },
    { id: "contact-us", title: "Contact Us" },
  ];

  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section.id] =
        sectionRefs.current[section.id] || React.createRef();
    });
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ScrollArea className="h-screen">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <nav className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className="text-primary hover:underline"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Separator className="my-8" />
        {sections.map((section) => (
          <section
            key={section.id}
            ref={sectionRefs.current[section.id]}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <p className="text-muted-foreground">
              {section.id === "information-collection" &&
                "We collect information to provide better services to all our users..."}
              {section.id === "data-sharing" &&
                "We do not share personal information with companies, organizations, or individuals outside of our company unless one of the following circumstances applies..."}
              {section.id === "cookies" &&
                "We and our partners use various technologies to collect and store information when you visit our service, including cookies..."}
              {section.id === "data-security" &&
                "We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold..."}
              {section.id === "user-rights" &&
                "You have the right to access, update, or delete your information at any time..."}
              {section.id === "children-privacy" &&
                "Our service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13..."}
              {section.id === "international-transfers" &&
                "We may transfer information that we collect to locations outside of your country or other governmental jurisdiction..."}
              {section.id === "policy-changes" &&
                "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page..."}
              {section.id === "contact-us" &&
                "If you have any questions about this Privacy Policy, please contact us..."}
            </p>
          </section>
        ))}
      </div>
    </ScrollArea>
  );
}

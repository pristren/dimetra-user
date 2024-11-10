import {
  ArrowLeft,
  Calendar,
  Share2,
  User,
  UserCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import moment from "moment";

export default function NewsDetails() {
  return (
    <div className="min-h-screen ">
      {/* <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/news">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to News
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <img
                src="/placeholder.svg?height=24&width=24"
                alt="English"
                width={24}
                height={24}
                className="rounded"
              />
              English
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="sr-only">User menu</span>
            </Button>
          </div>
        </div>
      </header> */}
      <main className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-5xl">
          <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
            Service Name 1: Innovative Solutions for Modern Challenges
          </h1>
          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 ">
                <UserRound className="h-4 w-4" />
                <span className="mb-0">John Doe</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{moment().format("DD MMM YYYY")}</span>
            </div>
            {/* <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button> */}
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs4DX9SbMr4h0ASCtO1fHXODlCqjLqwzM0w&s"
            alt="Service Name 1"
            // width={1200}
            // height={600}
            className="mb-8 rounded-lg object-cover w-full h-96"
          />
          <div className=" max-w-none">
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-2xl font-semibold my-2">
              Revolutionizing the Industry
            </h2>
            <p className="">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <ul>
              <li>Advanced AI-powered analytics</li>
              <li>Seamless integration with existing systems</li>
              <li>Real-time data processing and insights</li>
              <li>Customizable dashboards and reporting</li>
            </ul>
            <h2 className="text-2xl font-semibold my-2">
              Client Success Stories
            </h2>
            <p>
              Our clients have experienced remarkable improvements in their
              operations after implementing Service Name 1. Here are some of the
              key benefits they've reported:
            </p>
            <ol>
              <li>50% increase in operational efficiency</li>
              <li>30% reduction in costs</li>
              <li>Improved decision-making capabilities</li>
              <li>Enhanced customer satisfaction</li>
            </ol>
            <blockquote>
              "Service Name 1 has transformed the way we do business. The
              insights we've gained have been invaluable." - Jane Doe, CEO of
              Tech Innovators Inc.
            </blockquote>
            <h2 className="text-2xl font-semibold my-2">Looking Ahead</h2>
            <p>
              As we continue to innovate and improve Service Name 1, we're
              excited about the future possibilities. Our team is working on new
              features that will further enhance the user experience and provide
              even more value to our clients.
            </p>
            <p>
              Stay tuned for more updates and don't hesitate to reach out if you
              have any questions about how Service Name 1 can benefit your
              organization.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}

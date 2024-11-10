import { Calendar, UserRound } from "lucide-react";

import moment from "moment";

export default function NewsDetails() {
  return (
    <div className="min-h-screen ">
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
          </div>
          <img
            src="https://plus.unsplash.com/premium_photo-1707080369554-359143c6aa0b?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Service Name 1"
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

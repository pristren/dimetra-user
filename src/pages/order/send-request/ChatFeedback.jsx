import { useState } from "react";
import { Star, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ChatFeedback() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle the submission of feedback
    console.log({ rating, feedback });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="w-full space-y-4 p-4 bg-secondary/20 rounded-lg">
        <p className="text-center text-muted-foreground">
          Thank you for your feedback! Your response has been recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="w-full p-4  rounded-lg">
        {/* <Separator className="my-4" /> */}
        <Card className="border-0 bg-transparent">
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium">
                How would you rate your experience?
              </p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="focus:outline-none"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                  >
                    {star <= (hoveredStar || rating) ? (
                      <StarIcon className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ) : (
                      <Star className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Additional feedback (optional)
              </p>
              <Textarea
                placeholder="Share your thoughts about the support you received..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] bg-background/50  focus-visible:outline-none border-input focus-visible:border-ring focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full"
              disabled={rating === 0}
            >
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

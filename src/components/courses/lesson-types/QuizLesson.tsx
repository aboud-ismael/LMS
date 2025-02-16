import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface QuizLessonProps {
  content: {
    question: string;
    options: string[];
    correctAnswer: number;
  };
  onComplete: (correct: boolean) => void;
}

const QuizLesson = ({ content, onComplete }: QuizLessonProps) => {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = parseInt(selected) === content.correctAnswer;
    setSubmitted(true);
    onComplete(correct);
  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-xl font-semibold">{content.question}</h3>

      <RadioGroup
        value={selected || ""}
        onValueChange={setSelected}
        className="space-y-3"
        disabled={submitted}
      >
        {content.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>

      {!submitted && (
        <Button onClick={handleSubmit} disabled={!selected} className="w-full">
          Submit Answer
        </Button>
      )}

      {submitted && (
        <div
          className={`p-4 rounded-lg ${parseInt(selected!) === content.correctAnswer ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {parseInt(selected!) === content.correctAnswer
            ? "Correct! Well done!"
            : `Incorrect. The correct answer was: ${content.options[content.correctAnswer]}`}
        </div>
      )}
    </Card>
  );
};

export default QuizLesson;

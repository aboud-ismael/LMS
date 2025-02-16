import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

interface CodeLessonProps {
  content: {
    explanation: string;
    code: string;
    language: string;
    exercise?: {
      instructions: string;
      starter: string;
      solution: string;
    };
  };
}

const CodeLesson = ({ content }: CodeLessonProps) => {
  const [showSolution, setShowSolution] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p>{content.explanation}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="p-4 border rounded-md">
          <div dangerouslySetInnerHTML={{ __html: content.code }} />
        </TabsContent>
        <TabsContent value="code">
          <Card className="bg-zinc-950 p-4 text-white font-mono text-sm">
            <pre>
              <code>{content.code}</code>
            </pre>
          </Card>
        </TabsContent>
      </Tabs>

      {content.exercise && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Exercise</h3>
          <p>{content.exercise.instructions}</p>

          <Card className="bg-zinc-950 p-4 text-white font-mono text-sm">
            <pre>
              <code>{content.exercise.starter}</code>
            </pre>
          </Card>

          {!showSolution ? (
            <Button
              variant="outline"
              onClick={() => setShowSolution(true)}
              className="w-full"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Show Solution
            </Button>
          ) : (
            <div className="space-y-2">
              <h4 className="font-medium">Solution:</h4>
              <Card className="bg-zinc-950 p-4 text-white font-mono text-sm">
                <pre>
                  <code>{content.exercise.solution}</code>
                </pre>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeLesson;

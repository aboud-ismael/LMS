import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Highlight, themes } from "prism-react-renderer";

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

  // Function to format code for display
  const formatCode = (code: string) => {
    return code.replace(/\\n/g, "\n");
  };

  // Function to create an iframe with the HTML content
  const createPreview = (htmlContent: string) => {
    const formattedContent = formatCode(htmlContent);
    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 16px; font-family: system-ui, sans-serif; }
          </style>
        </head>
        <body>
          ${formattedContent}
        </body>
      </html>
    `;
    return fullHtml;
  };

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
        <TabsContent
          value="preview"
          className="min-h-[300px] border rounded-md overflow-hidden bg-white"
        >
          <iframe
            srcDoc={createPreview(content.code)}
            className="w-full h-full min-h-[300px] border-none"
            title="Preview"
          />
        </TabsContent>
        <TabsContent value="code">
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <Card className="p-4">
              <Highlight
                theme={themes.nightOwl}
                code={formatCode(content.code)}
                language={content.language.toLowerCase()}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={className + " whitespace-pre-wrap overflow-auto"}
                    style={style}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="inline-block w-8 text-gray-500 text-right mr-4 select-none">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </Card>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {content.exercise && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Exercise</h3>
          <p>{content.exercise.instructions}</p>

          <ScrollArea className="h-[200px] w-full rounded-md border">
            <Card className="p-4">
              <Highlight
                theme={themes.nightOwl}
                code={content.exercise.starter}
                language={content.language.toLowerCase()}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre
                    className={className + " whitespace-pre-wrap overflow-auto"}
                    style={style}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="inline-block w-8 text-gray-500 text-right mr-4 select-none">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </Card>
          </ScrollArea>

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
              <ScrollArea className="h-[200px] w-full rounded-md border">
                <Card className="p-4">
                  <Highlight
                    theme={themes.nightOwl}
                    code={content.exercise.solution}
                    language={content.language.toLowerCase()}
                  >
                    {({
                      className,
                      style,
                      tokens,
                      getLineProps,
                      getTokenProps,
                    }) => (
                      <pre
                        className={
                          className + " whitespace-pre-wrap overflow-auto"
                        }
                        style={style}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            <span className="inline-block w-8 text-gray-500 text-right mr-4 select-none">
                              {i + 1}
                            </span>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                </Card>
              </ScrollArea>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeLesson;

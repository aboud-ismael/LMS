import React from "react";
import { Card } from "@/components/ui/card";

interface VideoLessonProps {
  content: {
    videoUrl: string;
    description: string;
  };
}

const VideoLesson = ({ content }: VideoLessonProps) => {
  return (
    <div className="space-y-4">
      <Card className="aspect-video">
        <iframe
          className="w-full h-full"
          src={content.videoUrl}
          title="Lesson Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Card>

      <div className="prose max-w-none">
        <p>{content.description}</p>
      </div>
    </div>
  );
};

export default VideoLesson;

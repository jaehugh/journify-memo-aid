import React from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { formatDistanceToNow } from "date-fns";

interface JournalEntryProps {
  title: string;
  content: string;
  timestamp: Date;
  tags: string[];
  mood?: string;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({
  title,
  content,
  timestamp,
  tags,
  mood,
}) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/80 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </p>
        </div>
        {mood && (
          <Badge variant="outline" className="bg-accent/10">
            {mood}
          </Badge>
        )}
      </div>
      <p className="text-foreground/90 mb-4 line-clamp-3">{content}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs bg-secondary hover:bg-secondary/80"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
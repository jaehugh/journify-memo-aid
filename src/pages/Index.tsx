import React, { useState } from "react";
import { JournalEntry } from "@/components/JournalEntry";
import { VoiceInput } from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const mockEntries = [
  {
    title: "Morning Reflection",
    content: "Today I'm feeling particularly motivated about the new project...",
    timestamp: new Date(),
    tags: ["Personal Growth", "Work & Professional"],
    mood: "Motivated",
  },
  {
    title: "Evening Thoughts",
    content: "Had a great meditation session this evening...",
    timestamp: new Date(Date.now() - 86400000),
    tags: ["Health & Wellness", "Emotional Well-being"],
    mood: "Peaceful",
  },
];

const Index = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const handleVoiceTranscript = (transcript: string) => {
    setNewEntry((prev) => ({
      ...prev,
      content: prev.content + " " + transcript,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container max-w-2xl py-8">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Journiq</h1>
          <p className="text-muted-foreground">Your AI-powered journaling companion</p>
        </header>

        {!isCreating ? (
          <Button
            onClick={() => setIsCreating(true)}
            className="mb-8 group animate-fade-up"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            New Entry
          </Button>
        ) : (
          <div className="space-y-4 mb-8 animate-fade-up">
            <Input
              placeholder="Entry Title"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              className="text-lg font-semibold"
            />
            <div className="relative">
              <Textarea
                placeholder="What's on your mind?"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="min-h-[200px] resize-none pr-16"
              />
              <div className="absolute bottom-4 right-4">
                <VoiceInput onTranscript={handleVoiceTranscript} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button>Save Entry</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {mockEntries.map((entry, index) => (
            <JournalEntry key={index} {...entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
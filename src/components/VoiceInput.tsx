import React, { useState } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        onTranscript(transcript);
      };

      recognition.start();
      setRecognition(recognition);
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <Button
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      className="rounded-full w-12 h-12 transition-all duration-300"
      onClick={isRecording ? stopRecording : startRecording}
    >
      {isRecording ? (
        <MicOff className="h-5 w-5 animate-pulse" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
};
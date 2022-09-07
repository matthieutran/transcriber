interface TranscriptResponse {
  id: string;
  status: "queued" | "processing" | "completed";
  acoustic_model: string;
  audio_duration: number;
  audio_url: string;
  confidence: number;
  format_text: boolean;
  language_model: string;
  punctuate: boolean;
  text: string;
  words: Word[];
}

interface Word {
  confidence: number;
  end: number;
  start: number;
  text: string;
}

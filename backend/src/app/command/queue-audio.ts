import fetch from "node-fetch";

export function buildQueueAudio(
  ASSEMBLYAI_ENDPOINT: string,
  ASSEMBLYAI_API_KEY: string
) {
  return async function queueAudio(
    source: string
  ): Promise<TranscriptResponse> {
    if (ASSEMBLYAI_API_KEY === undefined) {
      throw new Error("AssemblyAI API Key missing from .env file");
    }

    const res = await fetch(`${ASSEMBLYAI_ENDPOINT}/transcript`, {
      method: "POST",
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        audio_url: source,
      }),
    });

    return (await res.json()) as TranscriptResponse;
  };
}

export function buildFetchTranscript(
  ASSEMBLYAI_ENDPOINT: string,
  ASSEMBLYAI_API_KEY: string
) {
  return async function fetchTranscript(
    id: string
  ): Promise<TranscriptResponse> {
    let status: "queued" | "completed" | "processing" = "processing";
    let transcript: TranscriptResponse;

    return await new Promise((resolve) => {
      const intv = setInterval(async () => {
        transcript = await buildFetchTranscriptResult(
          ASSEMBLYAI_ENDPOINT,
          ASSEMBLYAI_API_KEY
        )(id);
        status = transcript.status;

        if (status !== "processing") {
          clearInterval(intv);
        }

        resolve(transcript);
      }, 5000);
    });
  };
}

export function buildFetchTranscriptResult(
  ASSEMBLYAI_ENDPOINT: string,
  ASSEMBLYAI_API_KEY: string
) {
  return async function fetchTranscriptResult(
    id: string
  ): Promise<TranscriptResponse> {
    if (ASSEMBLYAI_API_KEY === undefined) {
      throw new Error("AssemblyAI API Key missing from .env file");
    }

    const res = await fetch(`${ASSEMBLYAI_ENDPOINT}/transcript/${id}`, {
      headers: {
        authorization: ASSEMBLYAI_API_KEY,
        "content-type": "application/json",
      },
    });

    const transcript = (await res.json()) as TranscriptResponse;

    return transcript;
  };
}

export interface TranscriptResponse {
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

export interface Word {
  confidence: number;
  end: number;
  start: number;
  text: string;
}

import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;

const LISTEN_NOTES_ENDPOINT = "https://listen-api-test.listennotes.com/api/v2";
const ASSEMBLYAI_ENDPOINT = "https://api.assemblyai.com/v2";

async function queryPodcasts(query: string): Promise<SearchResponse> {
  if (LISTEN_NOTES_API_KEY === undefined) {
    throw new Error("ListenNotes API Key missing from .env file");
  }

  const res = await fetch(
    `${LISTEN_NOTES_ENDPOINT}/search?q=${query}&type=podcast`,
    {
      headers: {
        "X-ListenAPI-Key": LISTEN_NOTES_API_KEY,
      },
    }
  );
  const podcasts = (await res.json()) as SearchResponse;

  return podcasts;
}

interface SearchResponse {
  took: number;
  count: number;
  total: number;
  results: Podcast[];
}

interface Podcast {
  id: string;
  rss: string;
  link: string;
  audio: string;
  image: string;
  podcast: PodcastDetail;
  itunes_id: number;
  thumbnail: string;
  pub_date_ms: number;
  guid_from_rss: string;
  title_original: string;
  listennotes_url: string;
  audio_length_sec: number;
  explicit_content: boolean;
  title_highlighted: string;
  description_original: string;
  description_highlighted: string;
  transcripts_highlighted: string[];
}

interface PodcastDetail {
  id: string;
  image: string;
  genre_ids: number[];
  thumbnail: string;
  listen_score: number;
  title_original: string;
  publisher_original: string;
  publisher_highlighted: string;
  listen_score_global_rank: string;
}

async function queryTranscription(source: string): Promise<SubmissionResponse> {
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

  const submission: SubmissionResponse =
    (await res.json()) as SubmissionResponse;
  const id: string = submission.id;

  let status: "queued" | "completed" | "processing" = submission.status;
  let transcript: SubmissionResponse = submission;

  return await new Promise((resolve) => {
    const intv = setInterval(async () => {
      transcript = await fetchTranscriptResult(id);
      status = transcript.status;

      if (status !== "processing") {
        clearInterval(intv);
      }
      resolve(transcript);
    }, 5000);
  });
}

async function fetchTranscriptResult(id: string): Promise<SubmissionResponse> {
  if (ASSEMBLYAI_API_KEY === undefined) {
    throw new Error("AssemblyAI API Key missing from .env file");
  }

  const res = await fetch(`${ASSEMBLYAI_ENDPOINT}/transcript/${id}`, {
    headers: {
      authorization: ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
    },
  });

  const transcript = (await res.json()) as SubmissionResponse;

  return transcript;
}

interface SubmissionResponse {
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

async function main() {
  const podcasts = await queryPodcasts("women%20in%20tech");
  const audio = podcasts.results[0].audio;

  const transcript = await queryTranscription(audio);
}

main();

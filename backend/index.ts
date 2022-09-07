import fetch, { Headers } from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;

if (LISTEN_NOTES_API_KEY === undefined) {
  throw new Error("ListenNotes API Key missing from .env file");
}
if (ASSEMBLYAI_API_KEY === undefined) {
  throw new Error("AssemblyAI API Key missing from .env file");
}

const LISTEN_NOTES_ENDPOINT = "https://listen-api-test.listennotes.com/api/v2";

const headers = new Headers();
headers.set("X-ListenAPI-Key", LISTEN_NOTES_API_KEY);

async function queryPodcasts(query: string) {
  const res = await fetch(
    `${LISTEN_NOTES_ENDPOINT}/search?q=${query}&type=podcast`,
    {
      headers,
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

async function main() {
  const podcasts = await queryPodcasts("women%20in%20tech");

  console.log(podcasts.results[0].id);
}

main();

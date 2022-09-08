import { startHTTP } from "./src/ports/koa";
import { createRouter } from "./src/ports/koa-router";

import dotenv from "dotenv";

dotenv.config();

const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;

const LISTEN_NOTES_ENDPOINT = "https://listen-api-test.listennotes.com/api/v2";
const ASSEMBLYAI_ENDPOINT = "https://api.assemblyai.com/v2";

const HOST = "127.0.0.1";
const PORT = 3000;

async function main() {
  const router = createRouter();
  startHTTP(PORT, HOST, router);
  // const podcasts = await searchPodcast("women%20in%20tech");
  // const audio = podcasts.results[0].audio;
  // const submission = await queueAudio(audio);
  // const transcript = await fetchTranscript(submission.id);
}

main();

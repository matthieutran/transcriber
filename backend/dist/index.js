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
async function queryPodcasts(query) {
    const res = await fetch(`${LISTEN_NOTES_ENDPOINT}/search?q=${query}&type=podcast`, {
        headers,
    });
    const podcasts = (await res.json());
    return podcasts;
}
async function main() {
    const podcasts = await queryPodcasts("women%20in%20tech");
    console.log(podcasts.results[0].id);
}
main();
//# sourceMappingURL=index.js.map
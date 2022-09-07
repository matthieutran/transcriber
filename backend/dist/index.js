import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;
const LISTEN_NOTES_API_KEY = process.env.LISTEN_NOTES_API_KEY;
const LISTEN_NOTES_ENDPOINT = "https://listen-api-test.listennotes.com/api/v2";
const ASSEMBLYAI_ENDPOINT = "https://api.assemblyai.com/v2";
async function searchPodcast(query) {
    if (LISTEN_NOTES_API_KEY === undefined) {
        throw new Error("ListenNotes API Key missing from .env file");
    }
    const res = await fetch(`${LISTEN_NOTES_ENDPOINT}/search?q=${query}&type=podcast`, {
        headers: {
            "X-ListenAPI-Key": LISTEN_NOTES_API_KEY,
        },
    });
    const podcasts = (await res.json());
    return podcasts;
}
async function queueAudio(source) {
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
    return (await res.json());
}
async function fetchTranscript(id) {
    let status = "processing";
    let transcript;
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
async function fetchTranscriptResult(id) {
    if (ASSEMBLYAI_API_KEY === undefined) {
        throw new Error("AssemblyAI API Key missing from .env file");
    }
    const res = await fetch(`${ASSEMBLYAI_ENDPOINT}/transcript/${id}`, {
        headers: {
            authorization: ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
    });
    const transcript = (await res.json());
    return transcript;
}
async function main() {
    const podcasts = await searchPodcast("women%20in%20tech");
    const audio = podcasts.results[0].audio;
    const submission = await queueAudio(audio);
    const transcript = await fetchTranscript(submission.id);
}
main();
//# sourceMappingURL=index.js.map
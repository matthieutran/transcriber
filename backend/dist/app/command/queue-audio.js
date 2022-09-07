import fetch from "node-fetch";
export function buildQueueAudio(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return async function queueAudio(source) {
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
    };
}
export function buildFetchTranscript(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return async function fetchTranscript(id) {
        let status = "processing";
        let transcript;
        return await new Promise((resolve) => {
            const intv = setInterval(async () => {
                transcript = await buildFetchTranscriptResult(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY)(id);
                status = transcript.status;
                if (status !== "processing") {
                    clearInterval(intv);
                }
                resolve(transcript);
            }, 5000);
        });
    };
}
export function buildFetchTranscriptResult(ASSEMBLYAI_ENDPOINT, ASSEMBLYAI_API_KEY) {
    return async function fetchTranscriptResult(id) {
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
    };
}
//# sourceMappingURL=queue-audio.js.map
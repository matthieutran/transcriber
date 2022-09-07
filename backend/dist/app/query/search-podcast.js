import fetch from "node-fetch";
export function buildSearchPodcast(LISTEN_NOTES_ENDPOINT, LISTEN_NOTES_API_KEY) {
    return async function searchPodcast(query) {
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
    };
}
//# sourceMappingURL=search-podcast.js.map
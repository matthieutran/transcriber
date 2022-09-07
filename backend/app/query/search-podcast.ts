import fetch from "node-fetch";

export function buildSearchPodcast(
  LISTEN_NOTES_ENDPOINT: string,
  LISTEN_NOTES_API_KEY: string
) {
  return async function searchPodcast(query: string): Promise<SearchResponse> {
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
  };
}

interface SearchResponse {
  took: number;
  count: number;
  total: number;
  results: PodcastResponse[];
}

interface PodcastResponse {
  id: string;
  rss: string;
  link: string;
  audio: string;
  image: string;
  podcast: PodcastResponseDetail;
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

interface PodcastResponseDetail {
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

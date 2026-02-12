const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function getPopularMovies() {
    const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();
    return data.results;
}

export async function searchMovies(query) {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    if (!response.ok) {
        throw new Error(`Failed to search with query ${query}`);
    }

    const data = await response.json();
    return data.results;
}

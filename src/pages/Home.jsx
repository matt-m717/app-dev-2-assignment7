import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

function Home({ searchResults, onFavorite }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const movies = await getPopularMovies();
                setMovies(movies);
            } catch (e) {
                setError("Failed to load movies.");
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const displayedMovies = searchResults || movies;

    if (loading) {
        return (
            <main className="main-content">
                <LoadingSpinner />
            </main>
        );
    }

    if (error) {
        return (
            <main className="main-content">
                <ErrorMessage message={error.message} />
            </main>
        );
    }

    return (
        <main className="main-content">
            <div className="content-header">
                <h2>Popular Movies</h2>
                <p>Discover and save your favorite films</p>
            </div>
            <MovieGrid
                movies={displayedMovies}
                onFavorite={onFavorite}
                isFavorite={false}
            />
        </main>
    );
}

export default Home;

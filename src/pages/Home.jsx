import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { getPopularMovies } from "../services/movieService";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useWatchList } from "../contexts/MovieContext";
import { useFavorites } from "../contexts/FavoritesContext";

function Home({ searchResults }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isInWatchList, addToWatchList, removeFromWatchList } =
        useWatchList();
    const { isInFavorites, addToFavorites, removeFromFavorites } =
        useFavorites();

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
                renderButton={movie => {
                    const isFavorited = isInFavorites(movie.id);
                    const favoriteText = isFavorited
                        ? "♡ Remove from Favorites"
                        : "♡ Add to Favorites";
                    const favoriteClick = movie => {
                        isFavorited
                            ? removeFromFavorites(movie.id)
                            : addToFavorites(movie);
                    };

                    const isWatchListed = isInWatchList(movie.id);
                    const watchListText = isWatchListed
                        ? "✖ Remove from Watchlist"
                        : "+ Add to Watchlist";
                    const watchListClick = movie => {
                        isWatchListed
                            ? removeFromWatchList(movie.id)
                            : addToWatchList(movie);
                    };

                    return (
                        <div className="movie-card-buttons">
                            <button
                                className={`favorite-button ${isFavorited ? "favorited" : ""}`}
                                onClick={() => favoriteClick(movie)}
                            >
                                {favoriteText}
                            </button>
                            <button
                                className={`favorite-button ${isWatchListed ? "favorited" : ""}`}
                                onClick={() => watchListClick(movie)}
                            >
                                {watchListText}
                            </button>
                        </div>
                    );
                }}
            />
        </main>
    );
}

export default Home;

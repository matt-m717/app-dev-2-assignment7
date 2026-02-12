function MovieCard({ movie, onFavorite, isFavorite }) {
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://placehold.co/300x450/667eea/ffffff?text=No+Poster"
                    }
                    alt={movie.title}
                />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-details">
                    <span className="movie-rating">
                        ⭐ {movie.vote_average.toFixed(2)}
                    </span>
                    <span className="movie-year">
                        {movie.release_date.substring(0, 4)}
                    </span>
                </div>
                <button
                    className="favorite-button"
                    onClick={() => onFavorite(movie)}
                >
                    {isFavorite
                        ? "♡ Remove from Favorites"
                        : "♡ Add to Favorites"}
                </button>
            </div>
        </div>
    );
}

export default MovieCard;

import MovieCard from "./MovieCard";

function MovieGrid({ movies, onFavorite, isFavorite }) {
    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavorite={onFavorite}
                    isFavorite={isFavorite}
                />
            ))}
        </div>
    );
}

export default MovieGrid;

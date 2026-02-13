import MovieCard from "./MovieCard";

function MovieGrid({ movies, renderButton }) {
    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    buttons={renderButton(movie)}
                />
            ))}
        </div>
    );
}

export default MovieGrid;

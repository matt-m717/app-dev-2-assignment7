import MovieGrid from "../components/MovieGrid";

function Favorites({ favoriteMovies, onFavorite }) {
    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Favorites</h2>
                <p>Your saved movies collection</p>
            </div>
            {favoriteMovies.length > 0 ? (
                <MovieGrid
                    movies={favoriteMovies}
                    onFavorite={onFavorite}
                    isFavorite={true}
                />
            ) : (
                <div className="empty-state">
                    <p>
                        No favorite movies yet. Start adding some from the home
                        page!
                    </p>
                </div>
            )}
        </main>
    );
}

export default Favorites;

import MovieGrid from "../components/MovieGrid";
import { useWatchList } from "../contexts/MovieContext";

function WatchList() {
    const { watchList, removeFromWatchList } = useWatchList();
    return (
        <main className="main-content">
            <div className="content-header">
                <h2>My Watchlist</h2>
                <p>Movies you plan to watch</p>
            </div>
            {watchList.length > 0 ? (
                <MovieGrid
                    movies={watchList}
                    renderButton={movie => {
                        return (
                            <button
                                className="favorite-button favorited"
                                onClick={() => removeFromWatchList(movie.id)}
                            >
                                ✖ Remove from Watchlist
                            </button>
                        );
                    }}
                />
            ) : (
                <div className="empty-state">
                    <p>
                        Your watchlist is empty. Add movies from the home page
                        to get started!
                    </p>
                </div>
            )}
        </main>
    );
}

export default WatchList;

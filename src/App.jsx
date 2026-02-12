import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./App.css";
import { searchMovies } from "./services/movieService";
import { useEffect, useState } from "react";

function App() {
    const [searchResults, setSearchResults] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        const savedFavoriteMovies = localStorage.getItem("favorite_movies");
        return savedFavoriteMovies ? JSON.parse(savedFavoriteMovies) : [];
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                "favorite_movies",
                JSON.stringify(favoriteMovies)
            );
        } catch (e) {
            console.warn("Could not save favorite movies to localStorage:", e);
        }
    }, [favoriteMovies]);

    const handleSearch = async query => {
        const results = await searchMovies(query);
        setSearchResults(results);
    };

    const addToFavorites = movie => {
        if (
            !favoriteMovies.find(
                favoritedMovie => favoritedMovie.id === movie.id
            )
        ) {
            setFavoriteMovies([...favoriteMovies, movie]);
        }
    };

    const removeFromFavorites = movie => {
        const firstIndex = favoriteMovies.findIndex(
            favoritedMovie => movie.id === favoritedMovie.id
        );
        const newFavoriteMovies = [...favoriteMovies];
        newFavoriteMovies.splice(firstIndex, 1);
        setFavoriteMovies(newFavoriteMovies);
    };

    return (
        <Router>
            <div className="app">
                <Header onSearch={handleSearch} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                searchResults={searchResults}
                                onFavorite={addToFavorites}
                            />
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                            <Favorites
                                favoriteMovies={favoriteMovies}
                                onFavorite={removeFromFavorites}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

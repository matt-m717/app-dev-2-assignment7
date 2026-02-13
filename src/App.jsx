import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import "./App.css";
import { searchMovies } from "./services/movieService";
import { useState } from "react";
import { MovieProvider } from "./contexts/MovieContext";
import WatchList from "./pages/WatchList";
import { FavoritesProvider } from "./contexts/FavoritesContext";

function App() {
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = async query => {
        const results = await searchMovies(query);
        setSearchResults(results);
    };

    return (
        <MovieProvider>
            <FavoritesProvider>
                <Router>
                    <div className="app">
                        <Header onSearch={handleSearch} />
                        <Routes>
                            <Route
                                path="/"
                                element={<Home searchResults={searchResults} />}
                            />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/watchlist" element={<WatchList />} />
                        </Routes>
                    </div>
                </Router>
            </FavoritesProvider>
        </MovieProvider>
    );
}

export default App;

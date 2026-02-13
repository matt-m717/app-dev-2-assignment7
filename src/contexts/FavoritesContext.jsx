import { createContext, useState, useContext, useEffect } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useWatchList must be used within a MovieProvider");
    }
    return context;
}

export function FavoritesProvider({ children }) {
    const [favoriteMovies, setFavoriteMovies] = useState(() => {
        const saved = localStorage.getItem("favorite_movies");
        return saved ? JSON.parse(saved) : [];
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

    const addToFavorites = movie => {
        if (!favoriteMovies.some(m => m.id === movie.id)) {
            setFavoriteMovies(prev => [...prev, movie]);
        }
    };

    const removeFromFavorites = movieId => {
        setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isInFavorites = movieId => {
        return favoriteMovies.some(movie => movie.id === movieId);
    };

    const value = {
        favoriteMovies,
        addToFavorites,
        removeFromFavorites,
        isInFavorites
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

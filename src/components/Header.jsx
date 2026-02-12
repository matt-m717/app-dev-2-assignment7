import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        if (searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <Link to="/" className="app-title">
                    MovieShelf
                </Link>
                <nav className="nav-links">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                    <Link to="/favorites" className="nav-link">
                        Favorites
                    </Link>
                </nav>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="search-input"
                        value={searchQuery}
                        onChange={event => setSearchQuery(event.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

import "./LoadingSpinner.css";

function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading recipes...</p>
        </div>
    );
}

export default LoadingSpinner;

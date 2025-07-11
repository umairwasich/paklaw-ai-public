import React from 'react';
import './App.css';

function App() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);

  const handleAsk = async () => {
    if (!query.trim()) return;
    const res = await fetch('https://your-api-url.onrender.com/laws/search?query=' + encodeURIComponent(query));
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div className="chat-container">
      <h1>⚖️ PakLaw AI</h1>
      <p>Ask about any law from National Assembly of Pakistan</p>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type your question..."
        className="chat-input"
      />
      <button onClick={handleAsk} className="chat-button">Search</button>

      <div className="chat-results">
        {results.length === 0 && query && <p>No laws found.</p>}
        {results.map((law, index) => (
          <div key={index} className="result-card">
            <strong>{law.title}</strong><br />
            <small>{law.text.substring(0, 100)}...</small><br />
            <a href={law.url} target="_blank" rel="noreferrer">📄 View PDF</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

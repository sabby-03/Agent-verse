import { useState } from "react";
import { agents, categories } from "../agents";

export default function Home({ navigate }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [ratings, setRatings] = useState({});
  const [hoveredStar, setHoveredStar] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [showFavs, setShowFavs] = useState(false);

  const filtered = agents.filter(a => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tagline.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(t => t.includes(search.toLowerCase()));
    const matchFav = showFavs ? favourites.includes(a.id) : true;
    return matchCat && matchSearch && matchFav;
  });

  const handleRate = (agentId, star) => {
    setRatings(prev => ({ ...prev, [agentId]: star }));
  };

  const toggleFav = (agentId) => {
    setFavourites(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    );
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-badge">🚀 The AI Agent Marketplace</div>
        <h1 className="hero-title">
          Discover & Deploy<br />
          <span className="gradient-text">AI Agents</span>
        </h1>
        <p className="hero-sub">
          Find the perfect AI agent for any task. Try them instantly, no setup required.
        </p>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search agents by name, category, or use case..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="hero-stats">
          <div className="stat"><strong>6+</strong> AI Agents</div>
          <div className="stat-divider" />
          <div className="stat"><strong>50k+</strong> Tasks Done</div>
          <div className="stat-divider" />
          <div className="stat"><strong>6</strong> Categories</div>
        </div>
      </div>

      <div className="section">
        {/* Favourites Toggle */}
        <div className="favs-bar">
          <button
            className={`fav-toggle ${showFavs ? "active" : ""}`}
            onClick={() => setShowFavs(!showFavs)}
          >
            {showFavs ? "❤️ My Favourites" : "🤍 My Favourites"} ({favourites.length})
          </button>
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="agents-grid">
          {filtered.map(agent => (
            <div
              key={agent.id}
              className="agent-card"
              style={{ "--accent": agent.color }}
            >
              <div className="card-header">
                <div className="agent-icon" style={{ background: agent.color + "22", border: `1.5px solid ${agent.color}44` }}>
                  {agent.icon}
                </div>
                <div className="agent-meta">
                  <span className="agent-category">{agent.category}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="agent-rating">⭐ {ratings[agent.id] || agent.rating}</span>
                    <span
                      className="fav-btn"
                      onClick={e => { e.stopPropagation(); toggleFav(agent.id); }}
                    >
                      {favourites.includes(agent.id) ? "❤️" : "🤍"}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="agent-name">{agent.name}</h3>
              <p className="agent-tagline">{agent.tagline}</p>

              {/* ⭐ STAR RATING */}
              <div className="star-rating">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className="star"
                    style={{
                      color: star <= (hoveredStar[agent.id] || ratings[agent.id] || 0) ? "#ffd700" : "#333",
                      cursor: "pointer",
                      fontSize: "1.3rem"
                    }}
                    onClick={e => { e.stopPropagation(); handleRate(agent.id, star); }}
                    onMouseEnter={() => setHoveredStar(prev => ({ ...prev, [agent.id]: star }))}
                    onMouseLeave={() => setHoveredStar(prev => ({ ...prev, [agent.id]: 0 }))}
                  >★</span>
                ))}
                {ratings[agent.id] && (
                  <span style={{ fontSize: "0.8rem", color: "var(--accent)", marginLeft: "0.4rem" }}>
                    You rated {ratings[agent.id]}/5
                  </span>
                )}
              </div>

              <div className="agent-tags">
                {agent.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <div className="card-footer">
                <span className="uses-count">🔥 {agent.uses} uses</span>
                <button
                  className="btn-try"
                  style={{ background: agent.color }}
                  onClick={() => navigate("agent", agent)}
                >Try Now →</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: "3rem" }}>
              {showFavs ? "💔" : "🤖"}
            </div>
            <p>{showFavs ? "No favourites yet! Click 🤍 on any agent to save it." : "No agents found. Try a different search!"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
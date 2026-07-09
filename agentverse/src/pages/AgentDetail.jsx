import { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = "AIzaSyBFcBIO4s2zrP-uqONtMv6Q-n5kOV2K0W8";

export default function AgentDetail({ agent, navigate }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi! I'm ${agent.name}. ${agent.tagline}. How can I help you today?` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (customMsg) => {
    const userMsg = (customMsg || input).trim();
    if (!userMsg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: agent.systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userMsg }] }]
          })
        }
      );
      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "⚠️ Error connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div className="agent-detail">
      <button className="back-btn" onClick={() => navigate("home")}>← Back to Marketplace</button>

      <div className="detail-layout">
        <div className="detail-info">
          <div className="detail-icon" style={{ background: agent.color + "22", border: `2px solid ${agent.color}66` }}>
            {agent.icon}
          </div>
          <h1 className="detail-name">{agent.name}</h1>
          <p className="detail-tagline">{agent.tagline}</p>
          <div className="detail-stats">
            <div className="d-stat"><span>⭐</span>{agent.rating}/5</div>
            <div className="d-stat"><span>🔥</span>{agent.uses} uses</div>
            <div className="d-stat"><span>📂</span>{agent.category}</div>
          </div>
          <p className="detail-desc">{agent.description}</p>
          <div className="detail-tags">
            {agent.tags.map(tag => (
              <span key={tag} className="tag" style={{ borderColor: agent.color + "66", color: agent.color }}>#{tag}</span>
            ))}
          </div>
          <div className="detail-suggestions">
            <p className="suggestions-title">💡 Try asking:</p>
            {getSuggestions(agent.category).map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="chat-panel">
          <div className="chat-header" style={{ borderBottom: `2px solid ${agent.color}44` }}>
            <span>{agent.icon} {agent.name}</span>
            <span className="online-dot">● Live</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.role === "assistant" && (
                  <div className="msg-avatar" style={{ background: agent.color + "33" }}>{agent.icon}</div>
                )}
                <div className="msg-bubble" style={msg.role === "assistant" ? { borderColor: agent.color + "44" } : {}}>
                  <pre className="msg-text">{msg.text}</pre>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-msg assistant">
                <div className="msg-avatar" style={{ background: agent.color + "33" }}>{agent.icon}</div>
                <div className="msg-bubble typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Ask ${agent.name} anything...`}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage()}
              disabled={loading}
              style={{ background: agent.color }}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getSuggestions(category) {
  const map = {
    Development: ["Write a React login form", "Debug this Python error", "Explain async/await"],
    Writing: ["Write a blog intro about AI", "Draft a professional email", "Give me 5 headline ideas"],
    Analytics: ["How do I analyze sales data?", "What metrics matter most?", "Explain correlation vs causation"],
    Education: ["Explain machine learning simply", "Quiz me on JavaScript", "Create a study plan for React"],
    Business: ["How do I validate a startup idea?", "Write a value proposition", "Analyze my competitors"],
    Design: ["Suggest a color palette for a fintech app", "Give me 5 app name ideas", "Describe a modern landing page layout"],
  };
  return map[category] || ["Tell me what you can do", "Give me an example", "Help me get started"];
}
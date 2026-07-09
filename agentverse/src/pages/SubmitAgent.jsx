import { useState } from "react";

export default function SubmitAgent({ navigate }) {
  const [form, setForm] = useState({ name: "", tagline: "", category: "", description: "", tags: "", prompt: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.tagline || !form.category) return alert("Please fill required fields!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="submit-success">
        <div className="success-icon">🎉</div>
        <h2>Agent Submitted!</h2>
        <p>Your agent <strong>{form.name}</strong> has been submitted for review. It will appear in the marketplace after approval.</p>
        <button className="btn-primary" onClick={() => navigate("home")}>Back to Marketplace</button>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="submit-container">
        <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
        <h1 className="submit-title">List Your AI Agent</h1>
        <p className="submit-sub">Share your AI agent with thousands of users on AgentVerse</p>

        <div className="form-grid">
          <div className="form-group">
            <label>Agent Name *</label>
            <input type="text" placeholder="e.g. CodeCraft AI" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Tagline *</label>
            <input type="text" placeholder="e.g. Your personal coding assistant" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Category *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select category...</option>
              <option>Development</option>
              <option>Writing</option>
              <option>Analytics</option>
              <option>Education</option>
              <option>Business</option>
              <option>Design</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input type="text" placeholder="e.g. coding, python, debug" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
          </div>
          <div className="form-group full">
            <label>Description</label>
            <textarea placeholder="Describe what your agent does..." rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group full">
            <label>System Prompt</label>
            <textarea placeholder="The system prompt that defines your agent's behavior..." rows={5} value={form.prompt} onChange={e => setForm({ ...form, prompt: e.target.value })} />
          </div>
        </div>

        <button className="btn-primary" onClick={handleSubmit}>Submit Agent 🚀</button>
      </div>
    </div>
  );
}

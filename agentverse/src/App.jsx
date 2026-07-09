import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AgentDetail from "./pages/AgentDetail";
import SubmitAgent from "./pages/SubmitAgent";
import Login from "./pages/Login";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navigate = (p, agent = null) => {
    setSelectedAgent(agent);
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("home")}>
          <span className="logo-icon">O</span>
          <span className="logo-text">AgentVerse</span>
        </div>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate("home")}>Discover</button>
          {user ? (
            <>
              <span style={{ color: "#00ff88", fontSize: "14px" }}>👤 {user.email}</span>
              <button className="cta-btn" onClick={() => signOut(auth)}>Logout</button>
            </>
          ) : (
            <button className="cta-btn" onClick={() => navigate("login")}>Login</button>
          )}
          <button className="cta-btn" onClick={() => navigate("submit")}>+ List Agent</button>
        </div>
      </nav>

      {page === "home" && <Home navigate={navigate} />}
      {page === "agent" && selectedAgent && <AgentDetail agent={selectedAgent} navigate={navigate} />}
      {page === "submit" && <SubmitAgent navigate={navigate} />}
      {page === "login" && <Login navigate={navigate} />}
    </div>
  );
}
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigate }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{ background: "#1a1a2e", padding: "40px", borderRadius: "16px", width: "400px", border: "1px solid #00ff88" }}>
        <h2 style={{ color: "#00ff88", textAlign: "center", marginBottom: "24px" }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #333", background: "#0a0a0a", color: "white", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px", marginBottom: "16px", borderRadius: "8px", border: "1px solid #333", background: "#0a0a0a", color: "white", boxSizing: "border-box" }}
        />
        {error && <p style={{ color: "red", marginBottom: "12px", fontSize: "14px" }}>{error}</p>}
        <button
          onClick={handleSubmit}
          style={{ width: "100%", padding: "12px", background: "#00ff88", color: "black", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <p style={{ color: "#888", textAlign: "center", marginTop: "16px" }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            style={{ color: "#00ff88", cursor: "pointer", marginLeft: "8px" }}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
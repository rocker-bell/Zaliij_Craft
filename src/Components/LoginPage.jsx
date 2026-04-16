import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";

import supabase from "../utils/supabase";
import { useModal } from "../utils/ModalContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showModal } = useModal()
  const navigate = useNavigate();


 
  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("role", "admin") 
    .single();

  if (error || !data) {
    showModal('error', 'connexion a echoue')
    return;
  }

  // ⚠️ STILL NOT SECURE: password is not verified
  showModal('success', 'connexion avec success mais non securise')

  const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour

localStorage.setItem("user", JSON.stringify({
  email: data.email,
  role: data.role,
  isLoggedIn: true,
  expiresAt: expiryTime
}));

  navigate("/AdminDashboard");
};

  return (
    <div className="login-wrapper">
      {/* Motif géométrique en arrière-plan */}
      <div className="login-bg-pattern"></div>

      <div className="login-card">
        {/* En-tête de la carte avec dégradé orange */}
        <div className="login-header">
          <div className="lock-icon">🔒</div>
          <h1>Espace Admin</h1>
          <p>Connectez-vous pour accéder au dashboard</p>
        </div>

        <div className="login-body">
          {/* Identifiants de test / Démo */}
          <div className="demo-box">
            <p className="demo-title">Démo - Identifiants de test :</p>
            <p>Email: <span>admin@zellige-art.ma</span></p>
            <p>Mot de passe: <span>admin123</span></p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-with-icon">
                <span className="icon">✉️</span>
                <input 
                  type="email" 
                  placeholder="admin@zellige-artisan.ma" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mot de passe</label>
              <div className="input-with-icon">
                <span className="icon">🔒</span>
                <input 
                  type="password" 
                  placeholder="........" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  
                />
              </div>
            </div>

            <button type="submit" className="btn-login" >
              → Se connecter
            </button>
          </form>
        </div>
      </div>

      <Link to="/" className="back-link">
        ← Retour au site
      </Link>
    </div>
  );
};

export default LoginPage;
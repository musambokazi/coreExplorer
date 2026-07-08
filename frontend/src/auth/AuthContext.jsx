// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { coreExploreApi } from "../api/coreExploreApi";

// Create the context
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auto‑login on mount using the mock endpoint
  useEffect(() => {
    const doLogin = async () => {
      try {
        const demoUser = await coreExploreApi.login('demo@example.com', 'password');
        setUser(demoUser);
      } catch (err) {
        setError(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    };
    doLogin();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const demoUser = await coreExploreApi.login(email, password);
      setUser(demoUser);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async () => {
    if (!user) return;
    try {
      const updatedUser = await coreExploreApi.subscribe(user.id);
      setUser(updatedUser);
    } catch (err) {
      setError(err.message || "Subscribe failed");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, subscribe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import './UpgradeModal.css'; // optional styling file

export default function UpgradeModal({ isOpen, onClose }) {
  const { subscribe, loading, error, user } = useAuth();
  const [message, setMessage] = useState('');

  const handleUpgrade = async () => {
    await subscribe();
    setMessage('✅ Premium activated!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <h2>Upgrade to Premium</h2>
        <p>Enjoy mentorship and advanced analytics.</p>
        <p className="price">R 1999 / month</p>
        <button className="primary-btn" onClick={handleUpgrade} disabled={loading}>
          {loading ? 'Processing…' : 'Upgrade'}
        </button>
        {error && <p className="error-msg">{error}</p>}
        {message && <p className="success-msg">{message}</p>}
        <button className="secondary-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

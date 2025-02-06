import { useState } from 'react';

interface PasswordModalProps {
  onSubmit: (password: string) => void;
  onClose: () => void;
}

const PasswordModal = ({ onSubmit, onClose }: PasswordModalProps) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
    setPassword('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Enter Password to Unlock</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
          />
          <div className="modal-buttons">
            <button type="submit">Unlock</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
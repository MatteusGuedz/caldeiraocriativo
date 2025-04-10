import React, { useState } from 'react';

interface SecuritySettingsProps {
  securitySettings: {
    enableTwoFactorAuth: boolean;
    maxLoginAttempts: number;
    sessionTimeout: number;
  };
  onUpdate: (settings: {
    enableTwoFactorAuth: boolean;
    maxLoginAttempts: number;
    sessionTimeout: number;
  }) => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  securitySettings, 
  onUpdate 
}) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    onUpdate({
      ...securitySettings,
      [name]: name === 'maxLoginAttempts' || name === 'sessionTimeout' 
        ? Number(value) 
        : value
    });
  };

  const handleToggle = (name: string) => {
    onUpdate({
      ...securitySettings,
      [name]: !securitySettings[name as keyof typeof securitySettings]
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Senhas não coincidem');
      return;
    }

    // Lógica de mudança de senha
    alert('Mudança de senha simulada');
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="settings-section security-settings">
      <h2>Configurações de Segurança</h2>
      
      <div className="form-group">
        <label>Autenticação de Dois Fatores</label>
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            checked={securitySettings.enableTwoFactorAuth}
            onChange={() => handleToggle('enableTwoFactorAuth')}
          />
          <span className="slider"></span>
        </div>
      </div>

      <div className="form-group">
        <label>Máximo de Tentativas de Login</label>
        <select 
          name="maxLoginAttempts"
          value={securitySettings.maxLoginAttempts}
          onChange={handleChange}
        >
          <option value={3}>3 tentativas</option>
          <option value={5}>5 tentativas</option>
          <option value={10}>10 tentativas</option>
        </select>
      </div>

      <div className="form-group">
        <label>Tempo de Sessão (minutos)</label>
        <select 
          name="sessionTimeout"
          value={securitySettings.sessionTimeout}
          onChange={handleChange}
        >
          <option value={15}>15 minutos</option>
          <option value={30}>30 minutos</option>
          <option value={60}>1 hora</option>
          <option value={120}>2 horas</option>
        </select>
      </div>

      <div className="form-group">
        <label>Alterar Senha</label>
        <button 
          onClick={() => setShowPasswordModal(true)}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px' 
          }}
        >
          Alterar Senha
        </button>
      </div>

      {showPasswordModal && (
        <div className="password-modal">
          <div className="password-modal-content">
            <h3>Alterar Senha</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Senha Atual</label>
                <input 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nova Senha</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label>Confirmar Nova Senha</label>
                <input 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="password-modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  style={{ 
                    backgroundColor: '#f1f5f9', 
                    color: '#1e293b', 
                    border: '1px solid #cbd5e1' 
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#10b981', 
                    color: 'white', 
                    border: 'none' 
                  }}
                >
                  Alterar Senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="security-preview">
        <h3>Resumo de Segurança</h3>
        <ul>
          <li>
            {securitySettings.enableTwoFactorAuth 
              ? '✅ Autenticação de Dois Fatores Habilitada' 
              : '❌ Autenticação de Dois Fatores Desabilitada'}
          </li>
          <li>Máximo de Tentativas de Login: {securitySettings.maxLoginAttempts}</li>
          <li>Tempo de Sessão: {securitySettings.sessionTimeout} minutos</li>
        </ul>
      </div>
    </div>
  );
};

export default SecuritySettings;
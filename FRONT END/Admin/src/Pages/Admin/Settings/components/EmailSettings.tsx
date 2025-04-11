import React from 'react';

interface EmailSettingsProps {
  emailSettings: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
  };
  onUpdate: (settings: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
  }) => void;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ 
  emailSettings, 
  onUpdate 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    onUpdate({
      ...emailSettings,
      [name]: name === 'smtpPort' ? Number(value) : value
    });
  };

  const testEmailConnection = () => {
    // Simulação de teste de conexão de e-mail
    alert('Testando conexão de e-mail...\nEsta funcionalidade seria implementada no backend.');
  };

  return (
    <div className="settings-section email-settings">
      <h2>Configurações de E-mail</h2>
      
      <div className="form-group">
        <label>Servidor SMTP</label>
        <input 
          type="text" 
          name="smtpHost"
          value={emailSettings.smtpHost}
          onChange={handleChange}
          placeholder="Ex: smtp.gmail.com"
        />
      </div>

      <div className="form-group">
        <label>Porta SMTP</label>
        <input 
          type="number" 
          name="smtpPort"
          value={emailSettings.smtpPort}
          onChange={handleChange}
          placeholder="Ex: 587"
        />
      </div>

      <div className="form-group">
        <label>Usuário SMTP</label>
        <input 
          type="text" 
          name="smtpUsername"
          value={emailSettings.smtpUsername}
          onChange={handleChange}
          placeholder="Seu nome de usuário SMTP"
        />
      </div>

      <div className="form-group">
        <label>Senha SMTP</label>
        <input 
          type="password" 
          name="smtpPassword"
          value={emailSettings.smtpPassword}
          onChange={handleChange}
          placeholder="Senha do servidor SMTP"
        />
      </div>

      <div className="form-group">
        <label>E-mail de Origem</label>
        <input 
          type="email" 
          name="fromEmail"
          value={emailSettings.fromEmail}
          onChange={handleChange}
          placeholder="E-mail que enviará as mensagens"
        />
      </div>

      <div className="form-group">
        <label>Teste de Conexão</label>
        <button 
          onClick={testEmailConnection}
          style={{ padding: '10px 20px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px' }}
        >
          Testar Conexão
        </button>
      </div>
    </div>
  );
};

export default EmailSettings;
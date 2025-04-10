import React, { useState } from 'react';
import './Settings.scss';
import EmailSettings from './components/EmailSettings';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';

interface SystemSettings {
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUsername: string;
    smtpPassword: string;
    fromEmail: string;
  };
  notifications: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notificationFrequency: 'immediate' | 'daily' | 'weekly';
  };
  security: {
    enableTwoFactorAuth: boolean;
    maxLoginAttempts: number;
    sessionTimeout: number;
  };
}

const defaultSettings: SystemSettings = {
  email: {
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@caldeiraocriativo.com'
  },
  notifications: {
    enableEmailNotifications: true,
    enablePushNotifications: false,
    notificationFrequency: 'daily'
  },
  security: {
    enableTwoFactorAuth: false,
    maxLoginAttempts: 5,
    sessionTimeout: 30 // minutos
  }
};

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'email' | 'notifications' | 'security'>('email');
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const savedSettings = localStorage.getItem('system-settings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingsUpdate = (updatedSettings: Partial<SystemSettings>) => {
    const newSettings = { ...settings, ...updatedSettings };
    setSettings(newSettings);
  };

  const saveSettings = () => {
    setIsSaving(true);
    try {
      // Simular salvamento
      localStorage.setItem('system-settings', JSON.stringify(settings));
      
      setTimeout(() => {
        setIsSaving(false);
        alert('Configurações salvas com sucesso!');
      }, 500);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      setIsSaving(false);
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      setSettings(defaultSettings);
      localStorage.removeItem('system-settings');
      alert('Configurações restauradas para o padrão.');
    }
  };

  return (
    <div className="admin-settings-page">
      <header className="settings-header">
        <h1>Configurações do Sistema</h1>
        <div className="settings-actions">
          <button 
            className="btn-reset"
            onClick={resetToDefault}
          >
            Restaurar Padrão
          </button>
          <button 
            className={`btn-save ${isSaving ? 'saving' : ''}`}
            onClick={saveSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </header>

      <div className="settings-navigation">
        <button 
          className={activeTab === 'email' ? 'active' : ''}
          onClick={() => setActiveTab('email')}
        >
          Configurações de E-mail
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notificações
        </button>
        <button 
          className={activeTab === 'security' ? 'active' : ''}
          onClick={() => setActiveTab('security')}
        >
          Segurança
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'email' && (
          <EmailSettings 
            emailSettings={settings.email}
            onUpdate={(emailSettings) => handleSettingsUpdate({ email: emailSettings })}
          />
        )}
        
        {activeTab === 'notifications' && (
          <NotificationSettings 
            notificationSettings={settings.notifications}
            onUpdate={(notificationSettings) => handleSettingsUpdate({ notifications: notificationSettings })}
          />
        )}
        
        {activeTab === 'security' && (
          <SecuritySettings 
            securitySettings={settings.security}
            onUpdate={(securitySettings) => handleSettingsUpdate({ security: securitySettings })}
          />
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
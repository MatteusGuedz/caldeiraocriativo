import React from 'react';

interface NotificationSettingsProps {
  notificationSettings: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notificationFrequency: 'immediate' | 'daily' | 'weekly';
  };
  onUpdate: (settings: {
    enableEmailNotifications: boolean;
    enablePushNotifications: boolean;
    notificationFrequency: 'immediate' | 'daily' | 'weekly';
  }) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  notificationSettings, 
  onUpdate 
}) => {
  const handleToggle = (name: string) => {
    onUpdate({
      ...notificationSettings,
      [name]: !notificationSettings[name as keyof typeof notificationSettings]
    });
  };

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({
      ...notificationSettings,
      notificationFrequency: e.target.value as 'immediate' | 'daily' | 'weekly'
    });
  };

  return (
    <div className="settings-section notification-settings">
      <h2>Configurações de Notificações</h2>
      
      <div className="form-group">
        <label>Notificações por E-mail</label>
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            checked={notificationSettings.enableEmailNotifications}
            onChange={() => handleToggle('enableEmailNotifications')}
          />
          <span className="slider"></span>
        </div>
      </div>

      <div className="form-group">
        <label>Notificações Push</label>
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            checked={notificationSettings.enablePushNotifications}
            onChange={() => handleToggle('enablePushNotifications')}
          />
          <span className="slider"></span>
        </div>
      </div>

      <div className="form-group">
        <label>Frequência de Notificações</label>
        <select 
          value={notificationSettings.notificationFrequency}
          onChange={handleFrequencyChange}
        >
          <option value="immediate">Imediato</option>
          <option value="daily">Diário</option>
          <option value="weekly">Semanal</option>
        </select>
      </div>

      <div className="notification-preview">
        <h3>Pré-visualização de Notificações</h3>
        <ul>
          <li>
            {notificationSettings.enableEmailNotifications 
              ? '✅ Notificações por e-mail habilitadas' 
              : '❌ Notificações por e-mail desabilitadas'}
          </li>
          <li>
            {notificationSettings.enablePushNotifications 
              ? '✅ Notificações push habilitadas' 
              : '❌ Notificações push desabilitadas'}
          </li>
          <li>
            Frequência: {
              {
                'immediate': 'Imediato',
                'daily': 'Diário',
                'weekly': 'Semanal'
              }[notificationSettings.notificationFrequency]
            }
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationSettings;
import React, { useState, useEffect } from 'react';
import './Theme.scss';
import ColorPicker from './components/ColorPicker';
import FontSelector from './components/FontSelector';
import LayoutPreview from './components/LayoutPreview';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#0f172a',
  secondaryColor: '#1e293b',
  accentColor: '#3b82f6',
  backgroundColor: '#0f172a',
  textColor: '#f8fafc',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: 16
};

const AdminTheme: React.FC = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(() => {
    // Carregar temas salvos do localStorage
    const savedTheme = localStorage.getItem('app-theme-settings');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Aplicar tema atual ao documento
    document.documentElement.style.setProperty('--primary-color', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', themeSettings.accentColor);
    document.documentElement.style.setProperty('--background-color', themeSettings.backgroundColor);
    document.documentElement.style.setProperty('--text-color', themeSettings.textColor);
    document.documentElement.style.setProperty('--font-family', themeSettings.fontFamily);
    document.documentElement.style.setProperty('--font-size', `${themeSettings.fontSize}px`);
  }, [themeSettings]);

  const handleColorChange = (colorType: keyof ThemeSettings, color: string) => {
    setThemeSettings(prev => ({
      ...prev,
      [colorType]: color
    }));
  };

  const handleFontChange = (fontFamily: string, fontSize: number) => {
    setThemeSettings(prev => ({
      ...prev,
      fontFamily,
      fontSize
    }));
  };

  const saveThemeSettings = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('app-theme-settings', JSON.stringify(themeSettings));
      
      // Simular um tempo de salvamento
      setTimeout(() => {
        setIsSaving(false);
        alert('Configurações de tema salvas com sucesso!');
      }, 500);
    } catch (error) {
      console.error('Erro ao salvar configurações de tema:', error);
      setIsSaving(false);
    }
  };

  const resetToDefaultTheme = () => {
    setThemeSettings(defaultTheme);
    localStorage.removeItem('app-theme-settings');
    alert('Tema restaurado para configurações padrão.');
  };

  return (
    <div className="admin-theme-page">
      <header className="theme-header">
        <h1>Personalização de Tema</h1>
        <div className="theme-actions">
          <button 
            className="btn-reset"
            onClick={resetToDefaultTheme}
          >
            Restaurar Padrão
          </button>
          <button 
            className={`btn-save ${isSaving ? 'saving' : ''}`}
            onClick={saveThemeSettings}
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </header>

      <div className="theme-customization-grid">
        <div className="theme-colors">
          <h2>Cores</h2>
          <ColorPicker
            label="Cor Primária"
            color={themeSettings.primaryColor}
            onChange={(color) => handleColorChange('primaryColor', color)}
          />
          <ColorPicker
            label="Cor Secundária"
            color={themeSettings.secondaryColor}
            onChange={(color) => handleColorChange('secondaryColor', color)}
          />
          <ColorPicker
            label="Cor de Destaque"
            color={themeSettings.accentColor}
            onChange={(color) => handleColorChange('accentColor', color)}
          />
          <ColorPicker
            label="Cor de Fundo"
            color={themeSettings.backgroundColor}
            onChange={(color) => handleColorChange('backgroundColor', color)}
          />
          <ColorPicker
            label="Cor do Texto"
            color={themeSettings.textColor}
            onChange={(color) => handleColorChange('textColor', color)}
          />
        </div>

        <div className="theme-typography">
          <h2>Tipografia</h2>
          <FontSelector
            initialFont={themeSettings.fontFamily}
            initialFontSize={themeSettings.fontSize}
            onFontChange={handleFontChange}
          />
        </div>

        <div className="theme-preview">
          <h2>Visualização</h2>
          <LayoutPreview 
            themeSettings={themeSettings} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTheme;
import React from 'react';

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: number;
}

interface LayoutPreviewProps {
  themeSettings: ThemeSettings;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ themeSettings }) => {
  const previewStyle = {
    backgroundColor: themeSettings.backgroundColor,
    color: themeSettings.textColor,
    fontFamily: themeSettings.fontFamily,
    fontSize: `${themeSettings.fontSize}px`
  };

  const navbarStyle = {
    backgroundColor: themeSettings.secondaryColor,
    color: themeSettings.textColor
  };

  const sidebarStyle = {
    backgroundColor: themeSettings.secondaryColor
  };

  const buttonStyle = {
    backgroundColor: themeSettings.accentColor,
    color: 'white'
  };

  return (
    <div 
      className="layout-preview" 
      style={previewStyle}
    >
      <div 
        className="preview-navbar"
        style={navbarStyle}
      >
        <h3>Caldeirão Criativo</h3>
        <button style={buttonStyle}>Ações</button>
      </div>

      <div className="preview-content">
        <div 
          className="preview-sidebar"
          style={sidebarStyle}
        >
          <p>Menu</p>
        </div>

        <div 
          className="preview-main"
        >
          <h2>Conteúdo Principal</h2>
          <p>Este é um exemplo de como seu tema personalizado será aplicado.</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutPreview;
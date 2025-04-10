import React, { useState } from 'react';

const FONT_OPTIONS = [
  'Inter, sans-serif',
  'Roboto, sans-serif',
  'Open Sans, sans-serif',
  'Montserrat, sans-serif',
  'Lato, sans-serif',
  'Poppins, sans-serif'
];

const FONT_SIZES = [14, 16, 18, 20, 22];

interface FontSelectorProps {
  initialFont: string;
  initialFontSize: number;
  onFontChange: (fontFamily: string, fontSize: number) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ 
  initialFont, 
  initialFontSize, 
  onFontChange 
}) => {
  const [fontFamily, setFontFamily] = useState(initialFont);
  const [fontSize, setFontSize] = useState(initialFontSize);

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value;
    setFontFamily(newFont);
    onFontChange(newFont, fontSize);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);
    onFontChange(fontFamily, newSize);
  };

  return (
    <div className="font-selector">
      <div className="font-option">
        <label>Família de Fonte</label>
        <select 
          value={fontFamily} 
          onChange={handleFontFamilyChange}
        >
          {FONT_OPTIONS.map(font => (
            <option key={font} value={font}>
              {font.split(',')[0]}
            </option>
          ))}
        </select>
      </div>

      <div className="font-option">
        <label>Tamanho da Fonte</label>
        <select 
          value={fontSize} 
          onChange={handleFontSizeChange}
        >
          {FONT_SIZES.map(size => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      <div className="font-preview" style={{ fontFamily, fontSize }}>
        <p>Exemplo de texto com a fonte selecionada</p>
      </div>
    </div>
  );
};

export default FontSelector;
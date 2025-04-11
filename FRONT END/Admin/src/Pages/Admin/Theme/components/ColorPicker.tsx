import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  color, 
  onChange 
}) => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="color-picker">
      <label>{label}</label>
      <input 
        type="color" 
        value={color}
        onChange={handleColorChange}
        title={`Escolha a cor para ${label}`}
      />
    </div>
  );
};

export default ColorPicker;
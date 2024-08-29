import  { useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ToggleDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(true);

  const handleToggle = (checked: boolean) => {
    setDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      style={{ marginTop: '0.0rem' }}
      checked={isDarkMode}
      onChange={handleToggle}
      size={40}
    />
  );
};

export default ToggleDarkMode;

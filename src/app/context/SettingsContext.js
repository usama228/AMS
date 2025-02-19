import { createContext, useState, useEffect } from "react";
import merge from "lodash/merge";
// CUSTOM COMPONENT
import { MatxLayoutSettings } from "app/components/MatxLayout/settings";

// Create the context with default values
export const SettingsContext = createContext({
  settings: MatxLayoutSettings,  // Default settings
  updateSettings: () => {},      // Default function
});

export default function SettingsProvider({ settings = MatxLayoutSettings, children }) {
  const [currentSettings, setCurrentSettings] = useState(settings);

  // Handle updating the settings with deep merge
  const handleUpdateSettings = (update = {}) => {
    const mergedSettings = merge({}, currentSettings, update);  // Deep merge to avoid mutation
    setCurrentSettings(mergedSettings);
  };

  // Optional: Sync settings if `settings` prop changes over time
  useEffect(() => {
    if (settings) {
      setCurrentSettings(merge({}, MatxLayoutSettings, settings)); // Ensure settings merge with defaults
    }
  }, [settings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
